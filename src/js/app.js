
var App = angular.module('App', ['ngRoute','ui']);

App.controller('ctrlMain', function($scope) {
    $scope.message = 'Hello. World.';
});

App.controller('ctrlAbout', function($scope) {
    $scope.message = 'Hello. About.';
});

App.controller('ctrlContact', function($scope) {
    $scope.message = 'Hello. Contact.';
});

// configure our routes
App.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'ctrlMain'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'ctrlAbout'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'ctrlContact'
        });
});

