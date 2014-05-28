svgApp.directive('donutChart', function () {

    function drawChart(scope, element) {
        var data = scope.data;
        var duration = 200;
        var color = d3.scale.category10();
        var el = element[0];
        var width = el.clientWidth;
        var height = el.clientHeight;
        var min = Math.min(width, height);
        var pie = d3.layout.pie().sort(null);
        var arc = d3.svg.arc()
            .outerRadius(min / 2 * 0.9)
            .innerRadius(min / 2 * 0.5);
        var svg = d3.select(el).append('svg');
        var g = svg.append('g');

        var arcs = g.selectAll('path');  

        //
        // watch for changes to size (width * height) if changed do function following watch
        //
        scope.$watch(function() {
            return el.clientWidth * el.clientHeight
        }, function() {
            width = el.clientWidth;
            height = el.clientHeight;

            min = Math.min(width, height);
            arc.outerRadius(min / 2 * 0.9).innerRadius(min / 2 * 0.5);

            svg.attr({width: width, height: height});
            svg.selectAll('path').attr('d', arc)    
            g.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');  
        })

        function arcTween(a)
        {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) {
                return arc(i(t));
            };
        }

        scope.$watch('data', function (data) 
        {
            arcs = arcs.data(pie(data));
            
            arcs.transition()
                .duration(duration)
                .attrTween('d', arcTween);

            arcs.enter()
                .append('path')
                .style('stroke', 'white')
                .attr('fill', function (d, i) { return color(i) })
                .each(function (d) {
                    this._current = { startAngle: 2 * Math.PI - 0.001, endAngle: 2 * Math.PI }
                })
                .transition()
                .duration(duration)
                .attrTween('d', arcTween);

            arcs.exit()
                .transition()
                .duration(duration)
                .each(function (d) {
                    d.startAngle = 2 * Math.PI - 0.001; d.endAngle = 2 * Math.PI;
                })
                .attrTween('d', arcTween).remove();
        })

        svg.on('mousedown', function () {
            scope.$apply(function () {
                var num = Math.round(Math.random() * 10 ) + 1;
                scope.data = d3.range(num).map(Math.random);
            })
        })
      
    }
    return {
        restrict: 'E',
        link: drawChart,
        scope: {
            data: '='
        }
    }
});
