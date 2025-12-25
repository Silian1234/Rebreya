from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken


def decode_roles(token: str):
    payload = AccessToken(token)
    return {
        "roles": payload.get("roles", []),
        "is_staff": payload.get("is_staff", False),
        "is_superuser": payload.get("is_superuser", False),
        "username": payload.get("username"),
    }


def test_register_returns_tokens_with_role_claims(api_client):
    response = api_client.post(
        "/api/auth/register/",
        {"username": "newbie", "email": "newbie@example.com", "password": "testpass123"},
        format="json",
    )
    assert response.status_code == status.HTTP_201_CREATED
    access = response.data["tokens"]["access"]
    claims = decode_roles(access)
    assert claims["username"] == "newbie"
    assert claims["roles"] == []
    assert claims["is_staff"] is False
    assert claims["is_superuser"] is False


def test_login_staff_includes_admin_roles(api_client, staff_user, user_password):
    response = api_client.post(
        "/api/auth/login/",
        {"username": staff_user.username, "password": user_password},
        format="json",
    )
    assert response.status_code == status.HTTP_200_OK
    access = response.data["access"]
    claims = decode_roles(access)
    # staff flag is propagated and the synthetic admin role is present
    assert claims["is_staff"] is True
    assert "admin" in claims["roles"]
    assert "staff" in claims["roles"]
    assert claims["username"] == staff_user.username
