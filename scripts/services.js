'use strict';

angular.module('app')
    .factory('youtubeService', ['$http', '$q', 'youtubeListApi', function ($http, $q, youtubeListApi) {
        var factory = {};
        // cache
        var videos;

        factory.getChannelVideos = function () {
            if (!videos) {

                var request = $http({
                    method: 'get',
                    url: youtubeListApi,
                });

                return (request.then(handleSuccess, handleError));
            }
            else {
                var deferred = $q.defer();
                deferred.resolve(videos);
                return deferred.promise;
            }
        }

        function handleSuccess(response) {
            videos = response.data;
            return videos;
        };

        function handleError(err) {
            //alert('err');
        }

        return factory;
    }])

    .factory('repertoireService', ['$http', '$q', 'repertoireListApi', function ($http, $q, repertoireListApi) {
        var factory = {};
        var list;

        factory.getRepertoireList = function () {
            if (!list) {
                var request = $http({
                    method: 'get',
                    url: repertoireListApi,
                });

                return (request.then(handleSuccess, handleError));
            }
            else {
                var deferred = $q.defer();
                deferred.resolve(list);
                return deferred.promise;
            }
        }

        function handleSuccess(response) {
            list = response.data;
            return list;
        };

        function handleError(err) {
            //alert('err');
        }

        return factory;
    }])
;