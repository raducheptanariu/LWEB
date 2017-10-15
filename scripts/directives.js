'use strict';

angular.module('app')

    .directive('appVersion', ['version', function (version) {
        return function (scope, elm) {
            elm.text(version);
        };
    }])

    .directive('carouselLoader', ['$http', '$rootScope', '$window', function ($http, $rootScope, $window) {
        return {
            restrict: 'E',
            scope: {
                hideMobile: '@?'
            },
            templateUrl: 'views/templates/carousel.html',
            link: function (scope) {
                var watcher = scope.$watch(
                    function () {
                        return $window.innerWidth;
                    },
                    function () {
                        if ($window.innerWidth > 767 || !scope.hideMobile) {
                            if (!$rootScope.slides || $rootScope.slides.length == 0) {
                                scope.carouselSlides = [];
                                populateCarouselAsync(0);

                                function populateCarouselAsync(index) {
                                    var imgPath = "content/img/slider/" + (index + 1) + ".jpg";

                                    var xhr = new XMLHttpRequest();
                                    xhr.open('HEAD', imgPath, true);
                                    xhr.onload = function (event) {
                                        if (event.currentTarget.status == 200) {
                                            scope.$apply(function () {
                                                scope.carouselSlides.push({
                                                    image: imgPath,
                                                    id: index
                                                });
                                                scope.carouselReady = true;
                                            });
                                            $rootScope.slides = scope.carouselSlides;
                                            populateCarouselAsync(index + 1);
                                        }
                                    }

                                    xhr.send();
                                }
                            } else {
                                scope.carouselSlides = $rootScope.slides;
                                scope.carouselReady = true;
                            }

                            //deregistration
                            watcher();
                        }
                    });
            }
        }
    }])

    .directive('languageApplier', ['$translate', 'availableLangs', function ($translate, availableLangs) {
        return {
            restrict: 'E',
            templateUrl: 'views/templates/langDropdown.html',
            replace: true,
            link: function (scope) {
                scope.langs = availableLangs;
                scope.currentLang = $translate.use();
                scope.changeLang = function (lang) {
                    scope.currentLang = lang;
                    $translate.use(lang);
                };
            }
        }
    }])

    .directive('stickyOnScroll', ['$window', function ($window) {
        return {
            restrict: 'A',
            scope: {
                stickyOnScroll: '@',
                stickyClass: '@',
                stickyAdaptMargin: '@',
                stickyAdaptMarginMobile: '@'
            },
            link: function (scope, elm) {
                var newMargin, currentMargin, adapt;
                if ($window.innerWidth < 768) {
                    adapt = $('#' + scope.stickyAdaptMarginMobile);
                    currentMargin = parseInt(adapt.css('marginTop'));
                    newMargin = elm.height() + currentMargin - 30;
                    elm.addClass(scope.stickyClass);
                    adapt.css('marginTop', newMargin);
                }
                else {
                    var pixels = parseInt(scope.stickyOnScroll);
                    adapt = $('#' + scope.stickyAdaptMargin);
                    currentMargin = parseInt(adapt.css('marginTop'));
                    adapt.css('marginTop', scope.stickyMargin);
                    newMargin = elm.height() + currentMargin + 20;

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
            }
        };
    }])

    .directive('hoverApplier', [function () {
        return {
            restrict: 'A',
            scope: {
                hoverApplier: '=',
            },
            link: function (scope, elm) {
                elm.bind('mouseover', function () {
                    scope.$apply(function () {
                        scope.hoverApplier = true;
                    });
                });
                elm.bind('mouseleave', function () {
                    scope.$apply(function () {
                        scope.hoverApplier = false;
                    });
                });
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
            link: function (scope) {
                scope.instaModel = ngInstafeed.model;
                scope.instaState = ngInstafeed.state;

                if (ngInstafeed.model.data.length == 0) {
                    ngInstafeed.get({
                        get: 'user',
                        userId: userId,
                        limit: 20
                    },
                    function (err) {
                        if (err) throw err;
                    });
                }

                var isProcessing = false;
                $(window).scroll(function () {
                    if (!isProcessing && ($(window).scrollTop() + $(window).height() > $(document).height() - 300)) {
                        isProcessing = true;

                        ngInstafeed.more(function (err) {
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
            scope: {
                instaImagePopup: '='
            },
            link: function (scope, elm) {
                elm.on('click', function () {

                    var modalInstance = $uibModal.open({
                        controller: 'instaImagePopupCtrl',
                        templateUrl: 'views/templates/instaImagePopup.html',
                        resolve: {
                            model: function () { return scope.instaImagePopup; }
                        }
                    });

                    var listener = scope.$on('$stateChangeStart', function (event) {
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
            link: function (scope) {
                scope.youtubeModel = [];

                youtubeService.getChannelVideos().then(function (data) {
                    if (data) {
                        scope.youtubeModel = data;
                    }
                });
            }
        }
    }])

    .directive('youtubePlayerPopup', ['$uibModal', function ($uibModal) {
        return {
            restrict: 'A',
            scope: {
                youtubePlayerPopup: '='
            },
            link: function (scope, elm) {
                elm.on('click', function () {

                    var modalInstance = $uibModal.open({
                        controller: 'youtubePlayerPopupCtrl',
                        templateUrl: 'views/templates/youtubePlayerPopup.html',
                        resolve: {
                            model: function () { return scope.youtubePlayerPopup; }
                        }
                    });

                    var listener = scope.$on('$stateChangeStart', function (event) {
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

    .directive('animationDirector', ['$rootScope', '$state', '$timeout', 'navigationLinks',
        function ($rootScope, $state, $timeout, navigationLinks) {
            return {
                restrict: 'E',
                scope: {
                    animateClockwise: '=',
                    animationTarget: '@',
                    animateClockwiseClass: '@',
                    animateCounterClockwiseClass: '@'
                },
                link: function (scope) {
                    var animationIsSet = false;

                    scope.$on('$stateChangeStart', function (event, targetState, params) {
                        if (targetState && targetState.name == 'otherwise') return;

                        if (!animationIsSet) {
                            animationIsSet = true;
                            event.preventDefault();

                            var currentIndex = navigationLinks.indexOf($rootScope.title ? $rootScope.title.toLowerCase() : '');
                            var targetIndex = navigationLinks.indexOf(targetState.name);

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
                            else {
                                scope.animateClockwise = false;
                            }

                            var animatedTarget = $(scope.animationTarget);
                            if (scope.animateClockwise) {
                                animatedTarget.removeClass(scope.animateCounterClockwiseClass);
                                animatedTarget.addClass(scope.animateClockwiseClass);
                            } else {
                                animatedTarget.removeClass(scope.animateClockwiseClass);
                                animatedTarget.addClass(scope.animateCounterClockwiseClass);
                            }

                            $state.go(targetState.name, params);
                        }
                    });

                    scope.$on('$stateChangeSuccess', function () {
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

                return function (scope, element) {
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

    .directive('formWrapper', ['$timeout', 'emailConfig', function ($timeout, emailConfig) {
        return {
            restrict: 'A',
            scope: {
                hideForm: '='
            },
            link: function (scope, elm) {
                scope.hideForm = false;
                elm.on("submit", function (event) {
                    event.preventDefault();

                    var data = elm.serialize();

                    $.ajax({
                        url: "https://formspree.io/" + emailConfig,
                        method: "POST",
                        data: data,
                        dataType: "json"
                    });

                    scope.$apply(function () {
                        scope.hideForm = true;
                    });
                    $timeout(function () {
                        scope.$apply(function () {
                            scope.hideForm = false;
                        });
                    }, 10000);

                    elm[0].reset();
                });
            }
        }
    }])

    .directive('dirDisqus', ['$window', '$location', '$timeout', 'disqusShortname', function ($window, $location, $timeout, disqusShortname) {
        return {
            restrict: 'E',
            scope: {
                config: '='
            },
            template: '<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink"></a>',
            link: function (scope, elm) {

                scope.$watch('config', function () {
                    $timeout(configChanged, 1000);
                }, true);

                function configChanged() {

                    // Ensure that the disqus_identifier and disqus_url are both set, otherwise we will run in to identifier conflicts when using URLs with "#" in them
                    // see http://help.disqus.com/customer/portal/articles/662547-why-are-the-same-comments-showing-up-on-multiple-pages-
                    if (!scope.config.disqus_identifier) {
                        return;
                    }

                    var url = $location.absUrl();

                    $window.disqus_shortname = disqusShortname;
                    $window.disqus_identifier = scope.config.disqus_identifier;
                    $window.disqus_url = url;
                    $window.disqus_title = scope.config.disqus_title;
                    $window.disqus_category_id = scope.config.disqus_category_id;
                    $window.disqus_disable_mobile = scope.config.disqus_disable_mobile;
                    $window.disqus_config = function () {
                        this.language = scope.config.disqus_config_language;
                        this.page.remote_auth_s3 = scope.config.disqus_remote_auth_s3;
                        this.page.api_key = scope.config.disqus_api_key;
                        if (scope.config.disqus_on_ready) {
                            this.callbacks.onReady = [function () {
                                scope.config.disqus_on_ready();
                            }];
                        }
                    };

                    // Get the remote Disqus script and insert it into the DOM, but only if it not already loaded (as that will cause warnings)
                    if (!$window.DISQUS) {
                        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                        dsq.src = '//' + disqusShortname + '.disqus.com/embed.js';
                        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                    } else {
                        $window.DISQUS.reset({
                            reload: true,
                            config: function () {
                                this.page.identifier = scope.config.disqus_identifier;
                                this.page.url = url;
                                this.page.title = scope.config.disqus_title;
                                this.language = scope.config.disqus_config_language;
                                this.page.remote_auth_s3 = scope.config.disqus_remote_auth_s3;
                                this.page.api_key = scope.config.disqus_api_key;
                            }
                        });
                    }
                }

                scope.$on('$stateChangeStart', function () {
                    elm.remove();
                });
            }
        };
    }])

    .directive('collapseOnSwipe', [function () {
        return {
            restrict: 'A',
            link: function (scope, elm) {
                elm.swipe('swipeup', function () {
                    elm.collapse('hide');
                });

                elm.swipe({
                    swipeUp: function () {
                        elm.collapse('hide');
                    },
                    threshold: 100
                });
            }
        }
    }])

    .directive('sharethisLoader', ['shareThisApi', '$rootScope', '$location', function (shareThisApi, $rootScope, $location) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                if (!$rootScope.shareThisInit) {
                    var script = '<script type="text/javascript" src="' + shareThisApi + '"></script>';
                    var scriptElem = angular.element(script);
                    $rootScope.shareThisInit = true;
                    elm.append(scriptElem);
                } else if (window.__sharethis__) {
                    window.__sharethis__.href = $location.absUrl();
                    window.__sharethis__.initialize();
                }
            }
        }
    }])

    .directive('heightWatcher', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                $timeout(function () {
                    var currentHeight = elm[0].offsetHeight;
                    if (currentHeight > scope.$parent.maxHeight) {
                        scope.$parent.maxHeight = currentHeight;
                    }
                }, 300);
            }
        }
    }])
;