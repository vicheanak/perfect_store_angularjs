function dashboardCtrl($scope, NgMap, $sce, $document) {

    var data1 = [
    [gd(2012, 1, 1), 7],
    [gd(2012, 1, 2), 6],
    [gd(2012, 1, 3), 4],
    [gd(2012, 1, 4), 8],
    [gd(2012, 1, 5), 9],
    [gd(2012, 1, 6), 7],
    [gd(2012, 1, 7), 5],
    [gd(2012, 1, 8), 4],
    [gd(2012, 1, 9), 7],
    [gd(2012, 1, 10), 8],
    [gd(2012, 1, 11), 9],
    [gd(2012, 1, 12), 6],
    [gd(2012, 1, 13), 4],
    [gd(2012, 1, 14), 5],
    [gd(2012, 1, 15), 11],
    [gd(2012, 1, 16), 8],
    [gd(2012, 1, 17), 8],
    [gd(2012, 1, 18), 11],
    [gd(2012, 1, 19), 11],
    [gd(2012, 1, 20), 6],
    [gd(2012, 1, 21), 6],
    [gd(2012, 1, 22), 8],
    [gd(2012, 1, 23), 11],
    [gd(2012, 1, 24), 13],
    [gd(2012, 1, 25), 7],
    [gd(2012, 1, 26), 9],
    [gd(2012, 1, 27), 9],
    [gd(2012, 1, 28), 8],
    [gd(2012, 1, 29), 5],
    [gd(2012, 1, 30), 8],
    [gd(2012, 1, 31), 25]
    ];

    var data2 = [
    [gd(2012, 1, 1), 800],
    [gd(2012, 1, 2), 500],
    [gd(2012, 1, 3), 600],
    [gd(2012, 1, 4), 700],
    [gd(2012, 1, 5), 500],
    [gd(2012, 1, 6), 456],
    [gd(2012, 1, 7), 800],
    [gd(2012, 1, 8), 589],
    [gd(2012, 1, 9), 467],
    [gd(2012, 1, 10), 876],
    [gd(2012, 1, 11), 689],
    [gd(2012, 1, 12), 700],
    [gd(2012, 1, 13), 500],
    [gd(2012, 1, 14), 600],
    [gd(2012, 1, 15), 700],
    [gd(2012, 1, 16), 786],
    [gd(2012, 1, 17), 345],
    [gd(2012, 1, 18), 888],
    [gd(2012, 1, 19), 888],
    [gd(2012, 1, 20), 888],
    [gd(2012, 1, 21), 987],
    [gd(2012, 1, 22), 444],
    [gd(2012, 1, 23), 999],
    [gd(2012, 1, 24), 567],
    [gd(2012, 1, 25), 786],
    [gd(2012, 1, 26), 666],
    [gd(2012, 1, 27), 888],
    [gd(2012, 1, 28), 900],
    [gd(2012, 1, 29), 178],
    [gd(2012, 1, 30), 555],
    [gd(2012, 1, 31), 993]
    ];


    var dataset = [
    {
        label: "Number of orders",
        grow:{stepMode:"linear"},
        data: data2,
        color: "#1ab394",
        bars: {
            show: true,
            align: "center",
            barWidth: 24 * 60 * 60 * 600,
            lineWidth: 0
        }

    },
    {
        label: "Payments",
        grow:{stepMode:"linear"},
        data: data1,
        yaxis: 2,
        color: "#1C84C6",
        lines: {
            lineWidth: 1,
            show: true,
            fill: true,
            fillColor: {
                colors: [
                {
                    opacity: 0.2
                },
                {
                    opacity: 0.2
                }
                ]
            }
        }
    }
    ];


    var options = {
        grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#d5d5d5",
            borderWidth: 0,
            color: '#d5d5d5'
        },
        colors: ["#1ab394", "#464f88"],
        tooltip: true,
        xaxis: {
            mode: "time",
            tickSize: [3, "day"],
            tickLength: 0,
            axisLabel: "Date",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Arial',
            axisLabelPadding: 10,
            color: "#d5d5d5"
        },
        yaxes: [
        {
            position: "left",
            max: 1070,
            color: "#d5d5d5",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Arial',
            axisLabelPadding: 3
        },
        {
            position: "right",
            color: "#d5d5d5",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: ' Arial',
            axisLabelPadding: 67
        }
        ],
        legend: {
            noColumns: 1,
            labelBoxBorderColor: "#d5d5d5",
            position: "nw"
        }

    };

    function gd(year, month, day) {
        return new Date(year, month - 1, day).getTime();
    }

    this.flotData = dataset;
    this.flotOptions = options;


    this.data =[
    {foo:1, bar:1},
    {foo:2, bar:2},
    {foo:3, bar:3},
    {foo:4, bar:4},
    {foo:5, bar:5},
    {foo:6, bar:6},
    {foo:7, bar:7}
    ];

    this.positions =[
    {pos:[40.71, -74.21]},
    {pos:[40.72, -74.20]},
    {pos:[40.73, -74.19]},
    {pos:[40.74, -74.18]},
    {pos:[40.75, -74.17]},
    {pos:[40.76, -74.16]},
    {pos:[40.77, -74.15]}
    ];

    this.showData = function() {
        alert(this.data.foo);
    }


    this.clicked = function() {
        alert('Clicked a link inside infoWindow');
    };

    var shopArr = [];
    for (var i = 0; i < 10; i ++){
       var lat = Math.floor(Math.random()*900000) + 100000;
       var lng = Math.floor(Math.random()*900000) + 100000;
       shopArr.push(
            {
                id: i,
                name: 'Store ' + 1,
                position: [parseFloat('11.55' + lat), parseFloat('104.90' + lng)]
            }
       );
   }
   this.shops = shopArr;
   // this.shops = [
   // {id:'foo', name: 'STORE 1', position:[11.557, 104.908054]},
   // {id:'bar', name: 'STORE 2', position:[11.557731, 104.908054]}
   // ];
   this.shop = this.shops[0];

   this.showDetail = function(e, shop) {
    this.shop = shop;
    this.map.showInfoWindow('foo-iw', shop.id);
};

this.hideDetail = function() {
    vm.map.hideInfoWindow('foo-iw');
};


}

setTimeout(function(){
    var target = angular.element('#heatmap-canvas');
    // target.append('<heatmap-layer id="foo" data="taxiData"></heatmap-layer>');
}, 3000);


dashboardCtrl.resolve = {
    loadPlugin: function ($ocLazyLoad) {
        return $ocLazyLoad.load([
        {
            serie: true,
            name: 'angular-flot',
            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js' ]
        },
        {
            serie: true,
            files: ['js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js', 'js/plugins/jvectormap/jquery-jvectormap-2.0.2.css']
        },
        {
            serie: true,
            files: ['js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js']
        },
        {
            name: 'ui.checkbox',
            files: ['js/bootstrap/angular-bootstrap-checkbox.js']
        },
        {
            name: 'ui.event',
            files: ['js/plugins/uievents/event.js']
        },
        {
            name: 'ui.map',
            files: ['js/plugins/uimaps/ui-map.js']
        },
        {
            serie: true,
            files: ['bower_components/ngmap/build/scripts/ng-map.min.js', 'bower_components/ngmap/data.js']
        },
        ]);
    }
}


angular
.module('inspinia')
.controller('dashboardCtrl', dashboardCtrl)
