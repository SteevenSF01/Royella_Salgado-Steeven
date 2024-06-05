from .models import ManagerVideo, Employe, PosteEmploye
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class PosteEmployeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PosteEmploye
        fields = ['id', 'poste']
class EmployeSerializer(serializers.ModelSerializer):
    poste = PosteEmployeSerializer(read_only=True)
    class Meta:
        model = Employe
        fields = ['id', 'nom', 'prenom', 'photo', 'poste', 'email']
class ManagerVideoSerializer(serializers.ModelSerializer):
    employe = EmployeSerializer(read_only=True)
    employe_id = serializers.PrimaryKeyRelatedField(queryset=Employe.objects.all(), source='employe')


    class Meta:
        model = ManagerVideo
        fields = '__all__'
        # fields = ['id', 'url', 'nom_hotel', 'description', 'quote', 'employe_id']
        
        