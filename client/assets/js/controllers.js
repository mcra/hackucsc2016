(function() {
  'use strict';

  /* Controllers */
  var mcraControllers = angular.module('mcraControllers', []);

  mcraControllers.controller('EventController', ['$scope', '$http', '$filter', EventController]);

  function EventController($scope, $http, $filter) {
    $scope.title = "Get Bizzy";
    $scope.query = { name: '', location: '', date: '', };

    // TODO some test data; get from the API
    $http.get('assets/js/test-events.json').success(function(data) {
      $scope.events = data;
      $scope.filtered = $scope.events;
    });

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

})();
