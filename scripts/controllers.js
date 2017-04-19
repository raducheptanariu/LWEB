'use strict';

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('app')

    .controller('IndexCtrl', ['$scope', '$location', 'facebookLink', 'youtubeLink', 'twitterLink', 'instagramLink', 'navigationLinks',
        function ($scope, $location, facebookLink, youtubeLink, twitterLink, instagramLink, navigationLinks) {
            $scope.facebookLink = facebookLink;
            $scope.youtubeLink = youtubeLink;
            $scope.twitterLink = twitterLink;
            $scope.instagramLink = instagramLink;

            $scope.title = $scope.$root.title;

            $scope.changeLocation = function (direction) {
                var current = $scope.$root.title.toLowerCase();
                var currentIndex = navigationLinks.indexOf(current);
                var target;

                if (currentIndex > -1) {
                    if (direction > 0) {
                        /* go right */
                        if (currentIndex == (navigationLinks.length - 1)) {
                            target = navigationLinks[0];
                        }
                        else {
                            target = navigationLinks[currentIndex + 1];
                        }
                    }
                    else if (direction < 0) {
                        /* go left */
                        if (currentIndex == 0) {
                            target = navigationLinks[navigationLinks.length - 1];
                        }
                        else {
                            target = navigationLinks[currentIndex - 1];
                        }
                    }

                    $location.path(target);
                }
            }
    }])

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

    .controller('instaImagePopupCtrl', ['$scope', '$uibModalInstance', 'model', function ($scope, $uibModalInstance, model) {
        $scope.model = model;

        $scope.close = function () {
            $uibModalInstance.dismiss('close');
        }
    }])

    .controller('youtubePlayerPopupCtrl', ['$scope', '$uibModalInstance', 'model', function ($scope, $uibModalInstance, model) {
        $scope.model = model;

        $scope.close = function () {
            $uibModalInstance.dismiss('close');
        }
    }])

    //.controller('LocalCtrl', ['$scope', '$translate', function ($scope, $translate) {
    //    $scope.changeLanguage = function (key) {
    //        $translate.use(key);
    //    }
    //}])

;