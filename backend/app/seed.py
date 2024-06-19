from app.models import *
from django.db import transaction
import random
from datetime import timedelta
from faker import Faker
from django.utils import timezone
from django.contrib.auth import get_user_model
from django_seeder import Seed
# from django_seed import Seed
from faker import Faker


def runPostes():
    seeder = Seed.seeder()
    postes = ['Manager', 'Assistant Manager', 'Director']

    for poste in postes:
        seeder.add_entity(PosteEmploye, 1, {
            'poste': poste,
        })

    pks = seeder.execute()
    print(pks)


def runEmployees():
    seeder = Seed.seeder()
    faker = Faker()
    postes = [1, 2, 3]
    emails_male = ['gmail.com', 'yahoo.com', 'hotmail.com']
    emails_female = ['outlook.com', 'icloud.com', 'aol.com']

    photos_male = ['images/employe/member-1.jpg',
                   'images/employe/member-3.jpg', 'images/employe/member-5.jpg']
    photos_female = ['images/employe/member-2.jpg',
                     'images/employe/member-4.jpg', 'images/employe/member-6.jpg']

    for i in range(3):
        prenom_male = faker.first_name_male()
        nom_male = faker.last_name()
        email_male = f'{prenom_male}.{nom_male}@{random.choice(emails_male)}'
        photo_male = photos_male[i]
        employee_male = {
            'nom': nom_male,
            'prenom': prenom_male,
            'email': email_male,
            'poste_id': random.choice(postes),
            'photo': photo_male
        }
        seeder.add_entity(Employe, 1, employee_male)

        prenom_female = faker.first_name_female()
        nom_female = faker.last_name()
        email_female = f'{prenom_female}.{
            nom_female}@{random.choice(emails_female)}'
        photo_female = photos_female[i]
        employee_female = {
            'nom': nom_female,
            'prenom': prenom_female,
            'email': email_female,
            'poste_id': random.choice(postes),
            'photo': photo_female
        }
        seeder.add_entity(Employe, 1, employee_female)

    pks = seeder.execute()
    print(pks)


def runManagerVideos():
    seeder = Seed.seeder()

    manager_video = {
        'url': "https://www.youtube.com/watch?v=ZuyJiNxzgIg",
        'nom_hotel': "LUXURY BEST HOTEL IN CITY CALIFORNIA, USA",
        'description': "Rapidiously myocardinate cross-platform intellectual capital after model. Appropriately create interactive infrastructures after main Holisticly facilitate stand-alone inframe",
        'quote': " Model. Appropriately create interactive infrastructures after main Holisticly facilitate stand-alone inframe of the world",
        'employe_id': 1
    }
    seeder.add_entity(ManagerVideo, 1, manager_video)
    pks = seeder.execute()
    print(pks)


def runHeroHome():
    seeder = Seed.seeder()

    hotels = [
        {
            "titre": "LUXURY HOTEL AND RESORT",
            "best": "THE BEST LUXURY HOTEL",
            "place": "IN CALIFORNIA",
            "photo": "images/hotels/hotelhome1.jpg",
            "etoiles": 1,
            "telephone": "+980 123 4567 890"
        },
        {
            "titre": "LUXURY HOTEL AND RESORT",
            "best": "THE BEST LUXURY HOTEL",
            "place": "IN KASHMIR",
            "photo": "images/hotels/hotelhome2.jpg",
            "etoiles": 2,
            "telephone": "+980 123 4567 890"
        },
        {
            "titre": "LUXURY HOTEL AND RESORT",
            "best": "THE BEST LUXURY HOTEL",
            "place": "IN COLOSSEUM",
            "photo": "images/hotels/hotelhome3.jpg",
            "etoiles": 3,
            "telephone": "+980 123 4567 890"
        },
        {
            "titre": "LUXURY HOTEL AND RESORT",
            "best": "THE BEST LUXURY HOTEL",
            "place": "IN SRILANKA",
            "photo": "images/hotels/hotelhome4.jpg",
            "etoiles": 4,
            "telephone": "+980 123 4567 890"
        },
    ]

    for hotel in hotels:
        seeder.add_entity(HeroHome, 1, hotel)
    pks = seeder.execute()
    print(pks)


def runBanierePages():
    seeder = Seed.seeder()
    seeder.add_entity(BanierePages, 1, {
        'image': 'images/hotels/banierePages.jpg'
    })
    pks = seeder.execute()
    print(pks)


def runFooterGallery():
    seeder = Seed.seeder()
    images = [
        'images/footer/footerG1.jpg',
        'images/footer/footerG2.jpg',
        'images/footer/footerG3.jpg',
        'images/footer/footerG4.jpg',
        'images/footer/footerG5.jpg',
        'images/footer/footerG6.jpg'
    ]
    for image in images:
        seeder.add_entity(FooterGallery, 1, {
            'image': image
        })
    pks = seeder.execute()
    print(pks)


