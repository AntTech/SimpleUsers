/**
 * Created by yangzx on 3/13/2015.
 */
'use strict';
var userListModule = angular.module("userListModule", ['ngResource', 'userServices']);
userListModule.controller('UserListController', function($scope, $http, $state, $stateParams, $resource, UserInfoService) {
    console.log("start controller");
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.welecome = "欢迎使用！";
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize: 5,
        currentPage: 1
    };
    //console.log($stateParams);
    //分页数据
    $scope.setPagingData = function(data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.userList = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.searchText = function(){
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage,$scope.searchName);
    }
    $scope.getPagedDataAsync = function(pageSize, page, searchText) {
        setTimeout(function() {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                UserInfoService.query({
                        userId: "userlist",
                        userName: searchText
                    })
                    .$promise.then(
                        //success
                        function(value) {
                            var data = value.filter(function(item) {
                                return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                            });
                            $scope.setPagingData(data, page, pageSize);
                        },
                        //error
                        function(error) {
                            alert('获取数据失败');
                        }
                    );
            } else {
                UserInfoService.query({
                        userId: "userlist"
                    })
                    .$promise.then(
                        //success
                        function(value) {
                            $scope.setPagingData(value, page, pageSize);
                        },
                        //error
                        function(error) {
                            alert('获取数据失败');
                        }
                    );

            }
        }, 100);
    };
    //执行获取数据
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    $scope.$watch('pagingOptions', function(newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'userList',
        rowTemplate: '<div style="height: 100%">' +
            '<div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
            '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
            '<div ng-cell></div>' +
            '</div></div>',
        multiSelect: false,
        columnDefs: [{
            field: 'index',
            displayName: '序号',
            width: 40,
            pinnable: false,
            sortable: false
        }, {
            field: 'UserId',
            displayName: '用户名',
            enableCellEdit: true,
            width: 80
        }, {
            field: 'UserName',
            displayName: '姓名',
            enableCellEdit: true,
            width: 100
        }, {
            field: 'Sex',
            displayName: '性别',
            enableCellEdit: true,
            width: 50
        }, {
            field: 'Age',
            displayName: '年龄',
            enableCellEdit: true,
            width: 50
        }, {
            field: 'Email',
            displayName: 'Email',
            enableCellEdit: true,
            width: 150
        }, {
            field: 'Phone',
            displayName: '电话',
            enableCellEdit: true,
            width: 120
        }, {
            field: 'Address',
            displayName: '地址',
            enableCellEdit: true,
            width: 250
        }, {
            field: 'UserId',
            displayName: '操作',
            enableCellEdit: false,
            sortable: false,
            pinnable: false,
            cellTemplate: '<div><a ui-sref="updateUser({userId:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">编辑</a>&nbsp;<a ui-sref="userInfo({userId:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">查看</a>&nbsp;<a ng-click="deleteUser(row.getProperty(col.field))">删除</a></div>'
        }],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
    $scope.deleteUser = function(userid) {
        //删除用户操作
        if (confirm('确定要删除吗？')) {
            console.log("删除" + userid);
            var user = $resource('/deleteUser',{UserId:userid});
            user.delete({UserId:userid},function(){
                alert('删除成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            })
        };
    };
});