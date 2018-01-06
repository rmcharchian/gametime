var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

/// Routes ///
myApp.config(function($mdThemingProvider, $routeProvider, $locationProvider) {
    $mdThemingProvider.disableTheming();
    $locationProvider.hashPrefix('');
    console.log('myApp -- config')
    $routeProvider
      .when('/events', {
        templateUrl: '/views/templates/events.html',
        controller: 'EventController as ec',
      });
  });