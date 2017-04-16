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

                    scope.$on('$locationChangeStart', function (event) {
                        modalInstance.dismiss();
                        event.preventDefault();
                    });

                    modalInstance.result.then(function () { }, function () { });
                };
            }
        }
    }])

    .directive('instaLoader', ['ngInstafeed', function (ngInstafeed) {
        return {
            restrict: 'A',
            scope: {
                instaModel: '=',
                instaState: '='
            },
            link: function (scope, elm, attrs) {
                scope.instaModel = ngInstafeed.model;
                scope.instaState = ngInstafeed.state;

                ngInstafeed.get({
                    get: 'user',
                    userId: '1397192335'
                },
                    function (err, res) {
                        if (err) throw err;
                        console.log(res); // see what the data is like
                    });

                scope.loadMore = function () {
                    ngInstafeed.more(function (err, res) {
                        if (err) throw err;
                        console.log(res); // see what the data is like
                    })
                };
            }
        }
    }])
;