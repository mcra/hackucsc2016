(function() {
  'use strict';

  /* Controllers */
  var mcraControllers = angular.module('mcraControllers', []);

  mcraControllers.controller('EventController', ['$scope', 'Event', '$filter', EventController]);

  function EventController($scope, Event, $filter) {
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

    mcraControllers.controller('EventDetailsController', function($scope, $http) {
      // TODO use services
      $http.get('assets/js/test-users.json').success(function(data) {
        $scope.users = data;
      });
      $http.get('assets/js/test-comments.json').success(function(data) {
        $scope.commentChain = data;
      });
      $scope.curUser = 'Erin Springer';
    });

})();
