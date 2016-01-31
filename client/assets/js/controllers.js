(function() {
  'use strict';

  /* Controllers */
  var mcraControllers = angular.module('mcraControllers', []);

  mcraControllers.controller('EventController', ['$scope', 'Events', '$filter', '$location', 'api', EventController]);

  function EventController($scope, Events, $filter, $location, api) {
    if (!api.init()) { $location.path('/login'); } // force log in
    $scope.title = "Get Bizzy";
    $scope.query = { name: '', location: '', datetime: '', };
    $scope.sub = { group_size: 3, name: '', location: '', datetime: new Date()};
    $scope.showSearch = false;

    $scope.waiting = true; // waiting for events to load from API
    $scope.events = Events.query(function() {
      $scope.waiting = false;
    });
    $scope.filtered = $scope.events;

    $scope.makeQuery = function() {
      // process the search string to pull out location (TODO and time)
      var terms = $scope.searcher.split(/\s+at?\s?/);
      var ename = terms[0].trim();
      var elocation = terms[1];
      if (elocation) { elocation = elocation.trim(); }
      var qdict = {name: ename, location: elocation};
      $scope.filtered = $filter('filter')($scope.events, qdict);
      $scope.sub.name = ename;
      $scope.sub.location = elocation;
    };

    $scope.createEvent = function() {
      Events.save($scope.sub)
        .$promise.then(function(e) {
          $location.path('/events/' + e.id);
      }); // post to api
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
    
  mcraControllers.controller('EventDetailsController', function($scope, $http, $routeParams, $cookieStore, $location, $mdToast, api, Event, Members, Comments) {
    if (!api.init()) { $location.path('/login'); } // force log in
    var evtId = $routeParams.eventId;

    var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
    function sanitizePosition() {
      var current = $scope.toastPosition;
      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;
      last = angular.extend({},current);
    }
    $scope.toastPosition = angular.extend({},last);
    $scope.getToastPosition = function() {
      sanitizePosition();
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };
    $scope.flagToast = function() {
      $mdToast.show(
          $mdToast.simple()
          .textContent('This event has been flagged!')
          .position($scope.getToastPosition())
          .hideDelay(2000)
          );
    };

    $scope.event = Event.query({id: evtId});
    $scope.users = Members.query({id: evtId}, function(res) {
      $scope.joined = false;
      var cur = $cookieStore.get('username');
      for (var i=0; i<res.length; i++) {
        if (cur === res[i].username) {
          $scope.joined = true;
        }
      }
    });

    $scope.commentChain = Comments.query({id: evtId});
    $scope.postComment = function() {
      Comments.save({id: evtId, text: $scope.message})
        .$promise.then(function(e) {
          $scope.message = undefined;
          // TODO: api to return new comment list on post
          $scope.commentChain = Comments.query({id: evtId});
        });
    };
    $scope.curUser = 'Erin Springer'; // TODO there is logic for styling around this
    $scope.goHome = function() { $location.path('/'); };
    $scope.userDetail = function(id) {
      $location.path('/users/'+id);
    };
    $scope.join = function() {
      Event.join({id: evtId})
        .$promise.then(function(e) {
          // TODO: api to return new members list on join
          $scope.users = Members.query({id: evtId});
          $scope.joined = true;
        });
    };
    $scope.leave = function() {
      Event.leave({id: evtId});
      $location.path('/');
    };
  });

  mcraControllers.controller('UserDetailsController', function($scope, User, UserEvents, $http, $routeParams, $location, $mdToast, api) {
    if (!api.init()) { $location.path('/login'); } // force log in
    $scope.goHome = function() { $location.path('/'); };
    $scope.getDetail = function(id) {
      $location.path('/events/'+id);
    };

    var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
    function sanitizePosition() {
      var current = $scope.toastPosition;
      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;
      last = angular.extend({},current);
    }
    $scope.toastPosition = angular.extend({},last);
    $scope.getToastPosition = function() {
      sanitizePosition();
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };
    $scope.flagToast = function() {
      $mdToast.show(
          $mdToast.simple()
          .textContent('This user has been flagged!')
          .position($scope.getToastPosition())
          .hideDelay(2000)
          );
    };


    $scope.details = User.query({userId: $routeParams.userId});
    $scope.events = UserEvents.query({userId: $routeParams.userId});
  });

  mcraControllers.controller('MyDetailsController', function($scope, MyEvents, $http, $routeParams, $location, api) {
    if (!api.init()) { $location.path('/login'); } // force log in
    $scope.getDetail = function(id) {
      $location.path('/events/'+id);
    };
    $scope.goHome = function() { $location.path('/'); };

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
      $cookieStore.put('username', credentials.username);
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
      $cookieStore.remove('username');
      api.logout();
    };
});

})();
