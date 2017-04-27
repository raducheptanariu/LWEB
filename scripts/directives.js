'use strict';

angular.module('app')

    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }])

    .directive('carouselLoader', ['$http', '$rootScope', function ($http, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'views/templates/carousel.html',
            replace: true,
            link: function (scope, elm, attrs) {
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
                }
                else {
                    scope.carouselSlides = $rootScope.slides;
                    scope.carouselReady = true;
                }
            }
        }
    }])

    .directive('languageApplier', ['$translate', 'availableLangs', function ($translate, availableLangs) {
        return {
            restrict: 'E',
            templateUrl: 'views/templates/langDropdown.html',
            replace: true,
            link: function (scope, elm, attrs) {
                scope.langs = availableLangs;
                scope.currentLang = $translate.use();
                scope.changeLang = function (lang) {
                    scope.currentLang = lang;
                    $translate.use(lang);
                };
            }
        }
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
                                else {
                                    scope.animateClockwise = false;
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

    .directive('formWrapper', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope:{
                hideForm: '='
            },
            link: function (scope, elm, attrs) {
                scope.hideForm = false;
                elm.on("submit", function (event) {
                    event.preventDefault();

                    var data = elm.serialize();

                    $.ajax({
                        url: "https://formspree.io/raduchept@gmail.com",
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

    .directive('dirDisqus', ['$window', function ($window) {
        return {
            restrict: 'E',
            scope: {
                config: '='
            },
            template: '<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink"></a>',
            link: function (scope, elm, attrs) {

                scope.$watch('config', configChanged, true);

                function configChanged() {

                    // Ensure that the disqus_identifier and disqus_url are both set, otherwise we will run in to identifier conflicts when using URLs with "#" in them
                    // see http://help.disqus.com/customer/portal/articles/662547-why-are-the-same-comments-showing-up-on-multiple-pages-
                    if (!scope.config.disqus_shortname ||
                        !scope.config.disqus_identifier ||
                        !scope.config.disqus_url) {
                        return;
                    }

                    $window.disqus_shortname = scope.config.disqus_shortname;
                    $window.disqus_identifier = scope.config.disqus_identifier;
                    $window.disqus_url = scope.config.disqus_url;
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
                        dsq.src = '//' + scope.config.disqus_shortname + '.disqus.com/embed.js';
                        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                    } else {
                        $window.DISQUS.reset({
                            reload: true,
                            config: function () {
                                this.page.identifier = scope.config.disqus_identifier;
                                this.page.url = scope.config.disqus_url;
                                this.page.title = scope.config.disqus_title;
                                this.language = scope.config.disqus_config_language;
                                this.page.remote_auth_s3 = scope.config.disqus_remote_auth_s3;
                                this.page.api_key = scope.config.disqus_api_key;
                            }
                        });
                    }
                }

                scope.$on('$locationChangeStart', function () {
                    elm.remove();
                });
            }
        };
    }])
;