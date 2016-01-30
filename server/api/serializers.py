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
    An Event serializer.
    """
    # TODO: serialize members by username
    # TODO: don't show all possible members in the browseable API creation form
    # TODO: exclude members. they can't be designated at creation

    class Meta:
        model = Event
        exclude = ('owner',)
