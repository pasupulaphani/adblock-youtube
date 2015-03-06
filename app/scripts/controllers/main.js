'use strict';

/**
 * @ngdoc function
 * @name angApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angApp
 */
angular.module('angApp')
    .controller('MainCtrl', function($scope, $window, $sce, $http, appConfig) {

        $scope.conf = appConfig;
        $scope.conf.demoUrl = $sce.trustAsResourceUrl(appConfig.demoUrl.toString());

        $scope.info = {
            getStartTemp: ''
        };

        $http.get(appConfig.getStartMdUrl)
            .then(function(resp) {
                $scope.info.getStartTemp = $window.marked(resp.data);
            });

    });
