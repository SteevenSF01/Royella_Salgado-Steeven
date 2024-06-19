from django.contrib import admin
from django.urls import path
from django.urls import include
from rest_framework import routers
from app.views import *
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register('backoffice/managerVideo', ManagerView)
router.register('backoffice/employe', EmployeView)
router.register('backoffice/posteEmploye', PosteEmployeView)
router.register('backoffice/heroHome', HeroHomeView)
router.register('backoffice/banierePages', BanierePageView)
router.register('backoffice/footerGallery', FooterGalleryView)
router.register('backoffice/contact', ContactListCreate)
router.register('backoffice/faq', FAQView)
router.register('backoffice/facilities', FacilitiesViewSet)
router.register('backoffice/facilitiesRoom', FacilitiesRoomViewSet)
router.register('backoffice/rooms', RoomsViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/backoffice/roomService/', RoomServiceViewSet.as_view()),
    path('api/register/', UserRegistrationView.as_view(), name='register'),
    path('api/template', template),
    path('api/login/', connexion),
    path('api/logout/', deconnexion),
    path('api/get_user/', get_user),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
