'use strict';

// Declares how the application should be bootstrapped. See: http://docs.angularjs.org/guide/module
var app = angular.module('app', ['ngRoute', 'pascalprecht.translate', 'ui.bootstrap', 'ngAnimate', 'ngInstafeed']);

app.config(['$routeProvider', '$locationProvider', '$translateProvider', 'ngInstafeedProvider',
   function ($routeProvider, $locationProvider, $translateProvider, ngInstafeedProvider) {
       $routeProvider.
           /* Root */
           when('/', { templateUrl: 'views/about.html', controller: 'AboutCtrl' }).
           when('/gallery', { templateUrl: 'views/gallery.html', controller: 'GalleryCtrl' }).
           when('/music', { templateUrl: 'views/music.html', controller: 'MusicCtrl' }).
           when('/repertoire', { templateUrl: 'views/repertoire.html', controller: 'RepertoireCtrl' }).
           when('/blog', { templateUrl: 'views/blog.html', controller: 'BlogCtrl' }).
           when('/contact', { templateUrl: 'views/contact.html', controller: 'ContactCtrl' }).
           otherwise({ template: '<div class"container><div class="row"><div class="box">Not found</div></div></div>', controller: 'Error404Ctrl' });

       $locationProvider.html5Mode(true);

       initTranslations($translateProvider);

       ngInstafeedProvider.setClientId('6dec9fed9b844f809902163e95c47009');
       ngInstafeedProvider.setAccessToken('1397192335.1677ed0.b8bb8d167229491dba54f27f8c8c1a09');
   }
]);

