import os
from dotenv import load_dotenv


class Config:
    def __init__(self):
        if not os.getenv('GITHUB_ACTIONS'):
            load_dotenv()

    @property
    def db_base(self):
        return os.getenv('DB_BASE')

    @property
    def db_host(self):
        return os.getenv('DB_HOST')

    @property
    def db_port(self):
        return os.getenv('DB_PORT')

    @property
    def db_user(self):
        return os.getenv('DB_USER')

    @property
    def db_pass(self):
        return os.getenv('DB_PASS')

    @property
    def django_settings_module(self):
        return os.getenv('DJANGO_SETTINGS_MODULE')

    @property
    def secret_key(self):
        return os.getenv('SECRET_KEY')

    @property
    def app_debug(self):
        return os.getenv('APP_DEBUG') == 'True'

    @property
    def allowed_hosts(self):
        return os.getenv('ALLOWED_HOSTS').split(',')

    @property
    def frontend_url(self):
        return os.getenv('FRONTEND_URL')

    @property
    def server_name(self):
        return os.getenv('SERVER_NAME')

    @property
    def admin_password(self):
        return os.getenv('ADMIN_PASSWORD')


# Instantiate the config
config = Config()