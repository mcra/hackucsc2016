# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-30 21:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='prefs',
            options={'verbose_name_plural': 'prefs'},
        ),
        migrations.AddField(
            model_name='prefs',
            name='img',
            field=models.URLField(blank=True),
        ),
    ]
