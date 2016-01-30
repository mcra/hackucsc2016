(function() {
  'use strict';

  /* Controllers */
  var mcraControllers = angular.module('mcraControllers', []);

  mcraControllers.controller('EventController', ['$scope', '$filter', EventController]);

  function EventController($scope, $filter) {
    $scope.title = "Get Bizzy";
    $scope.query = { name: '', location: '', date: '', };

    // TODO some test data; get from the API
    $scope.events = [
      { name: 'biking',
        location: 'here',
        date: 'today',
      },
      { name: 'surfing',
        location: 'there',
        date: 'tomorrow',
      },
      { name: 'dranks',
        location: 'the old bar',
        date: 'tomorrow',
      },
      { name: 'tai chi',
        location: 'park',
        date: 'tomorrow',
      },
    ];

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

})();
