// define controllers for app
var controllers = {};

controllers.d3Controller = function ($scope, $http, $location) {

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

controllers.threetierdonutChartController = function ($scope, $window) {
    var hacolor = "#445E83";
        var haprovider = "#660066";
        var hachinese = "#006633";
        // var hachinese = "#f28226";
        var red = "#800000";
        var green ="#32CD32";

    var myData = new Array();
    myData[0] =
    [
        {id:1, label:"Health Allianze", color:hacolor},
        {id:2, label:"divider", color:"#000000"},
        {id:3, label:"Health Allianze", color:hacolor},
        {id:4, label:"divider", color:"#000000"},
        {id:5, label:"Chinese", color:hachinese},
        {id:6, label:"divider", color:"#000000"},   
        {id:7, label:"Chinese", color:hachinese},
        {id:8, label:"divider", color:"#000000"},
        {id:9, label:"Chinese", color:hachinese},
        {id:10, label:"divider", color:"#000000"}
    ];

    myData[1] =
    [
        {id:1, label:"Provider", color:haprovider},
        {id:2, label:"divider", color:"#000000"},
        {id:3, label:"Provider", color:haprovider},
        {id:4, label:"divider", color:"#000000"},
        {id:5, label:"Health Allianze", color:hacolor},
        {id:6, label:"divider", color:"#000000"},   
        {id:7, label:"Chinese", color:hachinese},
        {id:8, label:"divider", color:"#000000"},
        {id:9, label:"Health Allianze", color:hacolor},
        {id:10, label:"divider", color:"#000000"}
    ];

    myData[3] =
    [
        {id:1, label:"Provider", color:haprovider},
        {id:2, label:"divider", color:"#000000"},
        {id:3, label:"Provider", color:hacolor},
        {id:4, label:"divider", color:"#000000"},
        {id:5, label:"Health Allianze", color:hachinese},
        {id:6, label:"divider", color:"#000000"},   
        {id:7, label:"Chinese", color:hacolor},
        {id:8, label:"divider", color:"#000000"},
        {id:9, label:"Health Allianze", color:haprovider},
        {id:10, label:"divider", color:"#000000"}
    ];

    
    init();
    function init() {       
        $scope.chart1 = "donut1";
        $scope.donut1 = myData[0];

        $scope.chart2 = "donut2"; 
        $scope.donut2 = myData[1];

        $scope.chart3 = "donut3"; 
        $scope.donut3 = myData[3];
    };

    

}

svgApp.controller(controllers); 
