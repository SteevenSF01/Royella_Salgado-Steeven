from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager


# Create your models here.


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    ROLES = (
        ('UTILISATEUR', 'Utilisateur'),
        ('RECEPTIONNISTE', 'Réceptionniste'),
        ('REDACTEUR', 'Rédacteur'),
        ('WEBMASTER', 'Webmaster'),
        ('ADMINISTRATEUR', 'Administrateur'),
    )
    username = None 
    email = models.EmailField('email address', unique=True)
    role = models.CharField('role', max_length=20, choices=ROLES, default='UTILISATEUR')
    photo = models.ImageField('photo', upload_to='images/utilisateur', null=True, blank=True)
    carteCredit = models.CharField('credit card', max_length=50, default='')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
        
# Categories #

class Categories(models.Model):
    nom = models.CharField(max_length=200)
    
# Tags #

class Tags(models.Model):
    nom = models.CharField(max_length=200)
    
    
# Blog #

class Blog(models.Model):
    status_choix = (
        ('draft', 'Draft'),
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    titre = models.CharField(max_length=200)
    contenue = models.TextField()
    image = models.ImageField(upload_to='images/blogs/')
    auteur = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='blog')
    posted_on = models.DateTimeField(auto_now_add=True)
    categorie = models.ForeignKey(Categories, on_delete=models.SET_NULL, null=True, blank=True)
    tags = models.ManyToManyField(Tags)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=status_choix, default='draft')
    
class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='comments')
    auteur = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='comments')
    contenue = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
class BlogDescription(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='blog_descriptions')
    titre = models.CharField(max_length=200, null=True, blank=True)
    contenue = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='images/blogs/', blank=True, null=True)    
    

    
# PosteEmploye #
class PosteEmploye(models.Model):
    poste = models.CharField(max_length=50)

# Employe #
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
    sous_titre = models.CharField(max_length=50)
    description = models.TextField(default='')
    photo = models.ImageField(upload_to='images/facilities', null=True, blank=True)
    order = models.PositiveIntegerField(unique=True)
    rules = models.TextField(default='')
    dress_code1 = models.CharField(max_length=150, default='')
    dress_code2 = models.CharField(max_length=150, default='')
    dress_code3 = models.CharField(max_length=150, default='')
    
class FacilitiesRoom(models.Model):
    nom = models.CharField(max_length=50)
    logo = models.ImageField(upload_to='images/facilitiesRoom', null=True, blank=True)
    image = models.ImageField(upload_to='images/facilitiesRoom', null=True, blank=True)

# Rooms #

class Rooms(models.Model):
    nom = models.CharField(max_length=50)
    description = models.TextField(default='')
    photo = models.ImageField(upload_to='images/rooms', null=True, blank=True)
    etoiles = models.PositiveIntegerField()
    lit = models.PositiveIntegerField()
    nom_lit = models.CharField(max_length=50)
    prix = models.PositiveIntegerField()
    adultes = models.PositiveIntegerField()
    enfants = models.PositiveIntegerField()
    max_adultes = models.PositiveIntegerField()
    max_enfants = models.PositiveIntegerField()
    date_in = models.DateField()
    date_out = models.DateField()
    superficie = models.PositiveIntegerField()
    amenities = models.ManyToManyField(FacilitiesRoom, blank=True)
    prom_start = models.DateField()
    prom_end = models.DateField()
    pourcentage_prom = models.PositiveIntegerField(default=0)
    
class RoomService(models.Model):
    nom = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images/rooms', null=True, blank=True)
    prix = models.PositiveIntegerField()
    desc1 = models.CharField(max_length=80)
    desc2 = models.CharField(max_length=80)
    desc3 = models.CharField(max_length=80)
    desc4 = models.CharField(max_length=80)


# Get in touch #
from django.utils import timezone
class GetInTouch(models.Model):
    nom = models.CharField(max_length=50)
    email = models.EmailField()
    contenue = models.TextField()
    date_sent = models.DateTimeField(default=timezone.now)

# Testimonials #

class Testimonial(models.Model):
    date = models.DateTimeField(default=timezone.now)
    auteur = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='testimonials')
    etoiles = models.PositiveIntegerField()
    contenu = models.TextField()
