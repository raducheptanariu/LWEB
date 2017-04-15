'use strict';

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('app.controllers', [])

    // Path: /about
    .controller('AboutCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'About';
        $scope.$on('$viewContentLoaded', function () {
            //$window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });

        var path = "content/img/slider/";
        $scope.slides = [];
        populateCarouselAsync(0);
        function populateCarouselAsync(index) {
            var imgPath = path + (index + 1) + ".jpg";

            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', imgPath, true);
            xhr.onload = function (event) {
                if (event.currentTarget.status == 200) {
                    $scope.$apply(function () {
                        $scope.slides.push({
                            image: imgPath,
                            id: index
                        });
                    });
                    populateCarouselAsync(index + 1);
                }
            }

            xhr.send();
        }


        //$scope.slides = [
        //    { image: 'content/img/slider/1.jpg', id: 0 },
        //    { image: 'content/img/slider/2.jpg', id: 1 }
        //];
    }])

    // Path: /gallery
    .controller('GalleryCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Gallery';
        $scope.$on('$viewContentLoaded', function () {
            //$window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
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