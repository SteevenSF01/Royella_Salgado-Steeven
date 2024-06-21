# Generated by Django 5.0.6 on 2024-06-21 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0037_testimonial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rooms',
            name='adultes',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='rooms',
            name='date_in',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='rooms',
            name='date_out',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='rooms',
            name='enfants',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='rooms',
            name='prom_end',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='rooms',
            name='prom_start',
            field=models.DateField(blank=True, null=True),
        ),
    ]