def runContact():
    seeder = Seed.seeder()
    seeder.add_entity(Contact, 1, {
        'email': 'example@gmail.com',
        'numero': '980 123 4567 890',
        'address': 'New York, NY, USA',
        'latitude': 40.7128,
        'longitude': -74.0060,
        'text': 'Rapidiously myocardinate cross-platform intellectual capital after the model. Appropriately create interactive infrastructures after maintance Holisticly facilitate stand-alone'
    })
    pks = seeder.execute()
    print(pks)


def runFAQ():
    seeder = Seed.seeder()
    faqs = [
        {
            "question": "How to Booking a Room?",
            "reponse": "Credibly morph resource maximizing applications rather than fully test metrics via intermandated expertise. Globally administrate reliable platfor Globally brand seamless systems",
            "active": False,
        },

        {
            "question": "What kinds of Bedroom available?",
            "reponse": "Credibly morph resource maximizing applications rather than fully test metrics via intermandated expertise. Globally administrate reliable platfor Globally brand seamless systems",
            "active": False,
        },

        {
            "question": "Do you have any Discount Current Month?",
            "reponse": "Credibly morph resource maximizing applications rather than fully test metrics via intermandated expertise. Globally administrate reliable platfor Globally brand seamless systems",
            "active": False,
        },

        {
            "question": "Have you available money back Gaurentee?",
            "reponse": "Credibly morph resource maximizing applications rather than fully test metrics via intermandated expertise. Globally administrate reliable platfor Globally brand seamless systems",
            "active": False,
        },

        {
            "question": "Do you have any Discount Current Month?",
            "reponse": "Credibly morph resource maximizing applications rather than fully test metrics via intermandated expertise. Globally administrate reliable platfor Globally brand seamless systems",
            "active": False,
        },

        {
            "question": "How to Booking a Room?",
            "reponse": "Credibly morph resource maximizing applications rather than fully test metrics via intermandated expertise. Globally administrate reliable platfor Globally brand seamless systems",
            "active": False,
        },

        {
            "question": "What kinds of Bedroom available?",
            "reponse": "Credibly morph resource maximizing applications rather than fully test metrics via intermandated expertise. Globally administrate reliable platfor Globally brand seamless systems",
            "active": False,
        },

        {
            "question": "Have you available money back Gaurentee?",
            "reponse": "Credibly morph resource maximizing applications rather than fully test metrics via intermandated expertise. Globally administrate reliable platfor Globally brand seamless systems",
            "active": False,
        }
    ]
    for faq in faqs:
        seeder.add_entity(FAQ, 1, faq)
    pks = seeder.execute()
    print(pks)


def runFacilities():
    seeder = Seed.seeder()
    facilities = [
        {
            "nom": "Fitness",
            "sous_titre": "Gym Training Grounds",
            "description": "Rapidiously myocardinate cross-platform intellectual capital after model. Appropriately create interactive infrastructures after are Holisticly facilitate stand-alone",
            "photo": "images/facilities/fitness.jpg",
            "order": 1
        },
        {
            "nom": "Fitness",
            "sous_titre": "Indoor Swiming Pool",
            "description": "Rapidiously myocardinate cross-platform intellectual capital after model. Appropriately create interactive infrastructures after are Holisticly facilitate stand-alone",
            "photo": "images/facilities/pool.jpg",
            "order": 2
        },
        {
            "nom": "Foods",
            "sous_titre": "The Restaurant Center",
            "description": "Rapidiously myocardinate cross-platform intellectual capital after model. Appropriately create interactive infrastructures after are Holisticly facilitate stand-alone",
            "photo": "images/facilities/restaurant.jpg",
            "order": 3
        },
        {
            "nom": "Cinema",
            "sous_titre": "The Cinema Center",
            "description": "Rapidiously myocardinate cross-platform intellectual capital after model. Appropriately create interactive infrastructures after are Holisticly facilitate stand-alone",
            "photo": "images/facilities/cinema.jpg",
            "order": 4
        }
    ]
    for facility in facilities:
        seeder.add_entity(Facilities, 1, facility)
    pks = seeder.execute()
    print(pks)


