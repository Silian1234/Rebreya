from rest_framework import viewsets
from .models import Classes, Race, Subrace, Subclass, Spells, Feats
from .serializers import ClassSerializer, RaceSerializer, SubraceSerializer, SubclassSerializer, SpellSerializer, FeatSerializer

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Classes.objects.all()
    serializer_class = ClassSerializer

class RaceViewSet(viewsets.ModelViewSet):
    queryset = Race.objects.all()
    serializer_class = RaceSerializer

class SubraceViewSet(viewsets.ModelViewSet):
    queryset = Subrace.objects.all()
    serializer_class = SubraceSerializer

class SubclassViewSet(viewsets.ModelViewSet):
    queryset = Subclass.objects.all()
    serializer_class = SubclassSerializer

class SpellViewSet(viewsets.ModelViewSet):
    queryset = Spells.objects.all()
    serializer_class = SpellSerializer

class FeatViewSet(viewsets.ModelViewSet):
    queryset = Feats.objects.all()
    serializer_class = FeatSerializer