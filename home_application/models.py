# _*_coding:utf8_*_
from django.db import models


# 数据库模型，管理要进行巡检数据库
class database(models.Model):

    def f_bieming(self):
        self.bieming = self.platform + '-' + self.db_type + '-' + self.address
        return self.bieming

    platform_choice = (
        ('UAP', 'UAP平台'),
        ('BAP', 'BAP平台'),
        ('IAP', 'IAP平台'),
    )
    type_choice = (
        ('Oracle', 'Oracle'),
        ('MSSQL', 'MSSQL'),
        ('MySQL', 'MySQL'),
    )

    platform = models.CharField(choices=platform_choice, max_length=5, verbose_name='所属平台')
    db_type = models.CharField(choices=type_choice, max_length=10, verbose_name='数据库类型')
    address = models.CharField(max_length=15, verbose_name='IP地址')
    bieming = models.CharField(max_length=50, verbose_name='服务器别名', null=True)
    username = models.CharField(max_length=30, verbose_name='用户名')
    password = models.CharField(max_length=100, verbose_name='密码')

    def __str__(self):
        return self.bieming

