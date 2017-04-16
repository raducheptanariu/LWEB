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

    .filter('instaResizeOrig', [function () {
        return function (text) {
            return String(text).replace('/s640x640/sh0.08/e35/c0.135.1080.1080', '');
        }
    }])

;