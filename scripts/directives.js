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
            scope:{
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

    .directive('instaImageLoader', ['$uibModal', '$rootScope', function ($uibModal, $rootScope) {
        return {
            restrict: 'E',
            scope: {
                ngModel: '='
            },
            templateUrl: 'views/templates/instaImage.html',
            replace: true,
            link: function(scope, elm, attrs){
                scope.model = scope.ngModel;

                scope.openPopup = function () {

                    var modalInstance = $uibModal.open({
                        controller: 'instaImagePopupCtrl',
                        templateUrl: 'views/templates/instaImagePopup.html',
                        resolve: {
                            model: function () { return scope.model; }
                        }
                    });

                    var listener = scope.$on('$locationChangeStart', function (event) {
                        modalInstance.dismiss();
                        event.preventDefault();
                        listener();
                    });

                    modalInstance.result.then(function () { }, function () { });
                };

                elm.bind('mouseover', function (e) {
                    scope.$apply(function () {
                        scope.isHovering = true;
                    });
                });
                elm.bind('mouseleave', function (e) {
                    scope.$apply(function () {
                        scope.isHovering = false;
                    });
                })
            }
        }
    }])

    .directive('instaLoader', ['ngInstafeed', '$timeout', 'userId', function (ngInstafeed, $timeout, userId) {
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

                        $timeout(function(){
                            isProcessing = false;
                        }, 2000);
                    }
                });
            }
        }
    }])
;