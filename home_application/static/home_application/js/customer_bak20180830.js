/**
 * Created by Han on 2018/8/23.
 */
var app = angular.module('db_check', ['ui.bootstrap']);
// 设置AngularJS的变量符号'{{}}'成'[[]]'
app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

// 配置控制器
app.controller('ctl_login', ['$scope', '$http', function ($scope, $http) {

    // 点击登录按钮运行的函数
    $scope.func_login = function () {
        user = {
            username: $scope.username,
            password: $scope.password
        };
        $http({
            method: 'POST',
            url: '/account_check/',
            data: user
        }).then(function successCallback(response) {
            // 判断用户和密码是否验证通过，通过就跳转到主页
            if (response.data.result == 'success') {
                window.location = ('/');
            } else if (response.data.result == 'failed') {
                // 输入框保留刚输入的账号和密码
                $scope.username = user.username;
                $scope.password = user.password;
                $scope.msg = '账号或密码错误！'

            }
        }, function errorCallback(response) {
            //alert("http服务测试失败")
            $scope.msg = '身份验证请求无响应！';
        });

    };

    // 测试sweetalert弹窗 TODO 上线前删除该函数
    $scope.sweet_test = function () {

        sweetAlert('guangzhou', 'test', 'error');
        // swal("广州嘉为科技有限公司",'','success');

    };

}]);

// 查看任务明细的控制器
app.controller('task_lisk', ['$scope', '$modal', function ($scope, $modal) {
    $scope.task_detail_view = function () {
        // 点击任务明细按钮后弹出的窗口
        var modalinstance_detail = $modal.open({
            templateUrl: views_url + 'task_detail.html',
            controller: 'task_detail',
            backdrop: 'static',
            resolve: {
                data: function () {
                    return {'task_id': '111'}
                }
            }
        });

        // 正常关闭弹窗后的响应
        modalinstance_detail.result.then(function () {
            swal('退出查看', 'Close', 'success');
        });

    };


    // “添加服务器”按钮被点击弹出框
/*
    $scope.add_server = function () {
        var modalinstance_add_server = $modal.open({
            templateUrl: views_url + 'add_server.html',
            controller: 'add_server',
            backdrop: 'static',
            resolve: {
                data: function () {
                    return {'server_id': '222'}
                }
            }
        });

        // 添加数据库服务器成功
        modalinstance_add_server.result.then(function () {
            swal({
                title: '添加数据库服务器成功',
                text: 'IP：' + $('#in_address').val(),
                type: 'success',
                timer: 3000
            });

        })
    }
*/

}]);


// 绑定给查看任务明细子窗口的控制器
app.controller('task_detail', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
    // 弹框中“发送邮件”按钮被点击
    $scope.task_detail_sendmail = function () {
        $modalInstance.close()

    };

    // 弹框中取消按钮被点击
    $scope.task_detail_cancel = function () {
        $modalInstance.dismiss()
    }

}]);


// 绑定给添加服务器子窗口的控制器
app.controller('add_server', ['$scope', '$modalInstance', '$http', function ($scope, $modalInstance, $http) {
    // 弹框中"保存"按钮被点击
    $scope.add_server_save = function () {
        // 组合数据库的别名
        // TODO 优化逻辑，判断两次密码是否一致等
        var BieMing = $("#in_platform").val() + '-' + $("#in_db_type").val() + '-' + $('#in_address').val();
        p_data = {
            'address': $('#in_address').val(),
            'db_type': $("#in_db_type").val(),
            'platform': $("#in_platform").val(),
            'username': $("#in_username").val(),
            'password': $("#in_password").val(),
            'bieming': BieMing
        };

        // 传递信息给后台进行添加
        $http({
            method: 'POST',
            url: '/add_server/',
            data: p_data
        }).then(function successCallback(response) {    // post成功所执行的回调函数：接口相应success
            if (response.data.result == 'success') {
                $modalInstance.close();
            } else if (response.data.result == 'failed') {
                swal({
                    title: '该服务器已经存在！',
                    text: $scope.address,
                    type: 'warning',
                    timer: 1500
                })
            }
        }, function errorCallback(response) {           // post请求失败所执行的回调函数
            swal({
                title: '服务器无响应：404 错误！',
                text: $scope.address,
                type: 'error',
                timer: 1000
            })
        });

    };

    // 弹框中取消按钮被点击
    $scope.add_server_cancel = function () {
        $modalInstance.dismiss()
    }

}]);

