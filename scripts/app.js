'use strict';

// Declares how the application should be bootstrapped. See: http://docs.angularjs.org/guide/module
var app = angular.module('app', ['ngRoute', 'pascalprecht.translate', 'ui.bootstrap', 'ngAnimate', 'ngTouch', 'ngInstafeed', 'youtube-embed', 'dirDisqus']);

app.config(['$routeProvider', '$locationProvider', '$translateProvider', 'ngInstafeedProvider',
   function ($routeProvider, $locationProvider, $translateProvider, ngInstafeedProvider) {
       $routeProvider.
           /* Root */
           when('/', { templateUrl: 'views/about.html', controller: 'AboutCtrl' }).
           when('/gallery', { templateUrl: 'views/gallery.html', controller: 'GalleryCtrl' }).
           when('/music', { templateUrl: 'views/music.html', controller: 'MusicCtrl' }).
           when('/repertoire', { templateUrl: 'views/repertoire.html', controller: 'RepertoireCtrl' }).
           when('/blog', { templateUrl: 'views/blog.html', controller: 'BlogCtrl' }).
           when('/blog:name?', {
               templateUrl: 'views/blogpost.html',
               controller: 'BlogPostCtrl',
               resolve: { name: function ($route) { return $route.current.params.name.substring(6); } }
           }).
           when('/contact', { templateUrl: 'views/contact.html', controller: 'ContactCtrl' }).
           otherwise({ templateUrl: 'views/404.html', controller: 'Error404Ctrl' });

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

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        $rootScope.viewTransition++;
    });

    $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
        $timeout(function () {
            // animation triggers 2x route change start
            $rootScope.viewTransition -= 2;
        }, 1500);
    });
}]);

app.constant('navigationLinks', ["about", "gallery", "music", "repertoire", "blog", "contact"]);
app.constant('availableLangs', ["ro", "en"]);

app.constant('userId', '1397192335');
app.constant('facebookLink', 'https://www.facebook.com/LauraSerbanOfficial/?pnref=lhc');
app.constant('youtubeLink', 'https://www.youtube.com/user/lauraserban16');
app.constant('twitterLink', 'https://twitter.com/lauraserban?lang=en');
app.constant('instagramLink', 'https://www.instagram.com/lauraserbanofficial/?hl=en');

app.constant('youtubeListApi', 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCIrOoqnoaKuGFMN3iuu3OClGthSii1ZZA&type=video&channelId=UCSVLGuqttMcRdGrWnABlt3Q&part=snippet,id&order=date&maxResults=20');
app.constant('repertoireListApi', 'api/repertoire.json');
app.constant('postsListApi', 'api/blog/_posts.json');
app.constant('postsApi', 'api/blog/');
