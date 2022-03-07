from django.urls import path
from .views import SpotListView

urlpatterns = [
    path('', SpotListView.as_view())
]