def runFacilitiesRoom():
    seeder = Seed.seeder()
    facilities_rooms = [
        {
            "nom": "Room Services",
            "logo": "images/facilitiesRoom/room-service-logo.svg",
            "image": "images/facilitiesRoom/roomService.jpg",
        },
        {
            "nom": "Wi-Fi Internet",
            "logo": "images/facilitiesRoom/wifi-logo.svg",
            "image": "images/facilitiesRoom/wifi.jpg",
        },
        {
            "nom": "Smart Key",
            "logo": "images/facilitiesRoom/key-card-logo.svg",
            "image": "images/facilitiesRoom/smartKey.jpg",
        },
        {
            "nom": "Breakfast",
            "logo": "images/facilitiesRoom/breakfast-logo.svg",
            "image": "images/facilitiesRoom/breakfast.jpg",
        },
        {
            "nom": "Swimming Pool",
            "logo": "images/facilitiesRoom/pool-logo.svg",
            "image": "images/facilitiesRoom/pool.jpg",
        },
        {
            "nom": "Fitness Center",
            "logo": "images/facilitiesRoom/fitness-logo.svg",
            "image": "images/facilitiesRoom/fitness.jpg",
        },
    ]
    for facilities_room in facilities_rooms:
        seeder.add_entity(FacilitiesRoom, 1, facilities_room)
    pks = seeder.execute()
    print(pks)


def runRooms():
    fake = Faker()

    with transaction.atomic():
        for _ in range(25):
            room_types = ['Deluxe', 'Double Suite', 'Junior Suite', 'Family Suite', 'Beautiful Family']
            room_type = random.choice(room_types)

            nom_lit_options = ['Queen', 'King', 'Double', 'Twin']
            nom_lit = random.choice(nom_lit_options)

            description = fake.paragraph()

            etoiles = random.uniform(4, 5)

            lit = random.randint(1, 2)

            prix = random.randint(400, 600)
            # timedelta sert à mettre une date de fin grace à ce qu'on definit entre parenthèses, en additionnant la date de début
            date_in = fake.date_this_year()
            date_out = date_in + timedelta(days=random.randint(1, 10))

            superficie = random.randint(1000, 1600)

            amenities = random.sample(range(1, 7), random.randint(5, 6))

            prom_start = fake.date_this_year()
            prom_end = prom_start + timedelta(days=random.randint(1, 30))

            room_data = {
                "nom": f"{room_type} Room",
                "description": description,
                "photo": f"images/rooms/room-{_}.jpg",
                "etoiles": etoiles,
                "lit": lit,
                "nom_lit": nom_lit,
                "prix": prix,
                "adultes": 0,
                "enfants": 0,
                "max_adultes": 2,
                "max_enfants": 2,
                "date_in": date_in,
                "date_out": date_out,
                "superficie": superficie,
                "prom_start": prom_start,
                "prom_end": prom_end
            }
            room = Rooms.objects.create(**room_data)
            """ 
            " ** " permet de passer en paramètre tant la propriété comme sa valeur
            exemple
            données = {
                "nom": "Juan",
                "age": 30,
                "ville": "Madrid"
            }  
            au lieu d'écrire 
            saluer(nom="Juan", age=30, ville="Madrid")
            on peut écrire
            saluer(**données)
            """

            if room:
                for amenity_id in amenities:
                    try:
                        amenity = FacilitiesRoom.objects.get(pk=amenity_id)
                        room.amenities.add(amenity)
                    except FacilitiesRoom.DoesNotExist:
                        print(f"Amenity with id {amenity_id} does not exist.")

        print("Rooms created successfully.")


def runRoomService():
    seeder = Seed.seeder()
    services = [
        {
            "nom": "Basic Comfort Package",
            "prix": 15,
            "image": "images/rooms/roomService.jpg",
            "desc1": "Bed and floor cleaning",
            "desc2": "Daily towel replacement",
            "desc3": "Complimentary breakfast",
            "desc4": "24/7 room service",
        },
        {
            "nom": "Deluxe Comfort Package",
            "prix": 20,
            "image": "images/rooms/roomService.jpg",
            "desc1":  "Full room cleaning",
            "desc2": "Daily towel replacement",
            "desc3": "Evening turndown service",
            "desc4": "Mini bar restock",
        },
        {
            "nom": "Premium Comfort Package",
            "prix": 18,
            "image": "images/rooms/roomService.jpg",
            "desc1":  "Partial room cleaning",
            "desc2":  "Towel replacement every other day",
            "desc3":  "Complimentary snack basket",
            "desc4":  "Daily room check",
        }
    ]

    for service in services:
        seeder.add_entity(RoomService, 1, service)
    pks = seeder.execute()
    print(pks)


def runTags():
    seeder = Seed.seeder()
    tags = [
        {
            "nom":"Luxury Hotel"
        },
        {
            "nom":"Health Club"
        },
        {
            "nom":"SPA Center"
        },        
        {
            "nom":"Luxury Restaurant"
        },
        {
            "nom":"Fitness Center"
        },
        {
            "nom":"Boutique Hotel"
        },
        {
            "nom":"Hotel Amenities"
        },
        {
            "nom":"Hotel Services"
        },
        {
            "nom":"Room Service"
        }
    ]
    for tag in tags:
        seeder.add_entity(Tags, 1, tag)
    pks = seeder.execute()
    print(pks)


