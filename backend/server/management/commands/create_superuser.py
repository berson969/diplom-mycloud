import os

from django.core.management.base import BaseCommand

from server.models import User

admin_password = os.environ.get('ADMIN_PASSWORD', '')
if not admin_password:
    raise ValueError("ADMIN_PASSWORD environment variable not set")


class Command(BaseCommand):
    help = 'Create a superuser if not exists'

    def handle(self, *args, **options):
        username = 'admin'
        password = admin_password
        email = 'admin@berson969.com'

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(f'Superuser "{username}" already exists.'))
        else:
            User.objects.create_superuser(username=username, email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f'Superuser "{username}" created.'))



