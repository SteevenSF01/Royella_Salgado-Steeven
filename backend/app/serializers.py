from .models import ManagerVideo
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class ManagerVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManagerVideo
        fields = ['id', 'url']