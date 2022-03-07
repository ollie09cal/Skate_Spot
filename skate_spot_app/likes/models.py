from django.db import models

# Create your models here.
class Like(models.Model):
    like = models.BooleanField(default=False)
    spot = models.ForeignKey(
        "spots.Spot",
        realted_name = 'likes',
        on_delete = models.CASCADE
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="likes",
        on_delete = models.CASCADE
    )