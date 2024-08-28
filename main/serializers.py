from rest_framework import serializers
from .models import Classes, Race, Subrace, Subclass, Spells, Feats

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classes
        fields = '__all__'

class RaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Race
        fields = '__all__'

class SubraceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subrace
        fields = '__all__'

class SubclassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subclass
        fields = '__all__'

class SpellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spells
        fields = '__all__'

class FeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feats
        fields = '__all__'