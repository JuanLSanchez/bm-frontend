(function() {
'use strict';

angular.module('bmFrontendApp')
  .controller('StatisticsController', StatisticsController);

function StatisticsController(StatisticsService, Toast, BookService) {
    var vm = this;

    var evolutionChart;
    var donutChart;
    var evolutionAxis;
    var supplierEvolutionChart;
    var supplierDonutChart;
    var supplierEvolutionAxis;

    function createEvolutionAxis(start, end) {
        var result = ['x'];
        var index = moment(start);
        while (index < end) {
            result.push(index.format('YYYY-MM-DD'));
            index.add(1, 'days');
        }
        return result;
    }

    function evolution(start, end) {
        start = moment(start.format('YYYY-MM-DD'));
        end = moment(end.format('YYYY-MM-DD'));
        evolutionAxis = createEvolutionAxis(start, end);
        var config = StatisticsService.createConfigurationChart('evolution_chart', evolutionAxis);
        var donutConfig = StatisticsService.createConfigurationDonut('donut_chart', '');

        evolutionChart = StatisticsService.configureChart(evolutionChart, config);
        donutChart = StatisticsService.configureChart(donutChart, donutConfig);

        loadEvolution(start, end, 'Ingresos', 'income');
        loadEvolution(start, end, 'Gastos', 'invoice_line');
    }
    function supplierEvolution(start, end) {
        start = moment(start.format('YYYY-MM-DD'));
        end = moment(end.format('YYYY-MM-DD'));
        supplierEvolutionAxis = createEvolutionAxis(start, end);
        var config = StatisticsService.createConfigurationChart('supplier_evolution_chart', supplierEvolutionAxis);
        var supplierDonutConfig = StatisticsService.createConfigurationDonut('supplier_donut_chart', '');

        supplierEvolutionChart = StatisticsService.configureChart(supplierEvolutionChart, config);
        supplierDonutChart = StatisticsService.configureChart(supplierDonutChart, supplierDonutConfig);

        loadSupplierEvolution(start, end);
    }

    function loadEvolution(start, end, title, type) {
        var incomes = [title];
        vm.total[title] = 0;

        StatisticsService.evolution.get(
          {type:type, start:start.format('YYYY-MM-DD'), end:end.format('YYYY-MM-DD')}, success, error);

        function success(result) {
            evolutionAxis.slice(1).forEach(function(day) {
                incomes.push(result[day]);
                vm.total[title] += result[day];
            });
            evolutionChart.load({
                columns: [
                  evolutionAxis,
                  incomes
                ]
            });
            donutChart.load({
                columns: [
                    [title, vm.total[title]]
                ]
            });
            evolutionChart.hide([title]);
            evolutionChart.show([title]);
        }
        function error() {
            Toast.showToast("Error al cargar la evolución", Toast.errorStyle);
        }
    }

    function loadSupplierEvolution(start, end) {
        StatisticsService.evolution.findAll(
          {type:'supplier', start:start.format('YYYY-MM-DD'), end:end.format('YYYY-MM-DD')}, success, error);

        function success(result) {
            result.forEach(function(supplierEvolution) {
                var array = [supplierEvolution.name];
                vm.supplierTotal[supplierEvolution.name] = 0;
                supplierEvolutionAxis.slice(1).forEach(function(day) {
                    array.push(supplierEvolution.evolution[day]);
                    vm.supplierTotal[supplierEvolution.name] += supplierEvolution.evolution[day];
                });
                supplierEvolutionChart.load({
                    columns: [
                      supplierEvolutionAxis,
                      array
                    ]
                });
                supplierDonutChart.load({
                    columns: [
                      [supplierEvolution.name, vm.supplierTotal[supplierEvolution.name]]
                    ]
                });
            });
            supplierEvolutionChart.hide();
        }

        function error() {
            Toast.showToast('Error al carga la evolución de proveedores', Toast.errorStyle);
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
        vm.supplierEvolutionRange.min = moment(result.max).subtract(1, 'M').toDate();
        vm.evolutionRange.max = result.max;
        vm.supplierEvolutionRange.max = result.max;
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
    function reloadSupplierEvolution() {
        supplierEvolution(moment(vm.supplierEvolutionRange.min), moment(vm.supplierEvolutionRange.max));
    }
    function classColor() {
        return vm.total['Ingresos'] > vm.total['Gastos'] ? 'text-green' : 'text-red';
    }

    function init() {

        BookService.range.get({type: 'invoice'}, invoiceRangeSuccess, invoiceRangeError);
        BookService.range.get({type: 'income'}, incomeRangeSuccess, incomeRangeError);
        vm.evolutionDate = {min:null, max:null};
        vm.evolutionRange = {min:null, max:null};
        vm.supplierEvolutionRange = {min:null, max:null};
        vm.reloadEvolution = reloadEvolution;
        vm.reloadSupplierEvolution = reloadSupplierEvolution;
        vm.total = {};
        vm.supplierTotal = {};
        vm.classColor = classColor;
    }

    init();
}
})();
