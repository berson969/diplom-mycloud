from django.urls import include, path
from rest_framework import routers
from .views import UserViewSet, user_login, user_logout

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
urlpatterns = [
	path('login/', user_login, name='user-login'),
	path('logout/', user_logout, name='user-logout'),
	# path('login/', UserViewSet.as_view({'post': 'login'}), name='user-login'),
	# path('logout/', UserViewSet.as_view({'post': 'logout'}), name='user-logout'),
] + router.urls
# print(urlpatterns)
