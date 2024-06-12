from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
    ROLES = (
        ('UTILISATEUR', 'Utilisateur'),
        ('RECEPTIONNISTE', 'Réceptionniste'),
        ('REDACTEUR', 'Rédacteur'),
        ('WEBMASTER', 'Webmaster'),
        ('ADMINISTRATEUR', 'Administrateur'),
    )
    role = models.CharField(max_length=20, choices=ROLES, default='UTILISATEUR')
    photo = models.ImageField(upload_to='images/utilisateur', null=True, blank=True)
    carteCredit = models.CharField(max_length=50, default='')
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups',
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )
    
class PosteEmploye(models.Model):
    poste = models.CharField(max_length=50)

class Employe(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='images/employe', null=True, blank=True)
    poste = models.ForeignKey(PosteEmploye, on_delete=models.SET_NULL, null=True, blank=True)
    email = models.EmailField()
    
class ManagerVideo(models.Model):
    url = models.URLField()
    nom_hotel = models.CharField(max_length=50, default='')
    description = models.TextField(default='')
    quote = models.TextField(default='')
    employe = models.ForeignKey(Employe, on_delete=models.SET_NULL, null=True, blank=True)

# Baniere du home et des autres pages + footer gallery #
class HeroHome(models.Model):
    titre = models.CharField(max_length=50)
    best = models.CharField(max_length=50)
    place = models.CharField(max_length=50, default='')
    photo = models.ImageField(upload_to='images/hotels', null=True, blank=True)
    etoiles = models.PositiveIntegerField()
    telephone = models.CharField(max_length=20)
    
class BanierePages(models.Model):
    image = models.ImageField(upload_to='images/hotels', null=True, blank=True)
    
class FooterGallery(models.Model):
    image = models.ImageField(upload_to='images/footer', null=True, blank=True)
    
# Google maps + contact #

class Contact(models.Model):
    text = models.TextField(default='')
    email = models.EmailField()
    numero = models.CharField(max_length=20)
    address = models.CharField(max_length=255) 
    latitude = models.FloatField()  
    longitude = models.FloatField() 
    
# FAQ #

class FAQ(models.Model):
    question = models.CharField(max_length=150)
    reponse = models.TextField()
    active = models.BooleanField(default=False)
    
# Facilities #

class Facilities(models.Model):
    nom = models.CharField(max_length=50)
    description = models.TextField(default='')
    photo = models.ImageField(upload_to='images/facilities', null=True, blank=True)