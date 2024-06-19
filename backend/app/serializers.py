from .models import ManagerVideo, Employe, PosteEmploye, HeroHome, BanierePages, FooterGallery, Contact, FAQ, Facilities, FacilitiesRoom, Rooms, RoomService
from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.hashers import make_password
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
import os
import base64



CustomUser = get_user_model()

# Register #
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    photo = serializers.ImageField(required=False)

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'password', 'photo']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password'],
            photo=validated_data.get('photo'),
        )
        base64_image = self.get_base64_logo()

        self.send_confirmation_email(user, base64_image)        
        return user
    
    def get_base64_logo(self):
        image_path = os.path.join(settings.BASE_DIR, 'static/images/inner-logo.png')   
        with open(image_path, 'rb') as image_file:
            base64_image = base64.b64encode(image_file.read()).decode('utf-8')
        return base64_image

    def send_confirmation_email(self, user, base64_image):
        subject = "Registration confirmation"
        from_email = settings.EMAIL_HOST_USER
        to_email = [user.email]
        context = {'user': user, 'base64_image': base64_image}
        html_content = render_to_string('modelMail.html', context)
        
        email = EmailMultiAlternatives(subject, '', from_email, to_email)
        email.attach_alternative(html_content, "text/html")
        email.send()
        

# Employe #

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


class RoomServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomService
        fields = '__all__'