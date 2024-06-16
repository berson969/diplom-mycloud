from django.urls import path
from rest_framework import routers

from .views import FileViewSet, UserViewSet, user_login, user_logout

router = routers.DefaultRouter()
router.register('users', UserViewSet, basename='user')
urlpatterns = [
	path('login/', user_login, name='user-login'),
	path('logout/', user_logout, name='user-logout'),
	path('files/<folder_name>/', FileViewSet.as_view({'get': 'list', 'post': 'create'}), name='file-list'),
	path('files/<folder_name>/<int:pk>', FileViewSet.as_view({'patch': 'update', 'delete': 'destroy'}), name='file-detail'),
	path('download/<unique_id>/', FileViewSet.as_view({'get': 'download'}), name='file-download'),
] + router.urls
