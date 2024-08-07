from django.shortcuts import render
from .models import *
from django_filters import rest_framework as filters
from .serializers import *
from rest_framework.response import Response
from rest_framework import status, viewsets, generics, pagination, permissions
from rest_framework.decorators import action
# Utiliser F pour comparer des valeurs entre différents champs du même model ou pour mettre à jour un champ en fonction de la valeur d'un autre champ, sans avoir à charger les données dans l'application
from django.db.models import F, Count,Q
import random
from django.utils import timezone
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response as JsonResponse
from rest_framework.decorators import api_view
from .models import CustomUser
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.exceptions import ObjectDoesNotExist
import json
import datetime



def template(request):
    return render(request, 'modelMail.html')


#region CustomUser #

class CustomUserView(viewsets.ModelViewSet):    
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


#region UserRegistration #
class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#region UserLogin #

@api_view(['POST'])
def connexion(request):
    data =json.loads(request.body)
    username = data.get('email')
    password = data.get('password')
    user = authenticate(request, username=username, password= password)
    if user is not None:
        login(request, user)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return JsonResponse({'status': 'success', 'message': 'Connexion réussie', 'access_token': access_token, 'refresh_token': str(refresh)})
    else:
        return JsonResponse({'status': 'error', 'message': 'Échec de la connexion'})

#     data = request.data
#     email = data.get('email')
#     password = data.get('password')

#     try:
#         user = CustomUser.objects.get(email=email)
#     except CustomUser.DoesNotExist:
#         return Response({'status': 'error', 'message': 'Utilisateur non trouvé'}, status=400)

#     if user.check_password(password):
#         login(request, user)
#         refresh = RefreshToken.for_user(user)
#         return Response({
#             'status': 'success',
#             'message': 'Connexion réussie',
#             'access_token': str(refresh.access_token),
#             'refresh_token': str(refresh),
#             'user': {
#                     'id': user.id,
#                     'first_name': user.first_name,
#                     'last_name': user.last_name,
#                     'email': user.email,
#                     'role': user.role,
#                     "image": user.photo
#             }
#         })
#     else:
#         return Response({'status': 'error', 'message': 'Mot de passe incorrect'}, status=400)       
        

#region Logout #

@api_view(['POST'])
def deconnexion(request):
    logout(request)
    return JsonResponse({'status': 'success', 'message': 'Utilisateur déconnecté'})

#region Get User #

@api_view(['GET'])
def get_user(request):
    try:
        auth = JWTAuthentication()
        user, _ = auth.authenticate(request)
        if not user:
            raise AuthenticationFailed()
    except AuthenticationFailed:
        return JsonResponse({'error': 'Authentification invalide'}, status=401)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Utilisateur non trouvé'}, status=404)
    mon_user = {
        'email': user.email,
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'role': user.role,
        'photo': user.photo.url,
    }
    return JsonResponse({'user': mon_user})


#region Manager #

class ManagerView(viewsets.ModelViewSet):
    queryset = ManagerVideo.objects.all()
    serializer_class = ManagerVideoSerializer

#region PosteEmploye #

class PosteEmployeView(viewsets.ModelViewSet):
    queryset = PosteEmploye.objects.all()
    serializer_class = PosteEmployeSerializer


class EmployeView(viewsets.ModelViewSet):
    queryset = Employe.objects.all()
    serializer_class = EmployeSerializer


#region Baniere du home et des autres pages + footer gallery #
class HeroHomeView(viewsets.ModelViewSet):
    queryset = HeroHome.objects.all()
    serializer_class = HeroHomeSerializer

class BanierePageView(viewsets.ModelViewSet):
    queryset = BanierePages.objects.all()
    serializer_class = BanierePagesSerializer

class FooterGalleryView(viewsets.ModelViewSet):
    queryset = FooterGallery.objects.all()
    serializer_class = FooterGallerySerializer
    
        # Définir une action supplémentaire pour la vue
    @action(detail=False, methods=['get'], url_path='random') 
    # la methode pour l'action
    def random_rooms(self, request):  
        # Pour obtenir le nombre total d'objet 'room'
        count = self.queryset.count()  
        if count == 0: 
            return Response({"detail": "No blogs available"}, status=404)
        # Sample prends 2 arguments, l'itérateur et le nombre d'éléments à prendre
        # range crée un itérateur qui va de 0 à count-1 et choisit aléatoirement les indices qui est dans min (6, count) en prenant le plus petit des deux, soite count ou 6
        random_indices = random.sample(range(count), min(6, count))  
        # Sélectionner les objets Rooms correspondant aux indices aléatoires générés
        random_blogs = [self.queryset.all()[i] for i in random_indices] 
        # Convertir les objets Rooms sélectionnés en JSON à l'aide du sérialiseur
        serializer = self.get_serializer(random_blogs, many=True)  
        return Response(serializer.data) 

    
#region Google maps + contact #

