from django.contrib.auth.models import User
from rest_framework import serializers

from api.models import Event, Comment, Prefs


class PrefsSerializer(serializers.ModelSerializer):
    """
    A Prefs serializer.
    """

    class Meta:
        model = Prefs
        fields = ('img',)


class UserSerializer(serializers.ModelSerializer):
    """
    A User serializer.
    """
    prefs = PrefsSerializer()

    class Meta:
        model = User
        fields = ('username', 'id', 'prefs')


class CommentSerializer(serializers.ModelSerializer):
    """
    A Comment serializer.
    """
    owner = UserSerializer()

    class Meta:
        model = Comment
        fields = ('owner', 'text')


class EventSerializer(serializers.ModelSerializer):
    """
    An Event serializer. Members are excluded since they can't be designated at
    creation time.
    """

    class Meta:
        model = Event
        exclude = ('owner', 'members')
