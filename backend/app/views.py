from django.shortcuts import render
from .models import ManagerVideo, Employe, PosteEmploye
from .serializers import ManagerVideoSerializer, EmployeSerializer, PosteEmployeSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets


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
    
    