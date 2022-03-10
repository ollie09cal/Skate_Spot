from django.urls import path
from .views import RegisterView, LoginView, ViewProfile

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', ViewProfile.as_view())
]