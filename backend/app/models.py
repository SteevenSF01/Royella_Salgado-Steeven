from django.db import models

# Create your models here.

class Employe(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='images/employe', null=True, blank=True)
    poste = models.CharField(max_length=50)
    email = models.EmailField()
    
class ManagerVideo(models.Model):
    url = models.URLField()
    nom_hotel = models.CharField(max_length=50, default='')
    description = models.TextField(default='')
    quote = models.TextField(default='')
    