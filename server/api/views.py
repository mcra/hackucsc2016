from rest_framework import permissions, status, viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from api.models import Event, Comment
from api.permissions import IsOwner
from api.serializers import CommentSerializer, EventSerializer


class EventViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    serializer_class = EventSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Event.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @detail_route(methods=['GET', 'POST'])
    def comments(self, request, pk=None):
        if request.method == 'GET':
            comments = CommentSerializer(
                Comment.objects.filter(event=pk), many=True)
            resp = {'comments': comments.data}
            return Response(resp)
        elif request.method == 'POST':
            serializer = CommentSerializer(data=request.data)
            serializer.initial_data['event'] = pk
            if serializer.is_valid():
                serializer.save(owner=self.request.user)
                return Response({'status': 'OK'})
            else:
                return Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)


class CommentViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions. List only owned comments.
    """
    # TODO: only list -- don't allow creation from here
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        return Comment.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
