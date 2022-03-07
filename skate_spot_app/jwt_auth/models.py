from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)
    profile_image = models.CharField(max_length=300)
    bio = models.CharField(max_length=255)
    follows = models.ManyToManyField(
        "self",
        related_name="followed_by",
        symmetrical=False,
        blank=True
    )
