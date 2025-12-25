from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class BaseEntry(TimeStampedModel):
    name = models.CharField(max_length=255)
    description = models.TextField()
    details = models.TextField()
    tags = models.JSONField(default=list, blank=True)

    class Meta:
        abstract = True
        ordering = ("name",)

    def __str__(self) -> str:
        return self.name


class Beast(BaseEntry):
    type = models.CharField(max_length=255, blank=True, default="")
    size = models.CharField(max_length=255, blank=True, default="")
    alignment = models.CharField(max_length=255, blank=True, default="")
    armor_class = models.CharField(max_length=255, blank=True, default="")
    hit_points = models.CharField(max_length=255, blank=True, default="")
    speed = models.CharField(max_length=255, blank=True, default="")
    challenge_rating = models.CharField(max_length=255, blank=True, default="")
    source = models.CharField(max_length=255, blank=True, default="")


class GameClass(BaseEntry):
    hit_dice = models.CharField(max_length=50, blank=True, default="")
    primary_ability = models.CharField(max_length=255, blank=True, default="")
    saving_throws = models.CharField(max_length=255, blank=True, default="")
    armor_proficiencies = models.CharField(max_length=255, blank=True, default="")
    weapon_proficiencies = models.CharField(max_length=255, blank=True, default="")
    tool_proficiencies = models.CharField(max_length=255, blank=True, default="")
    skill_proficiencies = models.CharField(max_length=255, blank=True, default="")
    starting_equipment = models.TextField(blank=True, default="")
    spellcasting_ability = models.CharField(max_length=255, blank=True, default="")
    class_features = models.JSONField(default=dict, blank=True)
    source = models.CharField(max_length=255, blank=True, default="")


class Subclass(TimeStampedModel):
    game_class = models.ForeignKey(GameClass, related_name="subclasses", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    features = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ("name",)

    def __str__(self) -> str:
        return f"{self.name} ({self.game_class.name})"


class Equipment(BaseEntry):
    weight = models.CharField(max_length=50, blank=True, default="")
    price = models.CharField(max_length=50, blank=True, default="")
    size = models.CharField(max_length=50, blank=True, default="")
    hit_points = models.CharField(max_length=50, blank=True, default="")
    urbanization_level = models.PositiveIntegerField(default=1)
    predominant_material = models.CharField(max_length=255, blank=True, default="")


class Item(BaseEntry):
    TIER_CHOICES = (("Major", "Major"), ("Minor", "Minor"))

    tier = models.CharField(max_length=10, choices=TIER_CHOICES, default="Minor")
    rarity = models.CharField(max_length=255, blank=True, default="")
    class_requirement = models.CharField(max_length=255, blank=True, default="")
    item_type = models.CharField(max_length=255)
    source = models.CharField(max_length=255, blank=True, default="")
    price = models.CharField(max_length=50, blank=True, default="")
    weight = models.CharField(max_length=50, blank=True, default="")
    attunement = models.BooleanField(default=False)
    consumable = models.BooleanField(default=False)
    requirements = models.TextField(blank=True, default="")
    urbanization_level = models.PositiveIntegerField(default=1)


class Country(BaseEntry):
    capital = models.CharField(max_length=255, blank=True, default="")
    government = models.CharField(max_length=255, blank=True, default="")
    population = models.CharField(max_length=255, blank=True, default="")
    major_cities = models.CharField(max_length=255, blank=True, default="")
    climate = models.CharField(max_length=255, blank=True, default="")
    source = models.CharField(max_length=255, blank=True, default="")


class Race(BaseEntry):
    creature_type = models.CharField(max_length=255, blank=True, default="")
    size = models.CharField(max_length=255, blank=True, default="")
    speed = models.CharField(max_length=255, blank=True, default="")
    age = models.CharField(max_length=255, blank=True, default="")
    weight = models.CharField(max_length=255, blank=True, default="")
    languages = models.CharField(max_length=255, blank=True, default="")
    racial_trait = models.TextField(blank=True, default="")
    primary_ability = models.TextField(blank=True, default="")
    secondary_primary_ability = models.TextField(blank=True, default="")
    minor_abilities = models.TextField(blank=True, default="")
    negative_ability = models.TextField(blank=True, default="")
    secondary_negative_ability = models.TextField(blank=True, default="")
    race_group = models.CharField(max_length=255, blank=True, default="")
    source = models.CharField(max_length=255, blank=True, default="")
    ability_score_increase = models.CharField(max_length=255, blank=True, default="")


class God(BaseEntry):
    alignment = models.CharField(max_length=255, blank=True, default="")
    domains = models.CharField(max_length=255, blank=True, default="")
    symbol = models.CharField(max_length=255, blank=True, default="")
    worshippers = models.CharField(max_length=255, blank=True, default="")
    source = models.CharField(max_length=255, blank=True, default="")
    churches = models.CharField(max_length=255, blank=True, default="")


class Trait(BaseEntry):
    TRAIT_TYPE_CHOICES = (
        ("minor", "Minor"),
        ("common", "Common"),
        ("major", "Major"),
        ("racial", "Racial"),
        ("multiclass", "Multiclass"),
    )

    prerequisites = models.TextField(blank=True, default="")
    benefits = models.TextField(blank=True, default="")
    source = models.CharField(max_length=255, blank=True, default="")
    trait_type = models.CharField(max_length=32, choices=TRAIT_TYPE_CHOICES, default="minor")


class ArticleSection(TimeStampedModel):
    name = models.CharField(max_length=255)

    class Meta:
        ordering = ("name",)

    def __str__(self) -> str:
        return self.name


class Article(BaseEntry):
    section = models.ForeignKey(ArticleSection, related_name="articles", on_delete=models.CASCADE)
