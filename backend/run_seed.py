import django
django.setup()
from app import seed

if __name__ == '__main__':
    # seed.runPostes()
    # seed.runEmployees()
    # seed.runManagerVideos()
    # seed.runHeroHome()
    seed.runBanierePages()