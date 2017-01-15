(function() {
'use strict';

angular.module('bmFrontendApp')
  .service('StatisticsService', StatisticsService);

function StatisticsService($resource, ConstantURL) {
    var service = {
        evolution:evolution(),
        createConfigurationChart:createConfigurationChart,
        createConfigurationDonut:createConfigurationDonut,
        configureChart:configureChart,
        createConfigurationBar:createConfigurationBar,
        weekCategories:weekCategories()
    };

    function weekCategories(){
        return ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    }

    function evolution() {
        return $resource(ConstantURL.STATISTICS_EVOLUTION_URL, {}, {
            'get': {method: 'GET'},
            'findAll': {method: 'GET', isArray: true},
        });
    }

    function createConfigurationChart(id, evolutionAxis) {
        return {
            bindto: '#' + id,
            data: {x: 'x', columns: [evolutionAxis]},
            axis: {x: {type: 'timeseries', tick: {format: '%Y-%m-%d'}}},
            tooltip: {
                format: {
                    value: function (value, ratio, id) {
                        return Math.round(value * 100) / 100 + ' €';
                    }
                }
            }
        };
    }
    function createConfigurationDonut(id, title) {
        return {
            bindto: '#' + id,
            data: {columns: [], type : 'donut'},
            donut: {title: title},
            tooltip: {
                format: {
                    value: function (value, ratio, id) {
                        return Math.round(value * 100) / 100 + ' €';
                    }
                }
            }
        };
    }

    function createConfigurationBar(id) {
        return {
            bindto: '#' + id,
            data: {columns: [], type: 'bar'},
            axis: {
                x: {
                    type: 'category',
                    categories: weekCategories()
                }
            },
            bar: {width: {ratio: 0.9}},
            tooltip: {
                format: {
                    value: function (value, ratio, id) {
                        return Math.round(value * 100) / 100 + ' €';
                    }
                }
            }
        };
    }

    function configureChart(chart, config) {
        if (!chart) {
            chart = c3.generate(config);
        }else {
            chart.destroy();
            chart = c3.generate(config);
        }
        return chart;
    }

    return service;
}

})();
