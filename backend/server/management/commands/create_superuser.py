from django.core.management.base import BaseCommand
from server.models import User

class Command(BaseCommand):
    help = 'Create a superuser if not exists'

    def handle(self, *args, **options):
        username = 'admin'
        password = 'admin'
        email = 'admin@berson969.com'

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f'Superuser "{username}" created.'))
        else:
            self.stdout.write(self.style.WARNING(f'Superuser "{username}" already exists.'))
