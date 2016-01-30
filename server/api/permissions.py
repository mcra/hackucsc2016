from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Custom permission to allow only owners of an object to read or edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Write permissions are only allowed to the owner of the object.
        return obj.owner == request.user


class OwnerEdit(permissions.BasePermission):
    """
    Custom permission to allow only owners of an object to edit or delete it.
    """
    def has_object_permission(self, request, view, obj):
        # Write permissions are only allowed to the owner of the object.
        if request.method in ('PUT', 'PATCH', 'DELETE'):
            return obj.owner == request.user
        return True
