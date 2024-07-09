from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"

class UserConfig(AppConfig):
    name = 'user'

    def ready(self):
        import api.signals