class ContactListCreate(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    
#region FAQ #

class FAQView(viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    
#region Facilities #
class FacilitiesViewSet(viewsets.ModelViewSet):
    queryset = Facilities.objects.all()
    serializer_class = FacilitiesSerializer

class FacilitiesRoomViewSet(viewsets.ModelViewSet):
    queryset = FacilitiesRoom.objects.all()
    serializer_class = FacilitiesRoomSerializer
    
#region Rooms #

class RoomsPagination(pagination.PageNumberPagination):
    # le nombre d'item a afficher par page
    page_size = 6
    # le nom de la variable de page
    page_size_query_param = 'page_size'
    # le nombre de page à afficher
    max_page_size = 100

class RoomsViewSet(viewsets.ModelViewSet):  
    queryset = Rooms.objects.all().order_by('-etoiles')
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
        # Pour la date actuelle sans l'heure avec date()
        current_date = timezone.now().date()
        
        # Filtrer  les chambres de promo qui sont en cours
        promotional_rooms = self.queryset.filter(prom_start__lte=current_date, prom_end__gte=current_date)
        
        # Obtient une liste de toutes les chambres de promo disponibles pour pouvoir iterer sur elles
        all_promotional_rooms = list(promotional_rooms)
        
        # Obtient 4 chambres de manière aléatoire, min 4 ou len s'il est plus petit
        random_promotional_rooms = random.sample(all_promotional_rooms, min(4, len(all_promotional_rooms)))
        
        serializer = self.get_serializer(random_promotional_rooms, many=True)  
        return Response(serializer.data)  
    
    @action(detail=False, methods=['get'], url_path='available')
    def get_available_rooms(self, request):
        date_in = request.query_params.get('date_in')
        date_out = request.query_params.get('date_out')

        if not all([date_in, date_out]):
            return Response({"detail": "Parametres manquants"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            check_in_date = datetime.datetime.strptime(date_in, '%Y-%m-%d').date()
            check_out_date = datetime.datetime.strptime(date_out, '%Y-%m-%d').date()
        except ValueError:
            return Response({"detail": "Format de date invalide"}, status=status.HTTP_400_BAD_REQUEST)

        if check_in_date >= check_out_date:
            return Response({"detail": "Check-out doit etre apres le check-in"}, status=status.HTTP_400_BAD_REQUEST)

        reserved_rooms = self.queryset.filter(
            date_in__lte=check_out_date,
            date_out__gte=check_in_date,
        )

        if not reserved_rooms.exists():
            available_rooms = self.queryset.all()
            # Q sert à faire des requêtes complexes, avec plusieurs conditions logiques
        else:
            available_rooms = self.queryset.filter(
                Q(date_in__gt=check_out_date) | Q(date_out__lt=check_in_date)
            )

        serializer = self.get_serializer(available_rooms, many=True)
        return Response(serializer.data)
    
class RoomServiceViewSet(generics.ListAPIView):
    queryset = RoomService.objects.all()
    serializer_class = RoomServiceSerializer
    
#region Reservation #

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user.id
        return Reservation.objects.filter(client=user)
    

#region tags #
class TagsViewSet(viewsets.ModelViewSet):
    queryset = Tags.objects.all()
    serializer_class = TagSerializer

#region Categories #
class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer
    

#region Blogs #


class BlogFilter(filters.FilterSet):
    title = filters.CharFilter(field_name="titre", lookup_expr='icontains')
    categorie = filters.NumberFilter(field_name="categorie__id")
    class Meta:
        model = Blog
        fields = ['title', 'categorie']
        
class BlogPagination(pagination.PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 100

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-posted_on')
    serializer_class = BlogSerializer
    pagination_class = BlogPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BlogFilter
    
    # Définir une action supplémentaire pour la vue
    @action(detail=False, methods=['get'], url_path='random') 
    # la methode pour l'action
    def random_rooms(self, request):  
        # Pour obtenir le nombre total d'objet 'room'
        count = self.queryset.count()  
        if count == 0: 
            return Response({"detail": "No blogs available"}, status=404)
        # Ensemble est limitée à un maximum de 2 ou au nombre total de chambres disponibles, selon le plus petit des deux.
        random_indices = random.sample(range(count), min(2, count))  
        # Sélectionner les objets Rooms correspondant aux indices aléatoires générés
        random_blogs = [self.queryset.all()[i] for i in random_indices] 
        # Convertir les objets Rooms sélectionnés en JSON à l'aide du sérialiseur
        serializer = self.get_serializer(random_blogs, many=True)  
        return Response(serializer.data) 
        

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    @action(detail=False, methods=['post'], url_path='add')
    def add_comment(self, request):
        blog_id = request.data.get('blog_id')
        contenue = request.data.get('contenue')
        auteur_id = request.data.get('auteur_id')

        if not blog_id or not contenue or not auteur_id:
            return Response({"detail": "Missing data"}, status=400)

        try:
            blog = Blog.objects.get(id=blog_id)
        except Blog.DoesNotExist:
            return Response({"detail": "Blog not found"}, status=404)

        comment = Comment.objects.create(blog=blog, contenue=contenue, auteur_id=auteur_id)
        serializer = self.get_serializer(comment)
        return Response(serializer.data, status=201)


class BlogDescriptionViewSet(viewsets.ModelViewSet):
    queryset = BlogDescription.objects.all()
    serializer_class = BlogDescriptionSerializer
    
#region Get in touch #

class GetInTouchView(generics.ListCreateAPIView):
    queryset = GetInTouch.objects.all()
    serializer_class = GetInTouchSerializer
    
#region Testimonials #

class TestimonialsViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer