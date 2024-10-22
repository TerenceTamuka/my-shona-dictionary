
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Homepage
    path('dictionary/', views.dictionary_view, name='dictionary'),  # Dictionary page
]