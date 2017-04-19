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
            return response.data;
        };

        function handleError(err) {
            alert('err');
        }

        return factory;
    }])

;