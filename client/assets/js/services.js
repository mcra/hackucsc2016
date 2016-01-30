(function() {
  'use strict';

  /* Services */
  var mcraServices = angular.module('mcraServices', ['ngResource']);

  mcraServices.factory('Event', ['$resource', EventService]);

  function EventService($resource) {
    return $resource('assets/js/test-events.json', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }

})();

