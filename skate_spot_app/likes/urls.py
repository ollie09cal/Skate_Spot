from django.urls import path
from .views import LikeListView, DetailLikeView

urlpatterns = [
    path('', LikeListView.as_view()),
    path('<int:pk>/', DetailLikeView.as_view())
]