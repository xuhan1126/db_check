/**
 * Created by Han on 2018/8/30.
 */
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
