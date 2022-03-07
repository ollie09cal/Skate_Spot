# Generated by Django 4.0.3 on 2022-03-07 10:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Spot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=None, max_length=100)),
                ('location', models.CharField(default=None, max_length=200)),
                ('longitude', models.FloatField(default=None)),
                ('latitude', models.FloatField(default=None)),
                ('image', models.CharField(default=None, max_length=500)),
                ('description', models.CharField(default=None, max_length=500)),
                ('rating', models.PositiveIntegerField(default=None)),
                ('level', models.CharField(default=None, max_length=30)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
