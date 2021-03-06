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


svgApp.directive('threeTierDonutChart', function () {

    function draw3DChart(scope, element) {
        var data = scope.data;
        var dataname = scope.dataname;
        var el = element[0];
        var width = el.clientWidth;
        var height = el.clientHeight;

        var svg = d3.select(el).append("svg").attr("width",700).attr("height",290);
        svg.append("g").attr("id",dataname);

        draw(dataname, randomData(data), 330, 150, 330, 110, 30, 0.4);
    }

    function draw (id, data, x /*center x*/, y/*center y*/, 
            rx/*radius x*/, ry/*radius y*/, h/*height*/, ir/*inner radius*/){
    
        var _data = d3.layout.pie().sort(null).value(function(d) {return d.value;})(data);
        
        var slices = d3.select("#"+id).append("g").attr("transform", "translate(" + x + "," + y + ")")
            .attr("class", "slices");
            
        slices.selectAll(".innerSlice").data(_data).enter().append("path").attr("class", "innerSlice")
            .style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
            .attr("d",function(d){ return pieInner(d, rx+0.5,ry+0.5, h, ir);})
            .each(function(d){this._current=d;});
        
        slices.selectAll(".topSlice").data(_data).enter().append("path").attr("class", "topSlice")
            .style("fill", function(d) { return d.data.color; })
            .style("stroke", function(d) { return d.data.color; })
            .attr("d",function(d){ return pieTop(d, rx, ry, ir);})
            .each(function(d){this._current=d;});
        
        slices.selectAll(".outerSlice").data(_data).enter().append("path").attr("class", "outerSlice")
            .style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
            .attr("d",function(d){ return pieOuter(d, rx-.5,ry-.5, h);})
            .each(function(d){this._current=d;});

        slices.selectAll(".percent").data(_data).enter().append("text").attr("class", "percent")
            .attr("x",function(d){ return 0.6*rx*Math.cos(0.5*(d.startAngle+d.endAngle));})
            .attr("y",function(d){ return 0.6*ry*Math.sin(0.5*(d.startAngle+d.endAngle));})
            .text(getPercent).each(function(d){this._current=d;});              
    }

    function pieTop(d, rx, ry, ir ){
        if(d.endAngle - d.startAngle == 0 ) return "M 0 0";
        var sx = rx*Math.cos(d.startAngle),
            sy = ry*Math.sin(d.startAngle),
            ex = rx*Math.cos(d.endAngle),
            ey = ry*Math.sin(d.endAngle);
            
        var ret =[];
        ret.push("M",sx,sy,"A",rx,ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0),"1",ex,ey,"L",ir*ex,ir*ey);
        ret.push("A",ir*rx,ir*ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0), "0",ir*sx,ir*sy,"z");
        return ret.join(" ");
    }

    function pieOuter(d, rx, ry, h ){
        var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
        var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);
        
        var sx = rx*Math.cos(startAngle),
            sy = ry*Math.sin(startAngle),
            ex = rx*Math.cos(endAngle),
            ey = ry*Math.sin(endAngle);
            
            var ret =[];
            ret.push("M",sx,h+sy,"A",rx,ry,"0 0 1",ex,h+ey,"L",ex,ey,"A",rx,ry,"0 0 0",sx,sy,"z");
            return ret.join(" ");
    }

    function pieInner(d, rx, ry, h, ir ){
        var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
        var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);
        
        var sx = ir*rx*Math.cos(startAngle),
            sy = ir*ry*Math.sin(startAngle),
            ex = ir*rx*Math.cos(endAngle),
            ey = ir*ry*Math.sin(endAngle);

            var ret =[];
            ret.push("M",sx, sy,"A",ir*rx,ir*ry,"0 0 1",ex,ey, "L",ex,h+ey,"A",ir*rx, ir*ry,"0 0 0",sx,h+sy,"z");
            return ret.join(" ");
    }

    function getPercent(d){
        return (d.endAngle-d.startAngle > 0.2 ? 
             d.data.label : '');

        // return (d.endAngle-d.startAngle > 0.2 ? 
        //      Math.round(1000*(d.endAngle-d.startAngle)/(Math.PI*2))/10+'%' : '');
    }   
    
    function transition(id, data, rx, ry, h, ir) {
        function arcTweenInner(a) {
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function(t) { return pieInner(i(t), rx+0.5, ry+0.5, h, ir);  };
        }
        function arcTweenTop(a) {
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function(t) { return pieTop(i(t), rx, ry, ir);  };
        }
        function arcTweenOuter(a) {
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function(t) { return pieOuter(i(t), rx-.5, ry-.5, h);  };
        }
        function textTweenX(a) {
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function(t) { return 0.6*rx*Math.cos(0.5*(i(t).startAngle+i(t).endAngle));  };
        }
        function textTweenY(a) {
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function(t) { return 0.6*rx*Math.sin(0.5*(i(t).startAngle+i(t).endAngle));  };
        }
        
        var _data = d3.layout.pie().sort(null).value(function(d) {return d.value;})(data);
        
        d3.select("#"+id).selectAll(".innerSlice").data(_data)
            .transition().duration(750).attrTween("d", arcTweenInner); 
            
        d3.select("#"+id).selectAll(".topSlice").data(_data)
            .transition().duration(750).attrTween("d", arcTweenTop); 
            
        d3.select("#"+id).selectAll(".outerSlice").data(_data)
            .transition().duration(750).attrTween("d", arcTweenOuter);  
            
        d3.select("#"+id).selectAll(".percent").data(_data).transition().duration(750)
            .attrTween("x",textTweenX).attrTween("y",textTweenY).text(getPercent);  
    }

    function randomData(data){
        return data.map(function(d){ 
            switch(d.id)
            {
                case 1:
                case 3:
                case 5:
                case 7:
                case 9:
                    var x = 280;
                    // var x = 1000*Math.random();
                    break;

                // case 2:
                //  var x = 300;
                //  // var x = 1000*Math.random();
                //  break;

                // case 3:
                //  var x = 200;
                //  // var x = 1000*Math.random();
                //  break;

                default:    
                    var x = 4;
            }
            // return {label:"", value:x, color:d.color};});
            return {label:d.label, value:x, color:d.color};});
    }


    return {
        restrict: 'E',
        link: draw3DChart,
        scope: {
            data: '=',
            dataname: '='
        }
    }
});
