from .models import *
from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.hashers import make_password
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework.response import Response
from django.conf import settings
import os
import base64


CustomUser = get_user_model()

#region Custom User #


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 'role', 'photo'
        ]


#region Register #
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
        image_path = os.path.join(
            settings.BASE_DIR, 'static/images/inner-logo.png')
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


#region Employe #

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
    employe_id = serializers.PrimaryKeyRelatedField(
        queryset=Employe.objects.all(), source='employe')

    class Meta:
        model = ManagerVideo
        fields = '__all__'


#region Baniere du home et des autres pages + footer gallery #
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

#region Google maps + contact #


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

#region FAQ #


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'

#region Facilities #


class FacilitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facilities
        fields = '__all__'


class FacilitiesRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacilitiesRoom
        fields = '__all__'

#region Rooms #


class RoomsSerializer(serializers.ModelSerializer):
    amenities = FacilitiesRoomSerializer(many=True, read_only=True)
    facilitiesroom_id = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=FacilitiesRoom.objects.all(),
        write_only=True,
        source = 'amenities',
    )

    class Meta:
        model = Rooms
        fields = ['id','nom', 'description', 'photo', 'etoiles', 'nom_lit', 'prix', 'max_adultes', 'lit', 'max_enfants', 'superficie', "amenities",'facilitiesroom_id']

    def create(self, validated_data):
        amenities = validated_data.pop('amenities', [])
        room = Rooms.objects.create(**validated_data)
        room.amenities.set(amenities)
        return room
    
class RoomServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomService
        fields = '__all__'
        
        
#region Reservation #

class ReservationSerializer(serializers.ModelSerializer):
    client = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(),
        write_only=True 
    )
    room = serializers.PrimaryKeyRelatedField(
        queryset=Rooms.objects.all(),
        write_only=True 
    )

    class Meta:
        model = Reservation
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        client = CustomUser.objects.get(id=instance.client.id)
        room = Rooms.objects.get(id=instance.room.id)

        representation['client'] = {
            'id': client.id,
            'email': client.email,
            'photo': client.photo.url,
            'first_name': client.first_name,
            'last_name': client.last_name,
        }
        representation['room'] = {
            'id': room.id,
            'nom': room.nom,
            'prix': room.prix,
            'photo': room.photo.url,
        }

        return representation

#region Tags #

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = '__all__'

#region Categories #


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'

#region  Blogs #


class BlogDescriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlogDescription
        fields = [
            'id', 'blog', 'titre', 'contenue', 'image'
        ]


class CommentSerializer(serializers.ModelSerializer):
    blog = serializers.PrimaryKeyRelatedField(queryset=Blog.objects.all())
    auteur = CustomUserSerializer(read_only=True)
    auteur_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(), source='auteur', write_only=True)

    class Meta:
        model = Comment
        fields = [
            'id', 'blog', 'auteur', 'auteur_id', 'contenue', 'created_at'
        ]


class BlogSerializer(serializers.ModelSerializer):
    auteur = CustomUserSerializer(read_only=True)
    categorie = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    blog_descriptions = BlogDescriptionSerializer(many=True, read_only=True)
    categorie_id = serializers.PrimaryKeyRelatedField(
        queryset=Categories.objects.all(), source='categorie', write_only=True)
    tags_id = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Tags.objects.all(), source='tags', write_only=True)
    auteur_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(), source='auteur', write_only=True)

    class Meta:
        model = Blog
        fields = [
            'id', 'titre', 'contenue', 'image', 'auteur', 'posted_on', 'categorie',
            'tags', 'comments', 'created_at', 'updated_at', 'status', 'blog_descriptions',
            'categorie_id', 'tags_id', 'auteur_id'
        ]

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        blog = Blog.objects.create(**validated_data)
        blog.tags.set(tags_data)
        return blog


class CreateBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['titre', 'contenue', 'image', 'auteur', 'categorie', 'tags']

#region Get in touch #


class GetInTouchSerializer(serializers.ModelSerializer):
    class Meta:
        model = GetInTouch
        fields = '__all__'

#region Testimonials #


class TestimonialSerializer(serializers.ModelSerializer):
    auteur = CustomUserSerializer(read_only=True)

    class Meta:
        model = Testimonial
        fields = '__all__'
