# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home_application', '0002_auto_20180828_1713'),
    ]

    operations = [
        migrations.AddField(
            model_name='database',
            name='bieming',
            field=models.CharField(max_length=50, null=True, verbose_name=b'\xe6\x9c\x8d\xe5\x8a\xa1\xe5\x99\xa8\xe5\x88\xab\xe5\x90\x8d'),
        ),
    ]
