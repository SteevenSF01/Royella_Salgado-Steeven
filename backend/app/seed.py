from app.models import *
import random
from django_seeder import Seed


def runPostes():
    seeder = Seed.seeder()
    postes = ['Manager', 'Assistant Manager', 'Director']
    
    for poste in postes:
        seeder.add_entity(PosteEmploye,1,{
            'poste': poste,
        })
    
    pks = seeder.execute()
    print(pks)

# def runEmployees():
#     seeder = Seed.seeder()
    
    