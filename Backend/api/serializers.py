from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    Article,
    ArticleSection,
    Beast,
    Country,
    Equipment,
    GameClass,
    God,
    Item,
    Race,
    Subclass,
    Trait,
)

User = get_user_model()


def _extract_roles(user: User) -> tuple[list[str], list[str]]:
    group_names = [group.name for group in user.groups.all()]
    roles = [name.lower() for name in group_names]

    if user.is_staff and "staff" not in roles:
        roles.append("staff")
    if user.is_superuser and "superuser" not in roles:
        roles.append("superuser")
    if (user.is_staff or user.is_superuser) and "admin" not in roles:
        roles.append("admin")

    return roles, group_names


def generate_tokens_for_user(user: User) -> dict[str, str]:
    refresh = RoleAwareTokenObtainPairSerializer.get_token(user)
    return {"access": str(refresh.access_token), "refresh": str(refresh)}


class RoleAwareTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        roles, group_names = _extract_roles(user)

        token["roles"] = roles
        token["groups"] = group_names
        token["is_staff"] = user.is_staff
        token["is_superuser"] = user.is_superuser
        token["username"] = user.get_username()

        return token


class TokenSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    tokens = TokenSerializer(read_only=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "tokens")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"],
        )
        user.tokens = generate_tokens_for_user(user)
        return user

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["tokens"] = generate_tokens_for_user(instance)
        return data


class BaseEntrySerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(), allow_empty=True, required=False)

    class Meta:
        fields = ("id", "name", "description", "details", "tags", "created_at", "updated_at")
        read_only_fields = ("id", "created_at", "updated_at")


class BeastSerializer(BaseEntrySerializer):
    armorClass = serializers.CharField(source="armor_class", allow_blank=True, required=False)
    hitPoints = serializers.CharField(source="hit_points", allow_blank=True, required=False)
    challengeRating = serializers.CharField(source="challenge_rating", allow_blank=True, required=False)

    class Meta(BaseEntrySerializer.Meta):
        model = Beast
        fields = BaseEntrySerializer.Meta.fields + (
            "type",
            "size",
            "alignment",
            "armorClass",
            "hitPoints",
            "speed",
            "challengeRating",
            "source",
        )


class SubclassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subclass
        fields = ("id", "name", "description", "features", "created_at", "updated_at")
        read_only_fields = ("id", "created_at", "updated_at")


class GameClassSerializer(BaseEntrySerializer):
    hitDice = serializers.CharField(source="hit_dice", allow_blank=True, required=False)
    primaryAbility = serializers.CharField(source="primary_ability", allow_blank=True, required=False)
    savingThrows = serializers.CharField(source="saving_throws", allow_blank=True, required=False)
    armorProficiencies = serializers.CharField(source="armor_proficiencies", allow_blank=True, required=False)
    weaponProficiencies = serializers.CharField(source="weapon_proficiencies", allow_blank=True, required=False)
    toolProficiencies = serializers.CharField(source="tool_proficiencies", allow_blank=True, required=False)
    skillProficiencies = serializers.CharField(source="skill_proficiencies", allow_blank=True, required=False)
    startingEquipment = serializers.CharField(source="starting_equipment", allow_blank=True, required=False)
    spellcastingAbility = serializers.CharField(source="spellcasting_ability", allow_blank=True, required=False)
    classFeatures = serializers.JSONField(source="class_features", required=False)
    subclasses = SubclassSerializer(many=True, read_only=True)

    class Meta(BaseEntrySerializer.Meta):
        model = GameClass
        fields = BaseEntrySerializer.Meta.fields + (
            "hitDice",
            "primaryAbility",
            "savingThrows",
            "armorProficiencies",
            "weaponProficiencies",
            "toolProficiencies",
            "skillProficiencies",
            "startingEquipment",
            "spellcastingAbility",
            "classFeatures",
            "source",
            "subclasses",
        )


class EquipmentSerializer(BaseEntrySerializer):
    hitPoints = serializers.CharField(source="hit_points", allow_blank=True, required=False)
    urbanizationLevel = serializers.IntegerField(source="urbanization_level", required=False)
    predominantMaterial = serializers.CharField(source="predominant_material", allow_blank=True, required=False)

    class Meta(BaseEntrySerializer.Meta):
        model = Equipment
        fields = BaseEntrySerializer.Meta.fields + (
            "weight",
            "price",
            "size",
            "hitPoints",
            "urbanizationLevel",
            "predominantMaterial",
        )


