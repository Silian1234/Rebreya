from django.contrib.auth import get_user_model
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

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
from .serializers import (
    ArticleSectionSerializer,
    ArticleSerializer,
    BeastSerializer,
    CountrySerializer,
    EquipmentSerializer,
    GameClassSerializer,
    GodSerializer,
    ItemSerializer,
    RaceSerializer,
    RegisterSerializer,
    RoleAwareTokenObtainPairSerializer,
    SubclassSerializer,
    TraitSerializer,
)

User = get_user_model()


class RoleAwareTokenObtainPairView(TokenObtainPairView):
    serializer_class = RoleAwareTokenObtainPairSerializer


class StaffOrSuperuserOrReadOnly(permissions.BasePermission):
    """
    Allow safe methods for everyone, restrict write operations to staff/superusers.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        user = request.user
        return bool(user and user.is_authenticated and (user.is_staff or user.is_superuser))

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(serializer.to_representation(user), status=status.HTTP_201_CREATED)


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({"id": request.user.id, "username": request.user.username, "email": request.user.email})


class BaseViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class BeastViewSet(BaseViewSet):
    queryset = Beast.objects.all()
    serializer_class = BeastSerializer


class GameClassViewSet(BaseViewSet):
    queryset = GameClass.objects.all().prefetch_related("subclasses")
    serializer_class = GameClassSerializer


class SubclassViewSet(BaseViewSet):
    queryset = Subclass.objects.select_related("game_class").all()
    serializer_class = SubclassSerializer


class EquipmentViewSet(BaseViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer


class ItemViewSet(BaseViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class CountryViewSet(BaseViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class RaceViewSet(BaseViewSet):
    queryset = Race.objects.all()
    serializer_class = RaceSerializer


class GodViewSet(BaseViewSet):
    queryset = God.objects.all()
    serializer_class = GodSerializer


class TraitViewSet(BaseViewSet):
    queryset = Trait.objects.all()
    serializer_class = TraitSerializer


class ArticleViewSet(BaseViewSet):
    queryset = Article.objects.select_related("section").all()
    serializer_class = ArticleSerializer
    permission_classes = [StaffOrSuperuserOrReadOnly]


class ArticleSectionViewSet(BaseViewSet):
    queryset = ArticleSection.objects.all().prefetch_related("articles")
    serializer_class = ArticleSectionSerializer
    permission_classes = [StaffOrSuperuserOrReadOnly]

    @action(detail=True, methods=["post"], url_path="articles")
    def create_article(self, request, pk=None):
        section = self.get_object()
        serializer = ArticleSerializer(data={**request.data, "section": section.id})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
