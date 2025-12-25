from rest_framework import status


def test_anonymous_cannot_create_section(api_client):
    response = api_client.post("/api/subsections/", {"name": "Lore"}, format="json")
    assert response.status_code in (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN)


def test_user_cannot_create_section_or_article(api_client, user):
    api_client.force_authenticate(user=user)
    section = api_client.post("/api/subsections/", {"name": "Lore"}, format="json")
    assert section.status_code == status.HTTP_403_FORBIDDEN

    # ensure GET still works for safe methods
    get_sections = api_client.get("/api/subsections/")
    assert get_sections.status_code == status.HTTP_200_OK


def test_staff_can_create_sections_and_articles(api_client, staff_user):
    api_client.force_authenticate(user=staff_user)
    section = api_client.post("/api/subsections/", {"name": "Secrets"}, format="json")
    assert section.status_code == status.HTTP_201_CREATED
    section_id = section.data["id"]

    article = api_client.post(
        f"/api/subsections/{section_id}/articles/",
        {"name": "Hidden", "description": "desc", "details": "full", "tags": []},
        format="json",
    )
    assert article.status_code == status.HTTP_201_CREATED

    # public GET should be allowed
    api_client.force_authenticate(user=None)
    articles = api_client.get("/api/articles/")
    assert articles.status_code == status.HTTP_200_OK
