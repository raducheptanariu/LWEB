'use strict';

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('app')

    .controller('IndexCtrl', ['$scope', '$location', 'facebookLink', 'youtubeLink', 'twitterLink', 'instagramLink', 'navigationLinks', '$state',
    function ($scope, $location, facebookLink, youtubeLink, twitterLink, instagramLink, navigationLinks, $state) {
        $scope.facebookLink = facebookLink;
        $scope.youtubeLink = youtubeLink;
        $scope.twitterLink = twitterLink;
        $scope.instagramLink = instagramLink;

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
                else {
                    /* go left */
                    if (currentIndex == 0) {
                        target = navigationLinks[navigationLinks.length - 1];
                    }
                    else {
                        target = navigationLinks[currentIndex - 1];
                    }
                }

                var params = {};
                $state.go(target, params);
            }
        }
    }])

    // Path: /about
    .controller('AboutCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'About';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
            
        $scope.disqusConfig = {
            disqus_identifier: 'About',
        };
    }])

    // Path: /gallery
    .controller('GalleryCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Gallery';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /Music
    .controller('MusicCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Music';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /about
    .controller('RepertoireCtrl', ['$scope', '$location', '$window', 'repertoireService',
        function ($scope, $location, $window, repertoireService) {
        $scope.$root.title = 'Repertoire';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });

        repertoireService.getRepertoireList().then(function (response) {
            $scope.repertoireList = response;
        });
    }])

    // Path: /contact
    .controller('ContactCtrl', ['$scope', '$location', '$window', 'phoneConfig', 'emailConfig', function ($scope, $location, $window, phoneConfig, emailConfig) {
        $scope.$root.title = 'Contact';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });

        $scope.myPhone = phoneConfig;
        $scope.myEmail = emailConfig;
    }])

    // Path: /blog
    .controller('BlogCtrl', ['$scope', '$location', '$window', '$state', 'blogService', function ($scope, $location, $window, $state, blogService) {
        $scope.$root.title = 'Blog';
        $scope.$on('$viewContentLoaded', function () {
            //$window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });

        var postsList;
        $scope.posts = [];

        blogService.getPosts().then(function (response) {
            postsList = response;

            if (postsList.length == 1) {
                $state.go('blogpost', { name: postsList[0].name });
            } else {
                for (var i = 0; i < postsList.length; i++) {
                    var name = postsList[i].name;

                    blogService.getPostContent(name).then(function (response) {
                        var post = response.content;

                        $scope.posts.push(post);
                    });
                };
            }
        });
    }])

    // Path: /blogpost&name=
    .controller('BlogPostCtrl', ['$scope', '$location', '$window', 'blogService', '$stateParams',
        function ($scope, $location, $window, blogService, $stateParams) {
        $scope.$root.title = 'Blog';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });

        });

        var name = $stateParams.name

        $scope.disqusConfig = {
            disqus_identifier: name,
        };

        blogService.getPostContent(name).then(function (response) {
            $scope.post = response.content;
        });

        blogService.getOlderPostName(name).then(function (response) {
            $scope.olderPost = response;
        });

        blogService.getNewerPostName(name).then(function (response) {
            $scope.newerPost = response;
        });
    }])

    // Path: /error/404
    .controller('Error404Ctrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Error 404: Page Not Found';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
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

;