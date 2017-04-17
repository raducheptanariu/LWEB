'use strict';

// Declares how the application should be bootstrapped. See: http://docs.angularjs.org/guide/module
var app = angular.module('app', ['ngRoute', 'pascalprecht.translate', 'ui.bootstrap', 'ngAnimate', 'ngInstafeed', 'youtube-embed']);

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

app.run(['$rootScope', '$timeout', function ($rootScope, $timeout) {
    $rootScope.viewTransition = 0;

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        $rootScope.viewTransition++;
    });

    $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
        $timeout(function () {
            $rootScope.viewTransition--;
        }, 1500);
    });
}]);

app.constant('userId', '1397192335');
app.constant('facebookLink', 'https://www.facebook.com/LauraSerbanOfficial/?pnref=lhc');
app.constant('youtubeLink', 'https://www.youtube.com/user/lauraserban16');
app.constant('twitterLink', 'https://twitter.com/lauraserban?lang=en');
app.constant('instagramLink', 'https://www.instagram.com/lauraserbanofficial/?hl=en');

app.constant('youtubeListApi', 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCIrOoqnoaKuGFMN3iuu3OClGthSii1ZZA&type=video&channelId=UCSVLGuqttMcRdGrWnABlt3Q&part=snippet,id&order=date&maxResults=20');


/* youtubeApiKey AIzaSyCIrOoqnoaKuGFMN3iuu3OClGthSii1ZZA 

YouTube User ID: SVLGuqttMcRdGrWnABlt3Q

YouTube Channel ID: UCSVLGuqttMcRdGrWnABlt3Q

*/
