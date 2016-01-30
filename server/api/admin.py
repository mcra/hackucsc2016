from django.contrib import admin

from api.models import Comment, Event


class CommentInline(admin.TabularInline):
    model = Comment
    extra = 0


class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'datetime', 'location')
    list_filter = ('name', 'owner', 'datetime', 'location')
    inlines = [CommentInline, ]


admin.site.register(Event, EventAdmin)
