from django.contrib.auth.models import User
from rest_framework import mixins, permissions, status, viewsets
from rest_framework.authentication import (
    TokenAuthentication, SessionAuthentication)
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response

from api.models import Event, Comment
from api.permissions import OwnerEdit
from api.serializers import CommentSerializer, EventSerializer, UserSerializer


class EventViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    # TODO: should delete be available?
    serializer_class = EventSerializer
    permission_classes = (permissions.IsAuthenticated, OwnerEdit)
    authentication_classes = (TokenAuthentication, SessionAuthentication)

    def get_queryset(self):
        return Event.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # List all of the current user's events
    @list_route(methods=['GET'])
    def mine(self, request):
        mine = self.get_queryset().filter(owner=self.request.user)
        mine = EventSerializer(mine, many=True).data
        return Response(mine)

    # Get or post Comments on an Event
    @detail_route(methods=['GET', 'POST'])
    def comments(self, request, pk=None):
        if request.method == 'GET':
            comments = CommentSerializer(
                Comment.objects.filter(event=pk), many=True)
            return Response(comments.data)
        elif request.method == 'POST':
            # TODO: only comment if a member
            serializer = CommentSerializer(data=request.data)
            serializer.initial_data['event'] = pk
            serializer.initial_data['owner'] = self.request.user.pk
            if serializer.is_valid():
                serializer.save()
                return Response({'status': 'OK'})
            else:
                return Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)

    # Get the member list or join or leave an Event
    @detail_route(methods=['GET', 'POST', 'DELETE'])
    def members(self, request, pk=None):
        if request.method == 'GET':
            # Get the list of participants.
            # TODO: Only available if you've joined.
            # TODO: check for valid event
            event = Event.objects.get(pk=pk)
            members = UserSerializer(event.members.all(), many=True)
            return Response(members.data)
        elif request.method == 'POST':
            # Join the event.
            event = Event.objects.get(pk=pk)
            # TODO: Only available if Event is active.
            # TODO: Only if not already a member
            # TODO: anonymity until threshold
            if True:
                event.members.add(request.user)
                return Response({'status': 'OK'})
            else:
                return Response({'error': 'Event is full'},
                                status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            # Leave the event.
            event = Event.objects.get(pk=pk)
            event.members.remove(request.user)
            return Response({'status': 'OK'})


class UserViewSet(mixins.RetrieveModelMixin,
                  viewsets.GenericViewSet):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (TokenAuthentication, SessionAuthentication)

    def get_queryset(self):
        return User.objects.all()

    @detail_route(methods=['GET'])
    def events(self, request, pk=None):
        events = Event.objects.filter(owner=pk)
        events = EventSerializer(events, many=True)
        return Response(events.data)

    @list_route(methods=['GET'])
    def me(self, request, pk=None):
        user = UserSerializer(self.request.user)
        events = Event.objects.filter(owner=pk)
        events = EventSerializer(events, many=True)
        return Response({'user': user.data, 'events': events.data})
