var svgApp = angular.module ('svgApp', ['ngRoute']);


// define routes for app
svgApp.config(function ($routeProvider) {
    $routeProvider
        .when('/home',
            {
                controller: 'd3Controller',
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
        .when('/threetierdonut',
            {
                controller: 'threetierdonutChartController',
                templateUrl: 'app/partials/threetierdonutchart.html'
            })  
        .when('/other',
            {
                controller: 'd3Controller',
                templateUrl: 'app/partials/home.html'
            })     
        .otherwise({redirectTo: '/home' });
});