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
    var barChart;
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
        end = moment(end.format('YYYY-MM-DD')).add(1, 'days');
        evolutionAxis = createEvolutionAxis(start, end);
        var config = StatisticsService.createConfigurationChart('evolution_chart', evolutionAxis);
        var donutConfig = StatisticsService.createConfigurationDonut('donut_chart', '');

        evolutionChart = StatisticsService.configureChart(evolutionChart, config);
        donutChart = StatisticsService.configureChart(donutChart, donutConfig);
        barChart = StatisticsService.configureChart(barChart, StatisticsService.createConfigurationBar('bar_chart'));

        loadEvolution(start, end, 'Ingresos', 'income');
        loadEvolution(start, end, 'Gastos', 'invoice_line');

        barChart.data.colors({
            'Ingresos': function(d) {
                if (d.value == vm.bestDayOfWeek.incomes) {
                    return 'green';
                }else {
                    return '#1f77b4';
                }
            },
            'Gastos': function(d) {
                if (d.value == vm.bestDayOfWeek.invoices) {
                    return 'red';
                }else {
                    return '#ff7f0e';
                }
            }});
        evolutionChart.data.colors({
            'Ingresos': function(d) {
                if (d.value == vm.bestDay.incomes) {
                    return 'green';
                }else {
                    return '#1f77b4';
                }
            },
          'Gastos': function(d) {
              if (d.value == vm.bestDay.invoices) {
                  return 'red';
              }else {
                  return '#ff7f0e';
              }
        }});
        donutChart.data.colors({
            'Ingresos': '#1f77b4',
            'Gastos': '#ff7f0e'
        });
    }
    function supplierEvolution(start, end) {
        start = moment(start.format('YYYY-MM-DD'));
        end = moment(end.format('YYYY-MM-DD')).add(1, 'days');
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
        var week = [0, 0, 0, 0, 0, 0, 0];

        StatisticsService.evolution.get(
          {type:type, start:start.format('YYYY-MM-DD'), end:end.format('YYYY-MM-DD')}, success, error);

        function success(result) {
            evolutionAxis.slice(1).forEach(function(day) {
                var base = result[day];
                incomes.push(base);
                vm.total[title] += base;
                week[moment(day).format('e')] += base;
                if (title == 'Ingresos' && vm.bestDay.incomes < base) {
                    vm.bestDay.incomes = base;
                }else if (title == 'Gastos' && vm.bestDay.invoices < base) {
                    vm.bestDay.invoices = base;
                }
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
            week[week.length] = week[0];
            week = title;
            for (var i = 1; i < week.length; i++) {
                var amount = week[i];
                if (title == 'Ingresos') {
                    if (vm.bestDayOfWeek.incomes < amount) {
                        vm.bestDayOfWeek.incomes = amount;
                    }
                }else if (title == 'Gastos') {
                    if (vm.bestDayOfWeek.invoices < amount) {
                        vm.bestDayOfWeek.invoices = amount;
                    }
                }
            };
            barChart.load({columns: [week]});
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
        vm.bestDayOfWeek = {incomes:null, invoices:null};
        vm.bestDay = {incomes:null, invoices:null};
    }

    init();
}
})();
