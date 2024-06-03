from django.urls import include, path
from rest_framework import routers
from .views import UserViewSet, user_login, user_logout, FileViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
urlpatterns = [
	path('login/', user_login, name='user-login'),
	path('logout/', user_logout, name='user-logout'),
	path('files/<user_folder>/', FileViewSet.as_view({'get': 'list', 'post': 'create'}), name='file-list'),
	path('files/<user_folder>/<int:pk>', FileViewSet.as_view({'patch': 'update', 'delete': 'destroy'}), name='file-detail'),
	path('download/<unique_id>/', FileViewSet.as_view({'get': 'download'}), name='file-download'),
] + router.urls
# print(urlpatterns)
