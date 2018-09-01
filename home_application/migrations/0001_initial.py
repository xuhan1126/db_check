# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='database',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('platform', models.CharField(max_length=5, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe5\xb9\xb3\xe5\x8f\xb0')),
                ('db_type', models.CharField(max_length=10, verbose_name=b'\xe6\x95\xb0\xe6\x8d\xae\xe5\xba\x93\xe7\xb1\xbb\xe5\x9e\x8b', choices=[(b'UAP', b'UAP\xe5\xb9\xb3\xe5\x8f\xb0'), (b'BAP', b'BAP\xe5\xb9\xb3\xe5\x8f\xb0'), (b'IAP', b'IAP\xe5\xb9\xb3\xe5\x8f\xb0')])),
                ('address', models.CharField(max_length=15, verbose_name=b'IP\xe5\x9c\xb0\xe5\x9d\x80')),
                ('username', models.CharField(max_length=30, verbose_name=b'\xe7\x94\xa8\xe6\x88\xb7\xe5\x90\x8d')),
                ('password', models.CharField(max_length=100, verbose_name=b'\xe5\xaf\x86\xe7\xa0\x81')),
            ],
        ),
    ]
