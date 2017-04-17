'use strict';

angular.module('app')

    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }])

    .directive('stickyOnScroll', [function () {
        return {
            restrict: 'A',
            scope: {
                stickyOnScroll: '@',
                stickyClass: '@',
                stickyAdaptMargin: '@'
            },
            link: function (scope, elm, attrs) {
                var pixels = parseInt(scope.stickyOnScroll);
                var adapt = $('#' + scope.stickyAdaptMargin);
                var currentMargin = parseInt(adapt.css('marginTop'));
                adapt.css('marginTop', scope.stickyMargin);
                var newMargin = elm.height() + currentMargin + 20;

                $(window).scroll(function () {
                    if ($(window).scrollTop() > pixels) {
                        adapt.css('marginTop', newMargin);
                        elm.addClass(scope.stickyClass);
                    }
                    if ($(window).scrollTop() < pixels + 1) {
                        adapt.css('marginTop', 0);
                        elm.removeClass(scope.stickyClass);
                    }
                });
            }
        };
    }])

    .directive('hoverApplier', [function () {
        return {
            restrict: 'A',
            scope: {
                hoverApplier: '=',
            },
            link: function (scope, elm, attrs) {
                elm.bind('mouseover', function (e) {
                    scope.$apply(function () {
                        scope.hoverApplier = true;
                    });
                });
                elm.bind('mouseleave', function (e) {
                    scope.$apply(function () {
                        scope.hoverApplier = false;
                    });
                })
            }
        }
    }])

    .directive('instaModelLoader', ['ngInstafeed', '$timeout', 'userId', function (ngInstafeed, $timeout, userId) {
        return {
            restrict: 'A',
            scope: {
                instaModel: '=',
                instaState: '='
            },
            link: function (scope, elm, attrs) {
                scope.instaModel = ngInstafeed.model;
                scope.instaState = ngInstafeed.state;

                if (ngInstafeed.model.data.length == 0) {
                    ngInstafeed.get({
                        get: 'user',
                        userId: userId
                    },
                    function (err, res) {
                        if (err) throw err;
                    });
                }

                var isProcessing = false;
                $(window).scroll(function () {
                    if (!isProcessing && ($(window).scrollTop() + $(window).height() > $(document).height() - 300)) {
                        isProcessing = true;

                        ngInstafeed.more(function (err, res) {
                            if (err) throw err;
                            isProcessing = false;
                        });

                        $timeout(function () {
                            isProcessing = false;
                        }, 2000);
                    }
                });
            }
        }
    }])

    .directive('instaImagePopup', ['$uibModal', '$rootScope', function ($uibModal, $rootScope) {
        return {
            restrict: 'A',
            scope:{
                instaImagePopup: '='
            },
            link: function (scope, elm, attrs) {
                elm.on('click', function () {

                    var modalInstance = $uibModal.open({
                        controller: 'instaImagePopupCtrl',
                        templateUrl: 'views/templates/instaImagePopup.html',
                        resolve: {
                            model: function () { return scope.instaImagePopup; }
                        }
                    });

                    var listener = scope.$on('$locationChangeStart', function (event) {
                        listener();
                        modalInstance.dismiss();
                        event.preventDefault();
                    });

                    modalInstance.result.then(function () {
                        listener();
                    }, function () {
                        listener();
                    });
                });
            }
        }
    }])

    .directive('youtubeModelLoader', ['youtubeService', function (youtubeService) {
        return {
            restrict: 'A',
            scope: {
                youtubeModel: '='
            },
            replace: true,
            link: function (scope, elm, attrs) {
                scope.youtubeModel = [];

                youtubeService.getChannelVideos().then(function (data) {
                    if (data && data) {
                        scope.youtubeModel = data;
                        console.log(data);
                    }
                })
            }
        }
    }])
;