from django.urls import path
from .views import SpotListView, SpotDetailView

urlpatterns = [
    path('', SpotListView.as_view()),
    path('<int:pk>/', SpotDetailView.as_view())
]