from .models import ManagerVideo, Employe, PosteEmploye, HeroHome, BanierePages, FooterGallery
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


# Baniere du home et des autres pages + footer gallery #
class HeroHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroHome
        fields = '__all__'

    def update(self, instance, validated_data):
        if 'photo' not in validated_data:
            validated_data['photo'] = instance.photo 
        return super().update(instance, validated_data)

class BanierePagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BanierePages
        fields = '__all__'
    def update(self, instance, validated_data):
        if 'image' not in validated_data:
            validated_data['image'] = instance.image
        return super().update(instance, validated_data)

class FooterGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterGallery
        fields = '__all__'
    def update(self, instance, validated_data):
        if 'image' not in validated_data:
            validated_data['image'] = instance.image
        return super().update(instance, validated_data)