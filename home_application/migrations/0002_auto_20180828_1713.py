# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home_application', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='database',
            name='db_type',
            field=models.CharField(max_length=10, verbose_name=b'\xe6\x95\xb0\xe6\x8d\xae\xe5\xba\x93\xe7\xb1\xbb\xe5\x9e\x8b', choices=[(b'Oracle', b'Oracle'), (b'MSSQL', b'MSSQL'), (b'MySQL', b'MySQL')]),
        ),
        migrations.AlterField(
            model_name='database',
            name='platform',
            field=models.CharField(max_length=5, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe5\xb9\xb3\xe5\x8f\xb0', choices=[(b'UAP', b'UAP\xe5\xb9\xb3\xe5\x8f\xb0'), (b'BAP', b'BAP\xe5\xb9\xb3\xe5\x8f\xb0'), (b'IAP', b'IAP\xe5\xb9\xb3\xe5\x8f\xb0')]),
        ),
    ]
