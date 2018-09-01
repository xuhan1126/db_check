/**
 * Created by Han on 2018/8/30.
 */

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
