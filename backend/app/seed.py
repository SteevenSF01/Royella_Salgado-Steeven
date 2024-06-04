from app.models import *
import random
from django_seeder import Seed
from faker import Faker


def runPostes():
    seeder = Seed.seeder()
    postes = ['Manager', 'Assistant Manager', 'Director']
    
    for poste in postes:
        seeder.add_entity(PosteEmploye,1,{
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

    photos_male = ['images/employe/member-1.jpg', 'images/employe/member-3.jpg', 'images/employe/member-5.jpg']
    photos_female = ['images/employe/member-2.jpg', 'images/employe/member-4.jpg', 'images/employe/member-6.jpg']

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
        email_female = f'{prenom_female}.{nom_female}@{random.choice(emails_female)}'
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
    