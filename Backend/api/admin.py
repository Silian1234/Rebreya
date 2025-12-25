from django.contrib import admin

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


class SubclassInline(admin.TabularInline):
    model = Subclass
    extra = 0


@admin.register(GameClass)
class GameClassAdmin(admin.ModelAdmin):
    list_display = ("name", "primary_ability", "source")
    search_fields = ("name", "description")
    inlines = [SubclassInline]


@admin.register(ArticleSection)
class ArticleSectionAdmin(admin.ModelAdmin):
    list_display = ("name",)


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("name", "section")
    search_fields = ("name", "description")
    list_filter = ("section",)


for model in [Beast, Country, Equipment, God, Item, Race, Trait]:
    admin.site.register(model)
