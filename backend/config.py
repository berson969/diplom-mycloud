import os
from dotenv import load_dotenv


class Config:
    def __init__(self):
        load_dotenv()

    @property
        def db_host(self):
            return os.getenv('DB_HOST', 'localhost')

    @property
    def db_base(self):
        return os.getenv('DB_NAME', 'mycloud-database')

    @property
    def db_pass(self):
        return os.getenv('DB_PASSWORD', 'my_secret_password')

    @property
    def db_port(self):
        return os.getenv('DB_PORT', 5432)

    @property
    def db_user(self):
        return os.getenv('DB_USER', 'some_user')

    @property
    def django_settings_module(self):
        return os.getenv('DJANGO_SETTINGS_MODULE', 'mycloud.settings')

    @property
    def secret_key(self):
        return os.getenv('SECRET_KEY', 'django-insecure-z6$$*7$9*r_d%xgek=y=u3f80@fj1mbq=y3*mj6k-ik_0#*v!w')

    @property
    def app_debug(self):
        return os.getenv('APP_DEBUG', 'False') == 'True'

    @property
    def allowed_hosts(self):
        ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,185.10.45.10')
        return ALLOWED_HOSTS.split(',')

    @property
    def frontend_url(self):
        return os.getenv('FRONTEND_URL', 'https://localhost:5173')

    @property
    def server_name(self):
        return os.getenv('SERVER_IP', '185.10.45.10')

    @property
    def admin_password(self):
        return os.getenv('ADMIN_PASSWORD', 'adminNEWadmin')

    @property
    def domain(self):
        domain = os.getenv('SERVER_IP', 'localhost')
        return f".{domain}"


# Instantiate the config
config = Config()
