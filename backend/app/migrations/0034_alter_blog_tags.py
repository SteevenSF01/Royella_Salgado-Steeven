# Generated by Django 5.0.6 on 2024-06-20 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0033_alter_comment_auteur'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='tags',
            field=models.ManyToManyField(to='app.tags'),
        ),
    ]
