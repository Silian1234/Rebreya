import types

import pytest
from rest_framework import permissions

from api.serializers import RoleAwareTokenObtainPairSerializer
from api.views import StaffOrSuperuserOrReadOnly


class DummyUser:
    def __init__(self, *, is_staff=False, is_superuser=False, groups=None, username="dummy"):
        self.is_staff = is_staff
        self.is_superuser = is_superuser
        self._groups = groups or []
        self.username = username

    @property
    def groups(self):
        # mimic .all() returning queryset-like iterable
        return types.SimpleNamespace(all=lambda: [types.SimpleNamespace(name=name) for name in self._groups])

    def get_username(self):
        return self.username


def test_role_aware_token_serializer_injects_roles():
    user = DummyUser(is_staff=True, groups=["Editors"], username="staffer")
    token = RoleAwareTokenObtainPairSerializer.get_token(user)

    assert token["username"] == "staffer"
    assert token["is_staff"] is True
    assert token["is_superuser"] is False
    assert "staff" in token["roles"]
    assert "admin" in token["roles"]
    assert "editors" in token["roles"]
    assert token["groups"] == ["Editors"]


def test_staff_or_superuser_or_readonly_permission():
    perm = StaffOrSuperuserOrReadOnly()

    class DummyRequest:
        def __init__(self, method, user=None):
            self.method = method
            self.user = user

    safe_request = DummyRequest("GET", DummyUser())
    assert perm.has_permission(safe_request, None) is True

    anon_post = DummyRequest("POST", DummyUser())
    assert perm.has_permission(anon_post, None) is False

    staff_post = DummyRequest("POST", DummyUser(is_staff=True))
    assert perm.has_permission(staff_post, None) is True

    super_post = DummyRequest("POST", DummyUser(is_superuser=True))
    assert perm.has_permission(super_post, None) is True
