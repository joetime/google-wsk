'use strict';

angular.module('MyWebApp', [
    'myDirective',
    'pageController'
  ]).config(function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true
    });
  });