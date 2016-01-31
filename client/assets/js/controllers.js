(function() {
  'use strict';

  /* Controllers */
  var mcraControllers = angular.module('mcraControllers', []);

  mcraControllers.controller('EventController', ['$scope', 'Event', '$filter', '$location', 'api', EventController]);

  function EventController($scope, Event, $filter, $location, api) {
    if (!api.init()) { $location.path('/login'); } // force log in
    $scope.title = "Get Bizzy";
    $scope.query = { name: '', location: '', datetime: '', };

    $scope.events = Event.query();
    $scope.filtered = $scope.events;

    $scope.makeQuery = function() {
      $scope.filtered = $filter('filter')($scope.events, $scope.query);
    };

    $scope.createEvent = function() {
      // TODO make sure all fields valid
      var act = angular.copy($scope.query); // copy of $scope.query
      // TODO for now, transform whatever into a datetime
      act.datetime = (new Date()).toISOString();
      $scope.query.datetime = act.datetime;
      Event.save(act); // post to api
      $scope.events.push(act); // TODO do if successfully saved
      $scope.makeQuery();
    };
  }

    mcraControllers.controller('FilterMenuCtrl', function FilterMenuCtrl($mdDialog) {
      var originatorEv;
      this.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
      };
      this.notificationsEnabled = true;
      this.toggleNotifications = function() {
        this.notificationsEnabled = !this.notificationsEnabled;
      };
      this.redial = function() {
        $mdDialog.show(
          $mdDialog.alert()
            .targetEvent(originatorEv)
            .clickOutsideToClose(true)
            .parent('body')
            .title('Suddenly, a redial')
            .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
            .ok('That was easy')
        );
        originatorEv = null;
      };
      });

    
    mcraControllers.controller('MainController', function($scope) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
    });

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
