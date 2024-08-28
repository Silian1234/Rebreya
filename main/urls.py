from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'classes', views.ClassViewSet)
router.register(r'races', views.RaceViewSet)
router.register(r'subraces', views.SubraceViewSet)
router.register(r'subclasses', views.SubclassViewSet)
router.register(r'spells', views.SpellViewSet)
router.register(r'feats', views.FeatViewSet)

urlpatterns = router.urls