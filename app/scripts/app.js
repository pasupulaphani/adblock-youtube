'use strict';

/**
 * @ngdoc overview
 * @name angApp
 * @description
 * # angApp
 *
 * Main module of the application.
 */
angular
    .module('angApp', [
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .constant('appConfig', {
        projectUrl: 'https://github.com/pasupulaphani/adblock-youtube',
        demoUrl: 'http://embed.plnkr.co/xSwjk6fXgKRqIGb56KBp/preview',
        getStartMdUrl: 'https://rawgit.com/pasupulaphani/adblock-youtube/master/README.md',
        tarUrl: 'https://github.com/pasupulaphani/adblock-youtube/tarball/master',
        fallbackUrl: 'https://github.com/pasupulaphani/adblock-youtube/blob/master/README.md'
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/getting-started', {
                templateUrl: 'views/getting-started.html',
                controller: 'MainCtrl'
            })
            .when('/demo', {
                templateUrl: 'views/demo.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function($rootScope, $location) {
        $rootScope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };
    });
