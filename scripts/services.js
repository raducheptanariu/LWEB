'use strict';

angular.module('app')
    .factory('instagramService', ['$http', 'instagramLikeApi', 'instagramToken', function ($http, instagramLikeApi, instagramToken) {
        var factory = {};

        //factory.postLike4 = function(mediaId) {
        //    var url = instagramLikeApi.replace('{media-id}', mediaId);

        //    var data = {
        //        access_token: instagramToken
        //    };

        //    var request = $http({
        //        method: 'post',
        //        url: url,
        //        data: data
        //    });

        //    return (request.then(handleSuccess, handleError));
        //};

        //factory.postLike3 = function (mediaId) {
        //    $.ajax({
        //        url: instagramLikeApi.replace('{media-id}', mediaId),
        //        type: 'POST',
        //        data: { access_token: instagramToken },
        //        //dataType: 'jsonp',
        //        success: function (response) {
        //            console.log(response);
        //        }
        //    });
        //};

        //factory.postLike2 = function (mediaId) {
        //    var url = instagramLikeApi.replace('{media-id}', mediaId) + "?access_token=" + instagramToken + '&callback=?';

        //    $.getJSON(url, function (data) {
        //            console.log(data);
        //        }
        //    );
        //};

        factory.postLike = function(mediaId) {
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "https://api.instagram.com/v1/media/" + mediaId + "/likes?access_token=" + instagramToken,
                //data: {
                //    access_token: instagramToken,
                //    _method: 'POST'
                //},
                success: function (data, textStatus, jqXHR) {
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }

        function handleSuccess(response) {
            return response;
        };

        function handleError(err) {
            console.log(err);
        }

        return factory;
    }])

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

        function handleError() {
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

        function handleError() {
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
                        postsList = response.data.sort(function (a, b) {
                            return new Date(b.date) - new Date(a.date);
                        });
                        return postsList;
                    }, handleError));
            }
            else {
                return deferResult(postsList);
            }
        }

        factory.getPostContent = function (name) {
            if (!postsContent[name]) {
                var request = $http({
                    method: 'get',
                    url: postsApi + name
                });

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
                return deferResult(postsContent[name]);
            }
        };

        factory.getOlderPostName = function (name) {
            if (!postsList) {
                return factory.getPosts().then(function (response){
                    for (var i = 0; i < postsList.length - 1; i++) {
                        if (postsList[i].name == name) {
                            return postsList[i + 1].name;
                        }
                    }
                    return null;
                }, handleError);
            }
            else {
                var post = null;

                for (var i = 0; i < postsList.length - 1; i++) {
                    if (postsList[i].name == name) {
                        post = postsList[i + 1].name;
                        break;
                    }
                }

                return deferResult(post);
            }
        };

        factory.getNewerPostName = function (name) {
            if (!postsList) {
                return factory.getPosts().then(function (response) {
                    for (var i = 1; i < postsList.length; i++) {
                        if (postsList[i].name == name) {
                            return postsList[i - 1].name;
                        }
                    }
                    return null;
                }, handleError);
            }
            else {
                var post = null;

                for (var i = 1; i < postsList.length; i++) {
                    if (postsList[i].name == name) {
                        post = postsList[i - 1].name;
                        break;
                    }
                }

                return deferResult(post);
            }
        }

        function deferResult(value) {
            var deferred = $q.defer();
            deferred.resolve(value);
            return deferred.promise;
        }

        function handleError() {
            //alert('err');
        }

        return factory;
    }])

    .factory('cloudnoService', ['$http', '$q', 'cloudnoApi', function ($http, $q, cloudnoApi) {
        var factory = {};

        factory.getResponse = function (imageId) {
            var requestUrl = cloudnoApi + '?id=' + imageId;
            var request = $http({
                method: 'get',
                url: requestUrl,
            });

            return (request.then(handleSuccess, handleError));
        };

        function handleSuccess(response) {
            return response;
        };

        function handleError() {
            //alert('err');
        }

        return factory;
    }])
;