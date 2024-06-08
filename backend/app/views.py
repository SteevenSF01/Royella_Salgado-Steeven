from django.shortcuts import render
from .models import ManagerVideo, Employe, PosteEmploye, HeroHome, BanierePages, FooterGallery, Contact
from .serializers import ManagerVideoSerializer, EmployeSerializer, PosteEmployeSerializer, HeroHomeSerializer, BanierePagesSerializer, ContactSerializer ,FooterGallerySerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets, generics


# Create your views here.

class ManagerView(viewsets.ModelViewSet):
    queryset = ManagerVideo.objects.all()
    serializer_class = ManagerVideoSerializer


class PosteEmployeView(viewsets.ModelViewSet):
    queryset = PosteEmploye.objects.all()
    serializer_class = PosteEmployeSerializer


class EmployeView(viewsets.ModelViewSet):
    queryset = Employe.objects.all()
    serializer_class = EmployeSerializer


# Baniere du home et des autres pages + footer gallery #
class HeroHomeView(viewsets.ModelViewSet):
    queryset = HeroHome.objects.all()
    serializer_class = HeroHomeSerializer

class BanierePageView(viewsets.ModelViewSet):
    queryset = BanierePages.objects.all()
    serializer_class = BanierePagesSerializer

class FooterGalleryView(viewsets.ModelViewSet):
    queryset = FooterGallery.objects.all()
    serializer_class = FooterGallerySerializer
    
# Google maps + contact #

class ContactListCreate(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer