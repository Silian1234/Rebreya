from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ArticleSectionViewSet,
    ArticleViewSet,
    BeastViewSet,
    CountryViewSet,
    EquipmentViewSet,
    GameClassViewSet,
    GodViewSet,
    ItemViewSet,
    MeView,
    RaceViewSet,
    RegisterView,
    SubclassViewSet,
    TraitViewSet,
)

router = DefaultRouter()
router.register(r"bestiary", BeastViewSet, basename="bestiary")
router.register(r"classes", GameClassViewSet, basename="classes")
router.register(r"subclasses", SubclassViewSet, basename="subclasses")
router.register(r"equipment", EquipmentViewSet, basename="equipment")
router.register(r"items", ItemViewSet, basename="items")
router.register(r"countries", CountryViewSet, basename="countries")
router.register(r"races", RaceViewSet, basename="races")
router.register(r"gods", GodViewSet, basename="gods")
router.register(r"traits", TraitViewSet, basename="traits")
router.register(r"articles", ArticleViewSet, basename="articles")
router.register(r"subsections", ArticleSectionViewSet, basename="subsections")

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/me/", MeView.as_view(), name="me"),
    path("", include(router.urls)),
]
