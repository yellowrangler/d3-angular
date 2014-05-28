var svgApp = angular.module ('svgApp', ['ngRoute']);


// define routes for app
svgApp.config(function ($routeProvider) {
    $routeProvider
        .when('/home',
            {
                controller: 'svgController',
                templateUrl: 'app/partials/home.html'
            })  
        .when('/simplepie',
            {
                controller: 'simplepieController',
                templateUrl: 'app/partials/simplepiechart.html'
            })  
        .when('/donut',
            {
                controller: 'donutChartController',
                templateUrl: 'app/partials/donut.html'
            })  
        .when('/other',
            {
                controller: 'svgController',
                templateUrl: 'app/partials/home.html'
            })     
        .otherwise({redirectTo: '/home' });
});