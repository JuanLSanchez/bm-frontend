(function() {
    'use strict';

    angular.module('bmFrontendApp')
    .controller('InvoiceCreateController', function (InvoiceService, $state, entity, Toast) {
        var vm = this;
        var invoice = {
            number:"",
            date_buy:new Date(),
            supplier_id:null,
            operation_id:null
        };
        var exit = true;

        function onSuccess(result) {
            Toast.showToast('Ingreso guardado', 'success-toast');
            if (exit) {
                $state.go('income');
            }else {
                invoice.id = null;
                invoice.number = new Date();
                invoice.date_buy = "";
                invoice.supplier_id = null;
                invoice.operation_id = null;
            }
        }

        function onError(result) {
            Toast.showToast('No se ha podido guardar la compra', 'error-toast');
        }

        function save(e) {
            exit = e;
            if (income.id == null) {
                InvoiceService.resource.save(income, onSuccess, onError);
            }else {
                InvoiceService.resource.update(income, onSuccess, onError);
            }
        }

        function init() {
            if (entity != null) {
                income = entity;
            }
            vm.invoice = invoice;
            vm.max_date = new Date();
            vm.save = save;
        }

        init();
    });
})();
