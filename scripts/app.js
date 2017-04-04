'use strict';

// Declares how the application should be bootstrapped. See: http://docs.angularjs.org/guide/module
var app = angular.module('app', ['ngRoute', 'app.filters', 'app.services', 'app.directives', 'app.controllers']);

app.config(['$routeProvider', '$locationProvider',
   function ($routeProvider, $locationProvider) {
       $routeProvider.
           /* Root */
           when('/', { templateUrl: 'views/home.html', controller: 'HomeCtrl' }).
           when('/about', { templateUrl: 'views/about.html', controller: 'AboutCtrl' }).
           when('/login', { templateUrl: 'views/login.html', controller: 'LoginCtrl' }).
           otherwise({
               redirectTo: '/404.html'
           });
       $locationProvider.html5Mode(true);
   }]);