from rest_framework import status


CREATE_CASES = [
    (
      "/api/races/",
      {"name": "Elf", "description": "desc", "details": "details", "tags": ["swift"]},
    ),
    (
      "/api/classes/",
      {"name": "Wizard", "description": "caster", "details": "details", "hitDice": "d6", "tags": []},
    ),
    (
      "/api/countries/",
      {"name": "Republic", "description": "land", "details": "details", "tags": []},
    ),
    (
      "/api/gods/",
      {"name": "Aurora", "description": "light", "details": "details", "tags": []},
    ),
    (
      "/api/traits/",
      {"name": "Brave", "description": "fearless", "details": "details", "traitType": "background", "tags": []},
    ),
    (
      "/api/items/",
      {
        "name": "Sword",
        "description": "sharp",
        "details": "details",
        "itemType": "Оружие/доспех",
        "tier": "Minor",
        "tags": [],
      },
    ),
    (
      "/api/equipment/",
      {"name": "Rope", "description": "utility", "details": "details", "tags": []},
    ),
]


def test_anonymous_cannot_create_resources(api_client):
    for endpoint, payload in CREATE_CASES:
        resp = api_client.post(endpoint, payload, format="json")
        assert resp.status_code in (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN)


def test_staff_can_create_resources(api_client, staff_user):
    api_client.force_authenticate(user=staff_user)
    for endpoint, payload in CREATE_CASES:
        resp = api_client.post(endpoint, payload, format="json")
        assert resp.status_code == status.HTTP_201_CREATED, f"Failed on {endpoint}: {resp.data}"
        assert resp.data.get("id")

        # verify the created object appears in list
        list_resp = api_client.get(endpoint)
        assert list_resp.status_code == status.HTTP_200_OK
        ids = [obj["id"] for obj in (list_resp.data if isinstance(list_resp.data, list) else list_resp.data.get("results", []))]
        assert resp.data["id"] in ids
