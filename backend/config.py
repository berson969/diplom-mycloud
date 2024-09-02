import os
from dotenv import load_dotenv


class Config:
    def __init__(self):
        if not os.getenv('GITHUB_ACTIONS'):
            load_dotenv()

    @property
    def db_base(self):
        return os.getenv('DB_BASE', 'mycloud-database')

    @property
    def db_host(self):
        return os.getenv('DB_HOST', 'localhost')

    @property
    def db_port(self):
        return os.getenv('DB_PORT', 5432)

    @property
    def db_user(self):
        return os.getenv('DB_USER', 'some_user')

    @property
    def db_pass(self):
        return os.getenv('DB_PASS', 'my_secret_password')

    @property
    def django_settings_module(self):
        return os.getenv('DJANGO_SETTINGS_MODULE', 'mycloud.settings')

    @property
    def secret_key(self):
        return os.getenv('SECRET_KEY', 'django-insecure-z6$$*7$9*r_d%xgek=y=u3f80@fj1mbq=y3*mj6k-ik_0#*v!w')

    @property
    def app_debug(self):
        return os.getenv('APP_DEBUG', 'True') == 'True'

    @property
    def allowed_hosts(self):
        ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,0.0.0.0,[::1]')
        return ALLOWED_HOSTS.split(',')

    @property
    def frontend_url(self):
        return os.getenv('FRONTEND_URL', 'https://localhost:5173')

    @property
    def server_name(self):
        return os.getenv('SERVER_NAME', 'localhost')

    @property
    def admin_password(self):
        return os.getenv('ADMIN_PASSWORD', 'adminNEWadmin')

    @property
    def domain(self):
        domain = os.getenv('SERVER_NAME', 'localhost')
        return f".{domain}"


# Instantiate the config
config = Config()
