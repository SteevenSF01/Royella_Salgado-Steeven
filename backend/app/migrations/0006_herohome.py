# Generated by Django 5.0.6 on 2024-06-05 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_customuser'),
    ]

    operations = [
        migrations.CreateModel(
            name='HeroHome',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=50)),
                ('chaine', models.CharField(max_length=50)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='images/hotels')),
                ('etoiles', models.PositiveIntegerField()),
                ('telephone', models.CharField(max_length=20)),
            ],
        ),
    ]