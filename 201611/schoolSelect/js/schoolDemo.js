(function(){
    var repoApp = angular.module('repoApp',[]);
    repoApp.controller('schoolDomoController',['$scope','$http',function($scope,$http){
        declare($scope,$http);
        init($scope)
    }])

    //数据初始化
    function init($scope){
        //学校下拉框的默认不显示
        $scope.school={};
        $scope.school.dropBox = false;

        //当前
        $scope.current=1;
        $scope.setCurrent = function (tab) {
            $scope.current = tab;
        };

        $scope.isSet = function(tab) {
            return $scope.current == tab;
         };
    }

    //方法声明
    function declare($scope,$http){
        $scope.schoolDemoController = {
            //点击输入框，显示下拉框
            showBox:function(){
                $scope.school.dropBox = true;
            }
        }
    }
})()