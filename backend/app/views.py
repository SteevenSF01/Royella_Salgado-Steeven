from django.shortcuts import render
from .models import ManagerVideo, Employe, PosteEmploye, HeroHome, BanierePages, FooterGallery, Contact, FAQ, Facilities, FacilitiesRoom, Rooms, RoomService
from .serializers import ManagerVideoSerializer, EmployeSerializer, PosteEmployeSerializer, HeroHomeSerializer, BanierePagesSerializer, ContactSerializer ,FooterGallerySerializer, FAQSerializer, FacilitiesSerializer, FacilitiesRoomSerializer, RoomsSerializer, RoomServiceSerializer
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
class FacilitiesViewSet(viewsets.ModelViewSet):
    queryset = Facilities.objects.all()
    serializer_class = FacilitiesSerializer

    def reorder_facilities(self, request):
        facility_id = request.data.get('facility_id')
        new_order = request.data.get('new_order')

        try:
            # On récupére 2 id pour faire un interchangement
            facility_to_move = Facilities.objects.get(id=facility_id)
            facility_to_swap = Facilities.objects.get(order=new_order)

            # On changer 'Order' avec celui qui prends sa place
            # temp_order = facility_to_move.order
            facility_to_move.order = facility_to_swap.order
            facility_to_swap.order = facility_to_move.order

            facility_to_move.save()
            facility_to_swap.save()

            return Response({"message": "Les facilities on bien été reordonnées"}, status=status.HTTP_200_OK)
        except Facilities.DoesNotExist:
            return Response({"message": "Cette facilitie n'existe pas"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": "Une erreur est survenue"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FacilitiesRoomViewSet(viewsets.ModelViewSet):
    queryset = FacilitiesRoom.objects.all()
    serializer_class = FacilitiesRoomSerializer
    
# Rooms #

class RoomsViewSet(viewsets.ModelViewSet):
    queryset = Rooms.objects.all()
    serializer_class = RoomsSerializer

class RoomServiceViewSet(generics.ListAPIView):
    queryset = RoomService.objects.all()
    serializer_class = RoomServiceSerializer