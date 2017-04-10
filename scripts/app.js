'use strict';

// Declares how the application should be bootstrapped. See: http://docs.angularjs.org/guide/module
var app = angular.module('app', ['ngRoute', 'pascalprecht.translate', 'app.filters', 'app.services', 'app.directives', 'app.controllers']);

app.config(['$routeProvider', '$locationProvider', '$translateProvider',
   function ($routeProvider, $locationProvider, $translateProvider) {
       $routeProvider.
           /* Root */
           when('/', { templateUrl: 'views/about.html', controller: 'AboutCtrl' }).
           when('/blog', { templateUrl: 'views/blog.html', controller: 'BlogCtrl' }).
           when('/contact', { templateUrl: 'views/contact.html', controller: 'ContactCtrl' }).
           otherwise({ template: '<div class"container">Not found</div>', controller: 'Error404Ctrl' });

       $locationProvider.html5Mode(true);

       $translateProvider.translations('ro', {
           LAYOUT_HEADER_ABOUT: 'Despre mine'
       });

       $translateProvider.translations('en', {
           LAYOUT_HEADER_ABOUT: 'About me'
       });

       var lang = navigator.languages
            ? navigator.languages[0]
            : (navigator.language || navigator.userLanguage);
       if (lang.indexOf('ro') >= 0) {
           $translateProvider.preferredLanguage('ro');
       }
       else {
           $translateProvider.preferredLanguage('en');
       }
   }
]);