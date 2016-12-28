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

    function unselect() {
        vm.invoiceLine.id = null;
        vm.invoiceLine.iva = '';
        vm.invoiceLine.base = null;
        vm.invoiceLine.invoice = vm.invoiceId;
    }

    function init() {
        vm.save = save;
        vm.unselect = unselect;
    }

    init();

}
})();
