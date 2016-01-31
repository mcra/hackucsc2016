(function() {
  'use strict';

  /* Controllers */
  var mcraControllers = angular.module('mcraControllers', []);

  mcraControllers.controller('EventController', ['$scope', 'Event', '$filter', '$location', 'api', EventController]);

  function EventController($scope, Event, $filter, $location, api) {
    if (!api.init()) { $location.path('/login'); } // force log in
    $scope.title = "Get Bizzy";
    $scope.query = { name: '', location: '', date: '', };

    $scope.events = Event.query();
    $scope.filtered = $scope.events;

    $scope.makeQuery = function() {
      $scope.filtered = $filter('filter')($scope.events, $scope.query);
    };

    $scope.createEvent = function() {
      // TODO make sure all fields valid
      var act = angular.copy($scope.query); // copy of $scope.query
      $scope.events.push(act);
      $scope.makeQuery();
    };
  }

  mcraControllers.controller('EventDetailsController', function($scope, $http, $location, api) {
    if (!api.init()) { $location.path('/login'); } // force log in
    // TODO use services
    $http.get('assets/js/test-users.json').success(function(data) {
      $scope.users = data;
    });
    $http.get('assets/js/test-comments.json').success(function(data) {
      $scope.commentChain = data;
    });
    $scope.curUser = 'Erin Springer';
  });

  mcraControllers.controller('AuthController', function($scope, $location, $cookieStore, authorization, api) {
    $scope.title = 'Login'; // TODO
    $scope.api = api;
    $scope.errors = undefined;

    $scope.login = function() {
      var credentials = {
        username: this.username,
        password: this.password
      };
      var success = function(data) {
        var token = data.token;
        api.init(token);
        $cookieStore.put('token', token);
        $scope.errors = undefined;
        $location.path('/');
      };
      var error = function(e) {
        $scope.errors = e.non_field_errors;
      };
      authorization.login(credentials).success(success).error(error);
    };
    $scope.logout = function() {
      $cookieStore.remove('token');
      api.logout();
    };
});

})();
