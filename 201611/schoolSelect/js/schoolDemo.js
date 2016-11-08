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
        $scope.tab={};
        $scope.current=1;
        $scope.tab.setCurrent = function (tab) {
            $scope.current = tab;
        };
        $scope.tab.isSet = function(tab) {
            return $scope.current == tab;
         };

        //地区
        $scope.provinces=[{id:100000,name:"北京"},{id:110000,name:"天津"},{id:120000,name:"河北"}
            ,{id:130000,name:"黑龙江"},{id:140000,name:"辽宁"},{id:150000,name:"河南"}
            ,{id:160000,name:"山西"},{id:170000,name:"山东"},{id:180000,name:"江苏"}];
        $scope.citys=[{id:100000,name:"北京市"},{id:100000,name:"天津市"},{id:100000,name:"石家庄"}
            ,{id:130000,name:"黑龙江"},{id:130000,name:"铁林"},{id:130000,name:"郑州"}
            ,{id:130000,name:"太原"},{id:130000,name:"济南"},{id:130000,name:"南京"}];
        $scope.towns=[{id:100000,name:"北京市"},{id:100000,name:"天津市"},{id:100000,name:"石家庄"}
            ,{id:130000,name:"黑龙江"},{id:130000,name:"铁林"},{id:130000,name:"郑州"}
            ,{id:130000,name:"太原"},{id:130000,name:"济南"},{id:130000,name:"南京"}];
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