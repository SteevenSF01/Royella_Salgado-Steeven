# Generated by Django 5.0.6 on 2024-06-26 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0039_reservation'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='prix_total',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
