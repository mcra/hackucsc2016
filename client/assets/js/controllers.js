(function() {
  'use strict';

  /* Controllers */
  var mcraControllers = angular.module('mcraControllers', []);

  mcraControllers.controller('EventController', ['$scope', 'Events', '$filter', '$location', 'api', EventController]);

  function EventController($scope, Events, $filter, $location, api) {
    if (!api.init()) { $location.path('/login'); } // force log in
    $scope.title = "Get Bizzy";
    $scope.query = { name: '', location: '', datetime: '', };
    $scope.sub = { group_size: 3, name: '', location: '', datetime: ''};
    $scope.showSearch = false;

    $scope.events = Events.query();
    $scope.filtered = $scope.events;

    $scope.makeQuery = function() {
      $scope.filtered = $filter('filter')($scope.events, $scope.searcher);
      $scope.sub.name = $scope.searcher;
    };

    $scope.createEvent = function() {
      // TODO make sure all fields valid
      var act = angular.copy($scope.query); // copy of $scope.query
      // TODO for now, transform whatever into a datetime
      act.datetime = (new Date()).toISOString();
      $scope.query.datetime = act.datetime;
      Events.save($scope.sub); // post to api
      $scope.events.push($scope.sub); // TODO do if successfully saved
      $scope.makeQuery();
      $scope.showSearch = false;
      $scope.searcher = '';
    };

    $scope.getDetail = function(id) {
      $location.path('/events/'+id);
    };

    $scope.myEvents = function() {
      $location.path('/mine');
    };
  }
    
  mcraControllers.controller('EventDetailsController', function($scope, $http, $routeParams, $location, api, Event, Members, Comments) {
    if (!api.init()) { $location.path('/login'); } // force log in

    var evtId = $routeParams.eventId;
    $scope.event = Event.query({id: evtId});
    $scope.users = Members.query({id: evtId});
    $scope.commentChain = Comments.query({id: evtId});
    $scope.postComment = function() {
      Comments.save({id: evtId, text: $scope.message});
    };
    // TODO make comment show immediately
    $scope.curUser = 'Erin Springer'; // TODO there is logic for styling around this
    $scope.goHome = function() { $location.path('/'); };
  });

  mcraControllers.controller('UserDetailsController', function($scope, User, UserEvents, $http, $routeParams, $location, api) {
    if (!api.init()) { $location.path('/login'); } // force log in
    $scope.details = User.query({userId: $routeParams.userId});
    $scope.events = UserEvents.query({userId: $routeParams.userId});
  });

  mcraControllers.controller('MyDetailsController', function($scope, MyEvents, $http, $routeParams, $location, api) {
    if (!api.init()) { $location.path('/login'); } // force log in
    MyEvents.query(function(res) {
      $scope.details = res.user;
      $scope.events = res.events;
    });
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
