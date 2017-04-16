'use strict';

angular.module('app')

    .filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }])

    .filter('instaResize', [function () {
        return function (text) {
            return String(text).replace('/c0.135.1080.1080', '');
        }
    }])

;