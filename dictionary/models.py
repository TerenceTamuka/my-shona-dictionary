from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class DictionaryEntry(models.Model):
    english_word = models.CharField(max_length=100, unique=True)  # English word to be translated
    shona_translation = models.CharField(max_length=100)  # Shona translation of the word
    description = models.TextField(blank=True, null=True)  # Optional description or context
    created_at = models.DateTimeField(default=timezone.now)  # Entry creation time
    updated_at = models.DateTimeField(auto_now=True)  # Entry last updated time
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)  # Optional link to user

    def __str__(self):
        return f"{self.english_word} - {self.shona_translation}"

