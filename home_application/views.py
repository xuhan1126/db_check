# _*_coding:utf8_*_
from django.shortcuts import render,redirect,HttpResponse,get_object_or_404
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from home_application.models import database
import json



def user_login(request):
    return render(request,"home_application/user_login.html")


def account_check(request):
    if request.method == 'GET':
        return render(request,"home_application/user_login.html",{'msg':'请您先登录！'})
    else:
        # 获取AJAX传递过来的账号和密码
        p_data = json.loads(request.body)
        username = p_data['username']
        password = p_data['password']
        user = authenticate(username=username,password=password)
        if user:
            request.session.set_expiry(0)
            login(request,user)
            request.session['user'] = user.last_name
            return JsonResponse({'result':'success'})
        else:
            return JsonResponse({'result':'failed'})


# 用户退出时执行的函数
def user_logout(request):
    request.session.flush()
    # logout(request)
    return render(request, "home_application/user_login.html")


# 列出任务表，该页面是应用首页
@login_required
def task_list(request):
    if request.user.is_authenticated():
        server_bieming = database.objects.values('bieming','id')
        return render(request,"home_application/task_list.html",{'server_list_options':list(server_bieming)})
    else:
        return render(request,"home_application/user_login.html")


# 管理后台，用于添加要巡检的数据库
@login_required
def db_mamage(request):
    all_servers = database.objects.values()
    # print(request.user.is_authenticated())
    # print request.session.session_key
    return render(request,"home_application/db_manage.html",{'db_servers':list(all_servers)})


# 用于测试的函数 TODO 上线前需要清理
def just_test(request):
    s1 = str([{"result":"OK"}])
    return JsonResponse({"result":"Json testing"},safe=False)


# 添加数据库服务器
@login_required()
def add_server(request):
    if request.method == 'POST':
        # TODO 异常捕获
        p_server = json.loads(request.body)
        # 获取到Ajax传过来的别名：过滤掉别名前后两边空格
        p_bieming = p_server['bieming'].strip()
        try:
            # 判断提交的别名是否已经存在：本例以别名作为唯一标识，类似于主键的功能
            is_exit_server = get_object_or_404(database,bieming=p_bieming)
        except Exception as e:
            # 抛出异常，说明要添加的数据库服务器不存在，那么在此处就需要添加到后台数据库
            print "%s".center(50,'-') %('Add server')
            #print p_server
            database.objects.create(**p_server)
            # 新服务器添加完成后，将所有记录返回给前端，用于记录刷新
            servers = list(database.objects.values())
            return JsonResponse({'result':'success','db_servers':servers})
        else:
            return JsonResponse({'result':'failed'})
    else:
        return JsonResponse({'result':'error'})


# 删除指定的服务器
@login_required()
def delete_server(request):
    p_data = json.loads(request.body)
    server_id = p_data['id']
    try:
        database.objects.filter(pk=server_id).delete()
    except Exception as e:
        return JsonResponse({'result':'failed'})
    else:
        return JsonResponse({'result':'success'})
