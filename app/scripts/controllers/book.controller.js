(function() {
'use strict';

angular.module('bmFrontendApp')
  .controller('BookController', BookController);

function BookController(BookService, Toast) {
    var vm = this;

    function loadInvoiceQuarter() {
        var quarters = vm.invoiceRange[vm.invoice.year];
        vm.invoice.quarter = null;
        if (quarters.length && quarters.length > 0) {
            while (vm.invoiceQuarters.length > 0) {
                vm.invoiceQuarters.pop();
            }
            for (var i = 0; i < quarters.length; i++) {
                vm.invoiceQuarters.push(BookService.numberToQuarter(quarters[i]));
            }
        }
    }

    function loadIncomeQuarter() {
        var quarters = vm.incomeRange[vm.income.year];
        vm.income.quarter = null;
        if (quarters.length && quarters.length > 0) {
            while (vm.incomeQuarters.length > 0) {
                vm.incomeQuarters.pop();
            }
            for (var i = 0; i < quarters.length; i++) {
                vm.incomeQuarters.push(BookService.numberToQuarter(quarters[i]));
            }
        }
    }

    function invoiceRangeSuccess(result) { vm.invoiceRange = result; }
    function invoiceRangeError() {
        Toast.showToast('No se ha podido obtener el rango de las compras', Toast.errorStyle);
    }

    function incomeRangeSuccess(result) { vm.incomeRange = result; }
    function incomeRangeError() {
        Toast.showToast('No se ha podido obtener el rango de los ingresos', Toast.errorStyle);
    }

    function incomeBook() {

    }

    function invoiceBook() {

    }

    function init() {
        vm.income = {year: null, quarter: null};
        vm.incomeQuarters = [];
        vm.loadIncomeQuarter = loadIncomeQuarter;
        vm.incomePromise = BookService.range.getToObject({type: 'income'},
          incomeRangeSuccess, incomeRangeError).$promise;
        vm.incomeBook = incomeBook;

        vm.invoice = {year: null, quarter: null};
        vm.invoiceQuarters = [];
        vm.loadInvoiceQuarter = loadInvoiceQuarter;
        vm.invoicePromise = BookService.range.getToObject({type: 'invoice'}, invoiceRangeSuccess, invoiceRangeError).$promise;
        vm.invoiceBook = invoiceBook;
    }

    init();
}
})();