class ItemSerializer(BaseEntrySerializer):
    attunement = serializers.BooleanField(default=False)
    consumable = serializers.BooleanField(default=False)
    classRequirement = serializers.CharField(source="class_requirement", allow_blank=True, required=False)
    itemType = serializers.CharField(source="item_type")
    urbanizationLevel = serializers.IntegerField(source="urbanization_level", required=False)

    class Meta(BaseEntrySerializer.Meta):
        model = Item
        fields = BaseEntrySerializer.Meta.fields + (
            "tier",
            "rarity",
            "classRequirement",
            "itemType",
            "source",
            "price",
            "weight",
            "attunement",
            "consumable",
            "requirements",
            "urbanizationLevel",
        )


class CountrySerializer(BaseEntrySerializer):
    majorCities = serializers.CharField(source="major_cities", allow_blank=True, required=False)

    class Meta(BaseEntrySerializer.Meta):
        model = Country
        fields = BaseEntrySerializer.Meta.fields + (
            "capital",
            "government",
            "population",
            "majorCities",
            "climate",
            "source",
        )


class RaceSerializer(BaseEntrySerializer):
    creatureType = serializers.CharField(source="creature_type", allow_blank=True, required=False)
    age = serializers.CharField(allow_blank=True, required=False)
    weight = serializers.CharField(allow_blank=True, required=False)
    languages = serializers.CharField(allow_blank=True, required=False)
    racialTrait = serializers.CharField(source="racial_trait", allow_blank=True, required=False)
    primaryAbility = serializers.CharField(source="primary_ability", allow_blank=True, required=False)
    secondaryPrimaryAbility = serializers.CharField(source="secondary_primary_ability", allow_blank=True, required=False)
    minorAbilities = serializers.CharField(source="minor_abilities", allow_blank=True, required=False)
    negativeAbility = serializers.CharField(source="negative_ability", allow_blank=True, required=False)
    secondaryNegativeAbility = serializers.CharField(source="secondary_negative_ability", allow_blank=True, required=False)
    raceGroup = serializers.CharField(source="race_group", allow_blank=True, required=False)
    abilityScoreIncrease = serializers.CharField(source="ability_score_increase", allow_blank=True, required=False)

    class Meta(BaseEntrySerializer.Meta):
        model = Race
        fields = BaseEntrySerializer.Meta.fields + (
            "creatureType",
            "size",
            "speed",
            "age",
            "weight",
            "languages",
            "racialTrait",
            "primaryAbility",
            "secondaryPrimaryAbility",
            "minorAbilities",
            "negativeAbility",
            "secondaryNegativeAbility",
            "raceGroup",
            "source",
            "abilityScoreIncrease",
        )


class GodSerializer(BaseEntrySerializer):
    worshippers = serializers.CharField(allow_blank=True, required=False)

    class Meta(BaseEntrySerializer.Meta):
        model = God
        fields = BaseEntrySerializer.Meta.fields + (
            "alignment",
            "domains",
            "symbol",
            "worshippers",
            "source",
            "churches",
        )


class TraitSerializer(BaseEntrySerializer):
    traitType = serializers.ChoiceField(source="trait_type", choices=Trait.TRAIT_TYPE_CHOICES, default="minor")

    class Meta(BaseEntrySerializer.Meta):
        model = Trait
        fields = BaseEntrySerializer.Meta.fields + (
            "prerequisites",
            "benefits",
            "source",
            "traitType",
        )


class ArticleSerializer(BaseEntrySerializer):
    section = serializers.PrimaryKeyRelatedField(queryset=ArticleSection.objects.all())

    class Meta(BaseEntrySerializer.Meta):
        model = Article
        fields = BaseEntrySerializer.Meta.fields + ("section",)


class ArticleSectionSerializer(serializers.ModelSerializer):
    articles = ArticleSerializer(many=True, read_only=True)

    class Meta:
        model = ArticleSection
        fields = ("id", "name", "articles", "created_at", "updated_at")
        read_only_fields = ("id", "created_at", "updated_at")
