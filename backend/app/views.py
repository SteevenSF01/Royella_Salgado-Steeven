from django.shortcuts import render
from .models import ManagerVideo, Employe, PosteEmploye, HeroHome, BanierePages, FooterGallery, Contact, FAQ, Facilities
from .serializers import ManagerVideoSerializer, EmployeSerializer, PosteEmployeSerializer, HeroHomeSerializer, BanierePagesSerializer, ContactSerializer ,FooterGallerySerializer, FAQSerializer, FacilitiesSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets, generics
from rest_framework.decorators import action
from django.db.models import F


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

class ContactListCreate(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    
# FAQ #

class FAQView(viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    
# Facilities #

class FacilitiesView(viewsets.ModelViewSet):
    queryset = Facilities.objects.all().order_by('order')
    serializer_class = FacilitiesSerializer

    @action(detail=True, methods=['post'], url_path='change-order')
    def change_order(self, request, pk=None):
        facility = self.get_object()
        new_order = request.data.get('new_order')

        if new_order is None:
            return Response({'error': 'new_order not provided'}, status=status.HTTP_400_BAD_REQUEST)

        new_order = int(new_order)

        if facility.order == new_order:
            return Response({'status': 'success'}, status=status.HTTP_200_OK)

        try:
            if facility.order < new_order:
                Facilities.objects.filter(order__gt=facility.order, order__lte=new_order).update(order=F('order') - 1)
            else:
                Facilities.objects.filter(order__lt=facility.order, order__gte=new_order).update(order=F('order') + 1)

            facility.order = new_order
            facility.save()

            return Response({'status': 'success'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)