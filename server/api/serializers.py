from django.contrib.auth.models import User
from rest_framework import serializers

from api.models import Event, Comment


class CommentSerializer(serializers.ModelSerializer):
    """
    A Comment serializer.
    """
    # TODO: serialize with owner name

    class Meta:
        model = Comment
        exclude = ('id',)
        read_only = ('event',)


class EventSerializer(serializers.ModelSerializer):
    """
    An Event serializer. Members are excluded since they can't be designated at
    creation time.
    """

    class Meta:
        model = Event
        exclude = ('owner', 'members')


class UserSerializer(serializers.ModelSerializer):
    """
    A User serializer.
    """

    class Meta:
        model = User
        fields = ('id', 'username',)
