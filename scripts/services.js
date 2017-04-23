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

    .factory('blogService', ['$http', '$q', 'postsListApi', 'postsApi', function ($http, $q, postsListApi, postsApi) {
        var factory = {};

        var postsList;
        var postsContent = {};

        factory.getPosts = function () {
            if (!postsList) {
                var request = $http({
                    method: 'get',
                    url: postsListApi,
                });

                return (request.then(
                    function handleSuccess(response) {
                        postsList = response.data;
                        return postsList;
                    }, handleError));
            }
            else {
                var deferred = $q.defer();
                deferred.resolve(postsList);
                return deferred.promise;
            }
        }

        factory.getPostContent = function (name) {
            if (!postsContent[name]) {
                var request = $http({
                    method: 'get',
                    url: postsApi + name
                });

                //var list = factory.getPosts();

                return $q.all([factory.getPosts(), request]).then(
                    function (response) {

                        var matchingPost = postsList.filter(function (item) {
                            if (item.name == name) return true;
                            return false;
                        });

                        postsContent[name] = response[1].data;
                        postsContent[name].content.name = name;
                        if (matchingPost && matchingPost.date) {
                            postsContent[name].content.date = matchingPost.date;
                        }

                        return postsContent[name];
                    }, handleError);
            }
            else {
                var deferred = $q.defer();
                deferred.resolve(postsContent[name]);
                return deferred.promise;
            }
        };

        function handleError(err) {
            //alert('err');
        }

        return factory;
    }])
;