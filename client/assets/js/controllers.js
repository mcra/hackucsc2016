(function() {
  'use strict';

  /* Controllers */
  var mcraControllers = angular.module('mcraControllers', []);

  mcraControllers.controller('EventController', ['$scope', 'Events', '$filter', '$location', 'api', EventController]);

  function EventController($scope, Events, $filter, $location, api) {
    if (!api.init()) { $location.path('/login'); } // force log in
    $scope.title = "Get Bizzy";
    $scope.query = { name: '', location: '', datetime: '', };

    $scope.events = Events.query();
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
      Events.save(act); // post to api
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

  mcraControllers.controller('EventDetailsController', function($scope, $http, $routeParams, $location, api, Event, Members, Comments) {
    if (!api.init()) { $location.path('/login'); } // force log in

    var evtId = $routeParams.eventId;
    $scope.event = Event.query({id: evtId});
    $scope.users = Members.query({id: evtId});
    $scope.commentChain = Comments.query({id: evtId});
    $scope.postComment = function() {
      Comments.save({id: evtId, text: $scope.message});
    };
    $scope.curUser = 'Erin Springer'; // TODO there is logic for styling around this
    $scope.goHome = function() { $location.path('/'); };
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
