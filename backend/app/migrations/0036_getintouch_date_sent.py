# Generated by Django 5.0.6 on 2024-06-20 22:41

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0035_getintouch'),
    ]

    operations = [
        migrations.AddField(
            model_name='getintouch',
            name='date_sent',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
