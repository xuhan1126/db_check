"""db_check URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from home_application import views

# urlpatterns = [
#     url(r'^admin/', include(admin.site.urls)),
#     url(r'^task_list/',views.task_list),
#     url(r'^db_manage/',views.db_mamage),
#     url(r'', views.home),
# ]

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^user_login/',views.user_login),
    url(r'^account_check/',views.account_check),
    url(r'^db_manage/',views.db_mamage),
    url(r'^add_server/',views.add_server,name='add_server'),
    url(r'^delete_server/',views.delete_server,name='delete_server'),
    url(r'^user_logout/',views.user_logout,name='user_logout'),
    #url(r'^just_test/',views.just_test),
    url(r'', views.task_list,name='home_page'),
]
