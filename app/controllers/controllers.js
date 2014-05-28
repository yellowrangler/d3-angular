// define controllers for app
var controllers = {};

controllers.svgController = function ($scope, $http, $location) {

    init();
    function init() {
       
    };

}

controllers.simplepieController = function ($scope, $http, $location) {

    init();
    function init() {
       drawSimplePie();
    };

}

controllers.threedpieController = function ($scope, $http, $location) {

    var salesData=[
        {label:"color", color:"#3366CC"},
        {label:"Plus", color:"#DC3912"},
        {label:"Lite", color:"#FF9900"},
        {label:"Elite", color:"#109618"},
        {label:"Delux", color:"#990099"}
    ];

    var svg = d3.select("tdpc").append("svg").attr("width",700).attr("height",300);

    init();
    function init() {
        svg.append("g").attr("id","salesDonut");
        svg.append("g").attr("id","quotesDonut");

        Donut3D.draw("salesDonut", randomData(), 150, 150, 130, 100, 30, 0.4);
        Donut3D.draw("quotesDonut", randomData(), 450, 150, 130, 100, 30, 0);
    };

    //
    // 3D pie chart
    //
    $scope.changeData = function (){
      Donut3D.transition("salesDonut", randomData(), 130, 100, 30, 0.4);
      Donut3D.transition("quotesDonut", randomData(), 130, 100, 30, 0);
    }

    function randomData(){
      return salesData.map(function(d){ 
        return {label:d.label, value:1000*Math.random(), color:d.color};});
    }
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
