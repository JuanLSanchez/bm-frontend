(function() {
'use strict';

angular.module('bmFrontendApp')
  .controller('InvoiceLineCreateController', InvoiceLineCreateController);

function InvoiceLineCreateController (InvoiceLineService, Toast) {
    var vm = this;

    function save() {
        if (vm.invoiceLine.id != null) {
            InvoiceLineService.resource.update(vm.invoiceLine, vm.success, vm.error);
        }else {
            InvoiceLineService.resource.save(vm.invoiceLine, vm.success, vm.error);
        }
    }

    function calculateWithTotal() {
        if (vm.invoiceLine.iva && vm.invoiceLine.iva != 0) {
            vm.invoiceLine.base = vm.invoiceLine.total * (1 - vm.invoiceLine.iva / 100);
        }
    }

    function calculateWithBase() {
        if (vm.invoiceLine.iva) {
            var total = (vm.invoiceLine.base / (1 - vm.invoiceLine.iva / 100));
            vm.invoiceLine.total = Math.round(total * 100.0) / 100;
        }
    }

    function calculateWithIva() {
        if (vm.invoiceLine.base && vm.invoiceLine.base != 0) {
            var total = (vm.invoiceLine.base / (1 - vm.invoiceLine.iva / 100));
            vm.invoiceLine.total = Math.round(total * 100.0) / 100;
        }else if (vm.invoiceLine.total && vm.invoiceLine.total != 0) {
            vm.invoiceLine.base = vm.invoiceLine.total * (1 - vm.invoiceLine.iva / 100);
        }
    }

    function unselect() {
        vm.invoiceLine.id = null;
        vm.invoiceLine.iva = '';
        vm.invoiceLine.base = null;
        vm.invoiceLine.invoice = vm.invoiceId;
    }

    function init() {
        vm.save = save;
        vm.unselect = unselect;
        vm.calculateWithTotal = calculateWithTotal;
        vm.calculateWithBase = calculateWithBase;
        vm.calculateWithIva = calculateWithIva;
    }

    init();

}
})();
