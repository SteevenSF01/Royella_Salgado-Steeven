from .models import ManagerVideo, Employe, PosteEmploye, HeroHome, BanierePages, FooterGallery, Contact, FAQ, Facilities, FacilitiesRoom, Rooms
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

# Google maps + contact #

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
    
# FAQ #

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'
    
# Facilities #

class FacilitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facilities
        fields = '__all__'

class FacilitiesRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacilitiesRoom
        fields = '__all__'
        
# Rooms #

class RoomsSerializer(serializers.ModelSerializer):
    amenities = FacilitiesRoomSerializer(many=True, read_only=True)
    amenities_ids = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=FacilitiesRoom.objects.all(), 
        write_only=True
    )
    
    class Meta:
        model = Rooms
        fields = '__all__'
        extra_fields = ['amenities_ids']
    
    def create(self, validated_data):
        amenities_ids = validated_data.pop('amenities_ids', [])
        room = super().create(validated_data)
        room.amenities.set(amenities_ids)
        return room

    def update(self, instance, validated_data):
        amenities_ids = validated_data.pop('amenities_ids', [])
        room = super().update(instance, validated_data)
        room.amenities.set(amenities_ids)
        return room
