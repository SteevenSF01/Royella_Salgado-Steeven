from django.shortcuts import render
from .models import ManagerVideo, Employe, PosteEmploye, HeroHome, BanierePages, FooterGallery, Contact, FAQ, Facilities, FacilitiesRoom, Rooms, RoomService
from .serializers import ManagerVideoSerializer, EmployeSerializer, PosteEmployeSerializer, HeroHomeSerializer, BanierePagesSerializer, ContactSerializer ,FooterGallerySerializer, FAQSerializer, FacilitiesSerializer, FacilitiesRoomSerializer, RoomsSerializer, RoomServiceSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets, generics, pagination
from rest_framework.decorators import action
from django.db.models import F
import random
from django.utils import timezone


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

class RoomsPagination(pagination.PageNumberPagination):
    # le nombre d'item a afficher par page
    page_size = 6
    # le nom de la variable de page
    page_size_query_param = 'page_size'
    # le nombre de page à afficher
    max_page_size = 100

class RoomsViewSet(viewsets.ModelViewSet):  
    queryset = Rooms.objects.all()  
    serializer_class = RoomsSerializer
    pagination_class = RoomsPagination

# Définir une action supplémentaire pour la vue
    @action(detail=False, methods=['get'], url_path='random') 
    # la methode pour l'action
    def random_rooms(self, request):  
        # Pour obtenir le nombre total d'objet 'room'
        count = self.queryset.count()  
        if count == 0: 
            return Response({"detail": "No rooms available"}, status=404)
        # Ensemble est limitée à un maximum de 3 ou au nombre total de chambres disponibles, selon le plus petit des deux.
        random_indices = random.sample(range(count), min(3, count))  
        # Sélectionner les objets Rooms correspondant aux indices aléatoires générés
        random_rooms = [self.queryset.all()[i] for i in random_indices] 
        # Convertir les objets Rooms sélectionnés en JSON à l'aide du sérialiseur
        serializer = self.get_serializer(random_rooms, many=True)  
        return Response(serializer.data) 
    

    @action(detail=False, methods=['get'], url_path='promotions') 
    def get_promotional_rooms(self, request):
        # Pour la date actuelle
        current_date = timezone.now().date()
        
        # Filtrer  les chambres de promo qui sont en cours
        promotional_rooms = self.queryset.filter(prom_start__lte=current_date, prom_end__gte=current_date)
        
        # Obtient une liste de toutes les chambres de promo disponibles
        all_promotional_rooms = list(promotional_rooms)
        
        # Obtient 4 chambres de manière aléatoire
        random_promotional_rooms = random.sample(all_promotional_rooms, min(4, len(all_promotional_rooms)))
        
        serializer = self.get_serializer(random_promotional_rooms, many=True)  
        return Response(serializer.data)  
    
class RoomServiceViewSet(generics.ListAPIView):
    queryset = RoomService.objects.all()
    serializer_class = RoomServiceSerializer