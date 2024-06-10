from app.models import *
import random
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
    
    