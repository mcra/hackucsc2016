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

    mcraControllers.controller('EventDetailsController', function($scope) {
      var users = [
      {
        pic: 'assets/images/hack.jpg',
        name: 'Aaron',
      },
      {
        pic: 'assets/images/face3.jpg',
        name: 'Rob',
      },
      {
        pic: 'assets/images/face2.jpg',
        name: 'Matt',
      },
      {
        pic: 'assets/images/face3.jpg',
        name: 'Chris',
      }]

      var commentChain = [ 
      {
        pic: 'assets/images/hack.jpg',
        who: 'Erin Springer',
        text: 'Primary Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litra torquent per conubia nostra, per inceptos himenaeos.'
      },
      {
        pic: 'assets/images/hack.jpg',
        who: 'Erin Springer',
        text: 'Seconday Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litra torquent per conubia nostra, per inceptos himenaeos.'
      },
      {
        pic: 'assets/images/face2.jpg',
        who: 'George Washington',
        text: 'Tertiary Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litra torquent per conubia nostra, per inceptos himenaeos.'
      },
      {
        pic: 'assets/images/hack.jpg',
        who: 'Erin Springer',
        text: 'Seconday Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litra torquent per conubia nostra, per inceptos himenaeos.'
      },
      {
        pic: 'assets/images/face2.jpg',
        who: 'George Washington',
        text: 'Tertiary Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litra torquent per conubia nostra, per inceptos himenaeos.'
      },

      {
        pic: 'assets/images/hack.jpg',
        who: 'Erin Springer',
        text: 'Seconday Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litra torquent per conubia nostra, per inceptos himenaeos.'
      },
      {
        pic: 'assets/images/face2.jpg',
        who: 'George Washington',
        text: 'Tertiary Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litra torquent per conubia nostra, per inceptos himenaeos.'
      },

      {
        pic: 'assets/images/hack.jpg',
        who: 'Erin Springer',
        text: 'Seconday Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litra torquent per conubia nostra, per inceptos himenaeos.'
      },
      {
        pic: 'assets/images/face2.jpg',
        who: 'George Washington',
        text: 'Tertiary Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litra torquent per conubia nostra, per inceptos himenaeos.'
      },

      {
        pic: 'assets/images/hack.jpg',
        who: 'Erin Springer',
        text: 'Seconday Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litra torquent per conubia nostra, per inceptos himenaeos.'
      },
      {
        pic: 'assets/images/face2.jpg',
        who: 'George Washington',
        text: 'Tertiary Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litra torquent per conubia nostra, per inceptos himenaeos.'
      },

      {
        pic: 'assets/images/face3.jpg',
        who: 'Abraham Drinkin',
        text: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litra torquent per conubia nostra, per inceptos himenaeos.'
      }];
      $scope.commentChain = commentChain;
      $scope.curUser = 'Erin Springer';
      $scope.users = users;
    });


})();
