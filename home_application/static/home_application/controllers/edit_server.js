/**
 * Created by Han on 2018/8/30.
 */

// 绑定给添加服务器子窗口的控制器
app.controller('edit_server', ['$scope', '$modalInstance', '$http', 'obj', function ($scope, $modalInstance, $http, obj) {
    /*将传递过来不符合规范的字符串变换成JavaScript能处理的对象（python中成为字典）*/
    // 1、将所有的单引号替换成双引号，gi 代表所有并且忽略大小写
    temp_data_01 = obj.server.replace(/'/gi, '"');
    console.log(temp_data_01);
    // 2、将所有的u" 转换成 " ，用于json格式的转换
    temp_data_02 = temp_data_01.replace(/u"/gi, '"');
    console.log(temp_data_02);
    // 3、将前两部替换好的字符串转换成JavaScript能处理的对象
    temp_data = JSON.parse(temp_data_02);
    // 4、把转换好的对象赋值给弹框的server，然后将对象各条目赋值给对应的输入框
    $scope.server = temp_data;

    // 弹框中"保存"按钮被点击
    $scope.edit_server_save = function () {
        // TODO 优化逻辑，判断两次密码是否一致等

        // 传递信息给后台进行添加
        $http({
            method: 'POST',
            url: '/edit_server/',
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
    $scope.edit_server_cancel = function () {
        $modalInstance.dismiss()
    }

}]);
