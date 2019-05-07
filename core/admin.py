from django.contrib import admin
from .models import Text, Score


@admin.register(Text)
class TextAdmin(admin.ModelAdmin):
	list_display = ('text', 'id')


@admin.register(Score)
class ScoreAdmin(admin.ModelAdmin):
	list_display = ('user', 'score', 'date')
