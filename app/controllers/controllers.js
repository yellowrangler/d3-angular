// define controllers for app
var controllers = {};

controllers.simplepieController = function ($scope, $http, $location) {

    init();
    function init() {
       drawSimplePie();
    };
}

controllers.donutChartController = function ($scope, $window) {

    init();
    function init() {
        $scope.charts = d3.range(10).map(function() {
            return d3.range(10).map(Math.random);
        })

        $scope.shared = {
            ourData: d3.range(10).map(Math.random)
        };

        angular.element($window).on('resize', function () {
            //
            // if resize tell angular to check for changes (or watch)
            //
            $scope.$apply();
        });
       
    };

}

svgApp.controller(controllers); 
