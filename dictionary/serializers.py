# dictionary/serializers.py
from rest_framework import serializers
from .models import DictionaryEntry

class DictionaryEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DictionaryEntry
        fields = ['english_word', 'shona_translation', 'description']