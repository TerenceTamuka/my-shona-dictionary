from django.contrib import admin
from .models import DictionaryEntry


@admin.register(DictionaryEntry)
class DictionaryEntryAdmin(admin.ModelAdmin):
    list_display = ('english_word', 'shona_translation', 'created_at', 'updated_at')
    search_fields = ('english_word', 'shona_translation')


# Register your models here.
# admin.site.register(DictionaryEntry)