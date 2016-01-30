from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

#from . import views

router = DefaultRouter(trailing_slash=False)
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework')),
]
