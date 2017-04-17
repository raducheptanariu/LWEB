'use strict';

angular.module('app')
    .factory('youtubeService', ['$http', 'youtubeListApi', function ($http, youtubeListApi) {
        var factory = {};

        factory.getChannelVideos = function () {
            var request = $http({
                method: 'get',
                url: youtubeListApi,
            });

            return (request.then(handleSuccess, handleError));
        }

        function handleSuccess(response) {
            return response.data;
        };

        function handleError(err) {
            alert('err');
        }

        return factory;
    }])

;