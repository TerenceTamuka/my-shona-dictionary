from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Homepage
    path('dictionary/', views.dictionary_view, name='dictionary'),  # Dictionary page
    path('login/', views.login_view, name='login'),  # Login page
    path('logout/', views.logout_view, name='logout'),  # Logout page
    path('register/', views.register_view, name='register'),  # Register page
]
