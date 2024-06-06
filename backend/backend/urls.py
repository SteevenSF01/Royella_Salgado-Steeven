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

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/backoffice/banierePages/<int:id>', BanierePageView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
