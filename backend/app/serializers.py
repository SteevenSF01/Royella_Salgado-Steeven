from .models import ManagerVideo, Employe, PosteEmploye
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class ManagerVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManagerVideo
        fields = ['id', 'url', 'nom_hotel', 'description', 'quote']
        
class PosteEmployeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PosteEmploye
        fields = ['id', 'poste']
class EmployeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employe
        fields = ['id', 'nom', 'prenom', 'photo', 'poste', 'email']
        