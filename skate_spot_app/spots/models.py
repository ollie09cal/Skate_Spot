from django.db import models

# Create your models here.
class Spot(models.Model):
    name = models.CharField(max_length=100, default=None)
    location = models.CharField(max_length=200, default=None)
    longitude = models.FloatField(default=None)
    latitude = models.FloatField(default=None)
    image = models.CharField(max_length=500, default=None)
    description = models.CharField(max_length=500, default=None)
    rating = models.PositiveIntegerField(default=None)
    level = models.CharField(max_length=30, default=None)
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="reviews",
        on_delete = models.CASCADE
    )

    def __str__(self):
        return f"{self.name} - ({self.location})"