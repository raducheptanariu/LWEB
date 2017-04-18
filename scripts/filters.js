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

    .filter('intToInstaDate', [function () {
        return function (text) {
            var date = intToDate(text);
            var today = new Date();

            var timeDiff = Math.abs(today.getTime() - date.getTime());
            var daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

            if (daysDiff == 0) {
                return "Posted today";
            }
            else if (daysDiff == 1) {
                return "Posted 1 day ago";
            }
            else if (daysDiff <= 7) {
                return "Posted " + daysDiff + " days ago";
            }
            else {
                return "Posted on " + dateToStringMonths(date)
            }
        }
    }])



;

function intToDate(int) {
    var date = new Date(1000 * parseInt(int));

    return date;
}

function dateToStringMonths(date) {
    var monthNames = [
        "Jan", "Feb", "March",
        "April", "May", "June", "July",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}