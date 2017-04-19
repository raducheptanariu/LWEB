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
                        userId: userId,
                        limit: 20
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

    .directive('instaImagePopup', ['$uibModal', function ($uibModal) {
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
                    if (data) {
                        scope.youtubeModel = data;
                    }
                })
            }
        }
    }])

    .directive('youtubePlayerPopup', ['$uibModal', function ($uibModal) {
        return {
            restrict: 'A',
            scope: {
                youtubePlayerPopup: '='
            },
            link: function (scope, elm, attrs) {
                elm.on('click', function () {

                    var modalInstance = $uibModal.open({
                        controller: 'youtubePlayerPopupCtrl',
                        templateUrl: 'views/templates/youtubePlayerPopup.html',
                        resolve: {
                            model: function () { return scope.youtubePlayerPopup; }
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

    .directive('animationDirector', ['$rootScope', '$location', '$timeout', 'navigationLinks',
        function ($rootScope, $location, $timeout, navigationLinks) {
        return {
            restrict: 'E',
            scope: {
                animateClockwise: '='
            },
            link: function (scope, elm, attrs) {
                var animationIsSet = false;

                scope.$on('$locationChangeStart', function (event, targetUrl, currentUrl) {
                    if (!animationIsSet) {
                        animationIsSet = true;
                        if (targetUrl != currentUrl) {
                            if ($rootScope.title) {
                                // can also get from currentUrl
                                var current = $rootScope.title.toLowerCase();

                                var url = targetUrl.split('/');
                                var target = url[url.length - 1];
                                target = target != '' ? target : 'about';

                                var currentIndex = navigationLinks.indexOf(current);
                                var targetIndex = navigationLinks.indexOf(target);

                                if (currentIndex > -1 && targetIndex > -1) {

                                    if (currentIndex < targetIndex) {
                                        if (currentIndex == 0 && targetIndex == (navigationLinks.length - 1)) {
                                            scope.animateClockwise = true;
                                        }
                                        else {
                                            scope.animateClockwise = false;
                                        }
                                    }
                                    else {
                                        if (currentIndex == (navigationLinks.length - 1) && targetIndex == 0) {
                                            scope.animateClockwise = false;
                                        }
                                        else {
                                            scope.animateClockwise = true;
                                        }
                                    }
                                }
                            }

                            event.preventDefault();
                            $timeout(function () {
                                target = target != 'about' ? target : '';
                                $location.path(target);
                            });
                        }
                    }
                });

                scope.$on('$locationChangeSuccess', function (event, targetUrl, currentUrl) {
                    animationIsSet = false;
                });
            }
        }
        }])

    .directive('ngError', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            compile: function ($element, attr) {
                var fn = $parse(attr['ngError']);

                return function (scope, element, attr) {
                    element.on('error', function (event) {
                        scope.$apply(function () {
                            fn(scope, { $event: event });
                        });
                    });
                };

            }
        };

    }])

    .directive('onErrorSrc', function () {
        return {
            link: function (scope, element, attrs) {
                element.bind('error', function () {
                    if (attrs.src != attrs.onErrorSrc) {
                        attrs.$set('src', attrs.onErrorSrc);
                    }
                });
            }
        }
    })
;