(function() {
    'use strict';

    angular.module('bmFrontendApp')
    .controller('InvoiceCreateController', function (InvoiceService, OperationService, $state, entity, Toast) {
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

        function loadOperations() {
            var query = {page: 0, size: 1000, sort: 'name,asc'};
            vm.operationPromise = OperationService.resource.findAll(query, function(result) {
                while (vm.operations.length > 0) {
                    vm.operations.pop();
                }
                for (var i = 0; i < result.length; i++) {
                    vm.operations.push(result[i]);
                }
            }).$promise;
        }

        function operationSuccess(result) {
            Toast.showToast('Se ha guardado la operación', Toast.successStyle);
            loadOperations();
            vm.invoice.operation_id = result.id;
            vm.operation.id = result.id;
        }

        function init() {
            if (entity != null) {
                income = entity;
            }
            vm.invoice = invoice;
            vm.max_date = new Date();
            vm.save = save;
            vm.operation = {name: '', section_id: ''};
            vm.operations = [];
            vm.operationSuccess = operationSuccess;
            loadOperations();
        }

        init();
    });
})();
