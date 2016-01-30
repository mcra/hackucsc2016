from rest_framework import serializers

from api.models import Event


class EventSerializer(serializers.ModelSerializer):
    """
    An Event serializer.
    """
    # TODO: serialize members by username
    # TODO: don't show all possible members in the browseable API creation form

    class Meta:
        model = Event
        exclude = ('owner',)
