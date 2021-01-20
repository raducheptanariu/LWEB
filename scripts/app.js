'use strict';

// Declares how the application should be bootstrapped. See: http://docs.angularjs.org/guide/module
var app = angular.module('app', ['ui.router', 'pascalprecht.translate', 'ui.bootstrap', 'ngAnimate', 'ngTouch', 'ngInstafeed', 'youtube-embed', 'mobile-angular-ui.gestures.swipe']);

app.config(['$stateProvider', '$locationProvider', '$translateProvider', 'ngInstafeedProvider',
    function ($stateProvider, $locationProvider, $translateProvider, ngInstafeedProvider) {
        $stateProvider
           /* Root */
            .state('about', {
                url: '/',
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .state('gallery', {
                url: '/gallery',
                templateUrl: 'views/gallery.html',
                controller: 'GalleryCtrl'
            })
            .state('music', {
                url: '/music',
                templateUrl: 'views/music.html',
                controller: 'MusicCtrl'
            })
            .state('repertoire', {
                url: '/repertoire',
                templateUrl: 'views/repertoire.html',
                controller: 'RepertoireCtrl'
            })
            .state('blog', {
                url: '/blog',
                templateUrl: 'views/blog.html',
                controller: 'BlogCtrl'
            })
            .state('blogpost', {
                url: '/blogpost?name',
                templateUrl: 'views/blogpost.html',
                controller: 'BlogPostCtrl'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'views/contact.html',
                controller: 'ContactCtrl'
            })
            .state('giveaway-iphone', {
                url: '/giveaway-iphone',
                templateUrl: 'views/giveaway-iphone.html',
                controller: 'ContactCtrl'
            })
            .state('otherwise', {
                url: '*path',
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
                //templateUrl: 'views/404.html',
                //controller: 'Error404Ctrl'
        });

       $locationProvider.html5Mode(true);

       var lang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
       var currentLang = lang.indexOf('ro') >= 0 ? 'ro' : 'en';

       $translateProvider.useStaticFilesLoader({
           files: [{
               prefix: 'api/translate/pages-',
               suffix: '.json'
           }]
       });
       $translateProvider.preferredLanguage(currentLang);

       ngInstafeedProvider.setClientId('6dec9fed9b844f809902163e95c47009');
       ngInstafeedProvider.setAccessToken('1397192335.1677ed0.b8bb8d167229491dba54f27f8c8c1a09');
   }
]);

app.run(['$rootScope', '$timeout', function ($rootScope, $timeout) {
    $rootScope.viewTransition = 0;

    $rootScope.$on("$stateChangeStart", function () {
        $rootScope.viewTransition++;
    });

    $rootScope.$on("$stateChangeSuccess", function () {
        $timeout(function () {
            $rootScope.viewTransition -= 2;
        }, 1500);
    });
}]);

app.constant('navigationLinks', ["about", "gallery", "music", "repertoire", "contact"]); // "blog",
app.constant('availableLangs', ["ro", "en"]);

app.constant('userId', '1397192335');
app.constant('facebookLink', 'https://www.facebook.com/LauraSerbanOfficial/?pnref=lhc');
app.constant('youtubeLink', 'https://www.youtube.com/user/lauraserban16');
app.constant('twitterLink', 'https://twitter.com/lauraserban?lang=en');
app.constant('instagramLink', 'https://www.instagram.com/lauraserbanofficial/?hl=en');

app.constant('youtubeListApi', 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCIrOoqnoaKuGFMN3iuu3OClGthSii1ZZA&type=video&channelId=UCSVLGuqttMcRdGrWnABlt3Q&part=snippet,id&order=date&maxResults=20');
app.constant('instagramLikeApi', 'https://api.instagram.com/v1/media/{media-id}/likes');
app.constant('instagramToken', '1397192335.1677ed0.b8bb8d167229491dba54f27f8c8c1a09');

app.constant('repertoireListApi', 'api/repertoire.json');
app.constant('postsListApi', 'api/blog/_posts.json');
app.constant('postsApi', 'api/blog/');

app.constant('disqusShortname', 'lauraserban-com');

app.constant('shareThisApi', '//platform-api.sharethis.com/js/sharethis.js#property=590dc7d8ef4e140012286ac2&product=inline-share-buttons');

app.constant('phoneConfig', '+40 754732375');
app.constant('emailConfig', 'lauraserbanmusic@gmail.com');

app.constant('cloudnoApi', 'http://lweb.cloudno.de');