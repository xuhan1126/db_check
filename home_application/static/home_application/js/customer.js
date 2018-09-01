/**
 * Created by Han on 2018/8/23.
 */
var app = angular.module('db_check', ['ui.bootstrap']);
// 设置AngularJS的变量符号'{{}}'成'[[]]'
app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

// 该控制器主要作用是用于登录页面
app.controller('userLoginCtrl', ['$scope', '$http', function ($scope, $http) {

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
                // 这个地方的 '/' 路径是整个应用的主页，也就是 task_list
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

    };  // 登录函数结尾


}]);    // 登录页面控制器结尾


// 所有继承app_template模板的页面共有的控制器
app.controller('appShareCtrl', ['$scope', '$modal', '$http', function ($scope, $modal, $http) {

    $scope.task_view = function () {
        // 点击任务明细按钮后弹出的窗口
        var modalinstance_detail = $modal.open({
            templateUrl: views_url + 'task_detail.html',
            controller: 'task_detail',
            backdrop: 'static',
            resolve: {
                data: function () {
                    return {}
                }
            }
        });

        // 正常关闭弹窗后的响应
        modalinstance_detail.result.then(function () {
            swal('退出查看', 'Close', 'success');
        });

    };


    // “添加服务器”按钮被点击弹出框
    $scope.add_server = function () {
        var modalinstance_add_server = $modal.open({
            templateUrl: views_url + 'add_server.html',
            controller: 'add_server',
            backdrop: 'static'
        /*    resolve: {  // 不需要传值，该部分是否可以不要？ TODO：已确定，留作笔记
                data: function () {
                    return {}
                }
            }*/
        });

        // 添加数据库服务器成功
        modalinstance_add_server.result.then(function () {
            swal({
                title: '添加数据库服务器成功',
                text: 'IP：' + $('#in_address').val(),
                type: 'success',
                timer: 5000
            });
            location.reload();
        })
    };


    // 删除服务器按钮触发的函数
    $scope.delete_server = function (sid,sip) {
        // 点击删除按钮后，弹出确认框，然后根据不同的选择执行对应的回调函数
        swal({
                title: "确认删除该条记录？",
                text: "服务器IP：" + sip,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: "哦，不",
                closeOnConfirm: false,
                closeOnCancel: true

            },
            // 弹框按钮触发的回调函数，针对确认和取消两个操作
            function (isConfirm) {
                // 点击确认框的“确定”按钮后，执行删除操作的函数
                if (isConfirm) {
                    $http({
                        method: 'POST',
                        url: /delete_server/,
                        data: {id: sid}
                    }).then(function successCallback(response) {
                        // 删除成功，后台返回 success 关键字
                        if (response.data.result == 'success') {
                            swal('删除成功', 'IP：' + sip, 'success');
                            // 刷新当前页面
                            location.reload()
                        } else {
                            swal('删除失败', 'IP：' + sip, 'warning');
                        }
                    }, function errorCallback(response) {
                        swal('提交数据到服务器失败', '请求无响应', 'error')
                    })
                }   // 确认操作结束位置

            });

    };   // 删除按钮函数结束位置


    // 编辑服务器，最好将前端的值全部传给子窗口
    $scope.edit_server = function (data) {
        var modalinstance_edit_server = $modal.open({
            templateUrl:views_url + 'edit_server.html',
            controller:'edit_server',
            backdrop:'static',
            resolve:{
                obj:function () {
                    // return {'server':{'username': 'test', 'bieming': 'UAP-Oracle-1.1.1.1', 'db_type': 'Oracle', 'platform': 'UAP', 'address': '1.1.1.1', 'password': '', 'id': 63}}
                    return {'server':data}
                }
            }
        })
    }


}]);

