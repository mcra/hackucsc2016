from __future__ import unicode_literals

from django.db import models
from django.utils.timezone import now


class Event(models.Model):
    """
    An event.
    """
    name = models.CharField(max_length=128)
    datetime = models.DateTimeField(default=now)
    location = models.CharField(max_length=128, default='Home')
    # duration
    # description
    owner = models.ForeignKey('auth.User', related_name='owned_events')
    members = models.ManyToManyField('auth.User', related_name='joined_events')
    group_size = models.IntegerField(default=6)
    # image
    # anonymous / active

    class Meta:
        ordering = ('datetime',)

    def __unicode__(self):
        return "%s: %s" % (self.name, self.datetime)


class Comment(models.Model):
    """
    A User's comment on an Event.
    """
    event = models.ForeignKey(Event)
    owner = models.ForeignKey('auth.User', related_name='comments')
    text = models.CharField(max_length=512)


class Prefs(models.Model):
    # A history of joined events?
    # A picture
    owner = models.OneToOneField('auth.User', related_name='prefs')
