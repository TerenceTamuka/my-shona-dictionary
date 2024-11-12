
from django.urls import path
from . import views
from .views import DictionaryEntryAPIView

urlpatterns = [
    path('', views.home, name='home'),  # Homepage
    path('dictionary/', views.dictionary_view, name='dictionary'),  # Dictionary page
    path('api/translate/', views.DictionaryEntryAPIView.as_view(), name='dictionary-api'),  # API endpoint
]