def runCategories():
    seeder = Seed.seeder()
    categories = [
        {
            "nom":"Luxury Hotels"
        },
        {
            "nom":"Health Club"
        },
        {
            "nom":"SPA Center"
        },
        {
            "nom": "Restaurant"
        },
        {
            "nom": "Industrial"
        },
        {
            "nom": "Uncategories"
        },

    ]
    for category in categories:
        seeder.add_entity(Categories, 1, category)
    pks = seeder.execute()
    print(pks)
    
    
# def run_blogs_seeder():
#     seeder = Seed.seeder()
#     seeder.add_entity(Blog, 10, {
#         'titre': lambda x: seeder.faker.sentence(),
#         'contenue': lambda x: seeder.faker.text(),
#         'auteur': lambda x: random.choice(CustomUser.objects.all()),
#         'categorie': lambda x: random.choice(Categories.objects.all()),
#         'status': lambda x: random.choice(['draft', 'pending', 'approved', 'rejected']),
#     })
#     pks = seeder.execute()
#     print("Blogs seeded: ", pks)

#     for blog in Blog.objects.all():
#         blog.tags.set(random.sample(list(Tags.objects.all()), k=random.randint(1, 3)))
#         blog.save()

# def run_comments_seeder():
#     seeder = Seed.seeder()
#     seeder.add_entity(Comment, 20, {
#         'blog': lambda x: random.choice(Blog.objects.all()),
#         'auteur': lambda x: random.choice(CustomUser.objects.all()),
#         'contenue': lambda x: seeder.faker.text(),
#     })
#     pks = seeder.execute()
#     print("Comments seeded: ", pks)

# def run_blog_descriptions_seeder():
#     seeder = Seed.seeder()
#     seeder.add_entity(BlogDescription, 10, {
#         'blog': lambda x: random.choice(Blog.objects.all()),
#         'titre': lambda x: seeder.faker.sentence(),
#         'contenue': lambda x: seeder.faker.text(),
#     })
#     pks = seeder.execute()
#     print("Blog Descriptions seeded: ", pks)
    
# def run_all_blogs():
#     run_blogs_seeder()
#     run_comments_seeder()
#     run_blog_descriptions_seeder()


User = get_user_model()
seeder = Seed.seeder()
fake = Faker()

def run_blogs_seeder():
    categories = list(Categories.objects.all())
    tags = list(Tags.objects.all())
    users = list(CustomUser.objects.all())

    if not categories or not tags or not users:
        print("Asegúrate de tener categorías, tags y usuarios en la base de datos antes de ejecutar el seeder.")
        return

    seeder.add_entity(Blog, 10, {
        'titre': lambda x: seeder.faker.sentence(),
        'contenue': lambda x: seeder.faker.text(),
        'auteur': lambda x: random.choice(users),
        'categorie': lambda x: random.choice(categories),
        'status': lambda x: random.choice(['draft', 'pending', 'approved', 'rejected']),
        'created_at': lambda x: timezone.now(),
        'updated_at': lambda x: timezone.now(),
        'posted_on': lambda x: timezone.now(),
    })
    pks = seeder.execute()
    print("Blogs seeded: ", pks)

    for blog in Blog.objects.all():
        for tag_id in random.sample([tag.pk for tag in tags], k=random.randint(1, 3)):
            try:
                tag = Tags.objects.get(pk=tag_id)
                blog.tags.add(tag)
            except Tags.DoesNotExist:
                print(f"Tag with id {tag_id} does not exist.")
        blog.save()

def run_comments_seeder():
    blogs = list(Blog.objects.all())
    users = list(CustomUser.objects.all())

    if not blogs or not users:
        print("Asegúrate de tener blogs y usuarios en la base de datos antes de ejecutar el seeder.")
        return

    seeder.add_entity(Comment, 20, {
        'blog': lambda x: random.choice(blogs),
        'auteur': lambda x: random.choice(users),
        'contenue': lambda x: seeder.faker.text(),
        'created_at': lambda x: timezone.now(),
    })
    pks = seeder.execute()
    print("Comments seeded: ", pks)

def run_blog_descriptions_seeder():
    blogs = list(Blog.objects.all())

    if not blogs:
        print("Asegúrate de tener blogs en la base de datos antes de ejecutar el seeder.")
        return

    seeder.add_entity(BlogDescription, 10, {
        'blog': lambda x: random.choice(blogs),
        'titre': lambda x: seeder.faker.sentence(),
        'contenue': lambda x: seeder.faker.text(),
        'image': lambda x: 'images/rooms/room/2.jpg',  
    })
    pks = seeder.execute()
    print("Blog Descriptions seeded: ", pks)

def run_all_blogs():
    run_blogs_seeder()
    run_comments_seeder()
    run_blog_descriptions_seeder()

