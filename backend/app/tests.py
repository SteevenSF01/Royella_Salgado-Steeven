from django.test import TestCase
from app.models import FacilitiesRoom

class FacilitiesRoomTest(TestCase):
    def setUp(self):
        FacilitiesRoom.objects.create(nom="Room Services", logo="images/facilitiesRoom/room-service-logo.svg", image="images/facilitiesRoom/roomService.jpg")
        FacilitiesRoom.objects.create(nom="Wi-Fi Internet", logo="images/facilitiesRoom/wifi-logo.svg", image="images/facilitiesRoom/wifi.jpg")
        FacilitiesRoom.objects.create(nom="Smart Key", logo="images/facilitiesRoom/key-card-logo.svg", image="images/facilitiesRoom/smartKey.jpg")
        FacilitiesRoom.objects.create(nom="Breakfast", logo="images/facilitiesRoom/breakfast-logo.svg", image="images/facilitiesRoom/breakfast.jpg")
        FacilitiesRoom.objects.create(nom="Swimming Pool", logo="images/facilitiesRoom/pool-logo.svg", image="images/facilitiesRoom/pool.jpg")
        FacilitiesRoom.objects.create(nom="Fitness Center", logo="images/facilitiesRoom/fitness-logo.svg", image="images/facilitiesRoom/fitness.jpg")

    def test_serialize_all_amenities(self):
        facilities_room = FacilitiesRoom.objects.all()
        self.assertEqual(facilities_room.count(), 6) 

        amenities_data = [
            {"nom": "Room Services", "logo": "images/facilitiesRoom/room-service-logo.svg", "image": "images/facilitiesRoom/roomService.jpg"},
            {"nom": "Wi-Fi Internet", "logo": "images/facilitiesRoom/wifi-logo.svg", "image": "images/facilitiesRoom/wifi.jpg"},
            {"nom": "Smart Key", "logo": "images/facilitiesRoom/key-card-logo.svg", "image": "images/facilitiesRoom/smartKey.jpg"},
            {"nom": "Breakfast", "logo": "images/facilitiesRoom/breakfast-logo.svg", "image": "images/facilitiesRoom/breakfast.jpg"},
            {"nom": "Swimming Pool", "logo": "images/facilitiesRoom/pool-logo.svg", "image": "images/facilitiesRoom/pool.jpg"},
            {"nom": "Fitness Center", "logo": "images/facilitiesRoom/fitness-logo.svg", "image": "images/facilitiesRoom/fitness.jpg"},
        ]

        for amenity_data in amenities_data:
            amenity = FacilitiesRoom.objects.get(nom=amenity_data["nom"])
            self.assertEqual(amenity.logo, amenity_data["logo"])
            self.assertEqual(amenity.image, amenity_data["image"])
