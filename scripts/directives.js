'use strict';

angular.module('app.directives', [])

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
                stickyHeight: '=',
                stickyAdaptMargin: '@'
            },
            link: function (scope, elm, attrs) {
                var pixels = parseInt(scope.stickyOnScroll);
                var adapt = $('#' + scope.stickyAdaptMargin);
                adapt.css('marginTop', scope.stickyMargin);
                var height = elm.height() + 20;

                $(window).scroll(function () {
                    if ($(window).scrollTop() > pixels) {
                        adapt.css('marginTop', height);
                        elm.addClass(scope.stickyClass);
                        //scope.$apply(function () {
                        //    scope.stickyHeight = elm.height();
                        //});
                    }
                    if ($(window).scrollTop() < pixels + 1) {
                        adapt.css('marginTop', 0);
                        elm.removeClass(scope.stickyClass);
                        //scope.$apply(function () {
                        //    scope.stickyHeight = 0;
                        //});
                    }
                });
            }
        };
    }])

    .directive('stickyMargin', [function () {
        return {
            restrict: 'A',
            scope: {
                stickyMargin: '='
            },
            link: function (scope, elm, attrs) {
                var initMargin = elm[0].style.marginTop;

                scope.$watch(
                    function () {
                        return scope.stickyMargin;
                    },
                    function () {
                        elm.css('marginTop', scope.stickyMargin);
                    });
            }
        }
    }])

;