(function() {
'use strict';

angular.module('bmFrontendApp')
  .controller('StatisticsController', StatisticsController);

function StatisticsController(StatisticsService, Toast, BookService) {
    var vm = this;

    var evolutionChart;
    var evolutionAxis;

    function evolution(start, end) {
        evolutionAxis = ['x'];
        start = moment(start.format('YYYY-MM-DD'));
        end = moment(end.format('YYYY-MM-DD'));
        var index = moment(start);
        while (index < end) {
            evolutionAxis.push(index.format('YYYY-MM-DD'));
            index.add(1, 'days');
        }
        var config = {
            bindto: '#evolution_chart',
            data: {
                x: 'x',
                columns: [evolutionAxis]
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
                }
            },
            tooltip: {
                format: {
                    value: function (value, ratio, id) {
                        return Math.round(value * 100) / 100;
                    }
                }
            }
        };
        if (!evolutionChart) {
            evolutionChart = c3.generate(config);
        }else {
            evolutionChart.destroy();
            evolutionChart = c3.generate(config);
        }

        loadEvolution(start, end, 'Ingresos', 'income');
        loadEvolution(start, end, 'Gastos', 'invoice_line');

    }

    function loadEvolution(start, end, title, type) {
        var incomes = [title];

        StatisticsService.evolution.get(
          {type:type, start:start.format('YYYY-MM-DD'), end:end.format('YYYY-MM-DD')}, success, error);

        function success(result) {
            evolutionAxis.slice(1).forEach(function(day) {
                incomes.push(result[day]);
            });
            evolutionChart.load({
                columns: [
                  evolutionAxis,
                  incomes
                ]
            });
            evolutionChart.hide([title]);
            evolutionChart.show([title]);
        }
        function error() {
            Toast.showToast("Error al cargar la evolución", Toast.errorStyle);
        }
    }

    function invoiceRangeSuccess(result) {
        if (vm.min == null || vm.min > vm.evolutionDate.min) {
            vm.evolutionDate.min = result.min;
        }
        if (vm.max == null || vm.max < vm.evolutionDate.max) {
            vm.evolutionDate.max = result.max;
        }
        vm.evolutionRange.min = moment(result.max).subtract(1, 'M').toDate();
        vm.evolutionRange.max = result.max;

        reloadEvolution();
    }
    function invoiceRangeError() {
        Toast.showToast('No se ha podido obtener el rango de las compras', Toast.errorStyle);
    }

    function incomeRangeSuccess(result) {
        if (vm.min == null || vm.min > vm.evolutionDate.min) {
            vm.evolutionDate.min = result.min;
        }
        if (vm.max == null || vm.max < vm.evolutionDate.max) {
            vm.evolutionDate.max = result.max;
        }
    }
    function incomeRangeError() {
        Toast.showToast('No se ha podido obtener el rango de los ingresos', Toast.errorStyle);
    }
    function reloadEvolution() {
        evolution(moment(vm.evolutionRange.min), moment(vm.evolutionRange.max));
    }

    function init() {

        BookService.range.get({type: 'invoice'}, invoiceRangeSuccess, invoiceRangeError);
        BookService.range.get({type: 'income'}, incomeRangeSuccess, incomeRangeError);
        vm.evolutionDate = {min:null, max:null};
        vm.evolutionRange = {min:null, max:null};
        vm.reloadEvolution = reloadEvolution;
    }

    init();
}
})();
