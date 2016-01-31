(function() {
  'use strict';

  /* Services */
  var mcraServices = angular.module('mcraServices', ['ngResource', 'ngCookies']);

  mcraServices.factory('Events', ['$resource', EventsService]);
  function EventsService($resource) {
    return $resource('/api/events/', {}, {
      query: {method:'GET', params:{}, isArray:true},
    });
  }

  mcraServices.factory('Event', ['$resource', EventService]);
  function EventService($resource) {
    return $resource('/api/events/:id/', {}, {
      query: {method:'GET', params:{}, isArray:false},
    });
  }

  mcraServices.factory('Members', ['$resource', MembersService]);
  function MembersService($resource) {
    return $resource('/api/events/:id/members/', {}, {
    });
  }

  mcraServices.factory('Comments', ['$resource',
    function CommentsService($resource) {
      return $resource('/api/events/:id/comments/', {id: '@id'}, {
      });
    }
  ]);

  mcraServices.factory('authorization', function ($http) {
    var url = '/api/api-token-auth/';
    return {
      login: function(credentials) {
        return $http.post(url, credentials, {"Authorization":""});
      }
    };
  });

  mcraServices.factory('api', function ($http, $cookieStore) {
    return {
      init: function(token) {
        var t = token || $cookieStore.get('token');
        if (t) {
          $http.defaults.headers.common.Authorization = "Token " + t;
          return true;
        }
        else {
          $http.defaults.headers.common.Authorization = undefined;
          return false;
        }
      },
      logout: function() {
        $http.defaults.headers.common.Authorization = undefined;
      }
    };
  });

  /*
  mcraServices.factory('httpInterceptor', function httpInterceptor ($q, $window, $location) {
    console.log('intercept'); // TODO
    return function(promise) {
      var success = function(response) {
        console.log('success', response); // TODO
        return response;
      };
      var error = function(response) {
        console.log('error', response); // TODO
        if (response.status === 401) {
          $location.url('/login');
        }
        return $q.reject(response);
      };
      return promise.then(success, error);
    };
  });
  */

})();

