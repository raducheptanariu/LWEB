'use strict';

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('app')

    // Path: /about
    .controller('AboutCtrl', ['$scope', '$rootScope', '$location', '$window', function ($scope, $rootScope, $location, $window) {
        $scope.$root.title = 'About';
        $scope.$on('$viewContentLoaded', function () {
            //$window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });

        if (!$rootScope.slides || $rootScope.slides.length == 0) {
            $rootScope.slides = [];
            populateCarouselAsync(0);
            function populateCarouselAsync(index) {
                var imgPath = "content/img/slider/" + (index + 1) + ".jpg";

                var xhr = new XMLHttpRequest();
                xhr.open('HEAD', imgPath, true);
                xhr.onload = function (event) {
                    if (event.currentTarget.status == 200) {
                        $scope.$apply(function () {
                            $rootScope.slides.push({
                                image: imgPath,
                                id: index
                            });
                            $scope.initCarousel = true;
                        });
                        $rootScope.slides = $scope.slides;
                        populateCarouselAsync(index + 1);
                    }
                }

                xhr.send();
            }
        }
        else {
            $scope.initCarousel = true;
        }
    }])

    // Path: /gallery
    .controller('GalleryCtrl', ['$scope', '$location', '$window', 'ngInstafeed', function ($scope, $location, $window, ngInstafeed) {
        $scope.$root.title = 'Gallery';
        $scope.$on('$viewContentLoaded', function () {
            //$window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });

        $scope.model = null;
        $scope.ngInstafeedModel = ngInstafeed.model;
        $scope.ngInstafeedState = ngInstafeed.state;
        ngInstafeed.get({
                get: 'user',
                userId: '1397192335',
            },
            function (err, res) {
                if(err) throw err;
                console.log(res); // see what the data is like
                $scope.model = res;
            });

        $scope.loadMore = function () {
            ngInstafeed.more(function (err, res) {
                if (err) throw err;
                console.log(res); // see what the data is like
                $scope.model = res;
            })
        };
    }])

    // Path: /Music
    .controller('MusicCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Music';
        $scope.$on('$viewContentLoaded', function () {
            //$window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /about
    .controller('RepertoireCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Repertoire';
        $scope.$on('$viewContentLoaded', function () {
            //$window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /contact
    .controller('ContactCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Contact';
        $scope.$on('$viewContentLoaded', function () {
            //$window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /blog
    .controller('BlogCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Blog';
        $scope.$on('$viewContentLoaded', function () {
            //$window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /error/404
    .controller('Error404Ctrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Error 404: Page Not Found';
        $scope.$on('$viewContentLoaded', function () {
            //$window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    //.controller('LocalCtrl', ['$scope', '$translate', function ($scope, $translate) {
    //    $scope.changeLanguage = function (key) {
    //        $translate.use(key);
    //    }
    //}])

;