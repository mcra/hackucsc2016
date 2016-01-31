from django.conf.urls import url, include
from rest_framework.authtoken import views as auth_views
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter(trailing_slash=False)
router.register(r'events', views.EventViewSet, base_name="event")
router.register(r'users', views.UserViewSet, base_name="users")
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', auth_views.obtain_auth_token),
]
