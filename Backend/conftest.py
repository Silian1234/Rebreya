import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()


@pytest.fixture
def api_client() -> APIClient:
    return APIClient()


@pytest.fixture
def user_password() -> str:
    return "testpass123"


@pytest.fixture
def user(user_password: str):
    return User.objects.create_user(username="user", password=user_password, email="user@example.com")


@pytest.fixture
def staff_user(user_password: str):
    return User.objects.create_user(
        username="staff",
        password=user_password,
        email="staff@example.com",
        is_staff=True,
    )
