(function() {
    'use strict';

    angular.module('bmFrontendApp')
    .controller('InvoiceCreateController', function (InvoiceService, OperationService, SupplierService,
                                                     $state, entity, Toast) {
        var vm = this;
        var invoice = {
            number:"",
            date_buy:new Date(),
            supplier_id:null,
            operation_id:null
        };
        var exit = true;

        function onSuccess(result) {
            Toast.showToast('Compra guardad', 'success-toast');
            if (exit == 1) {
                invoice.id = result.id;
            }else if (exit == 2) {
                invoice.id = null;
                invoice.number = new Date();
                invoice.date_buy = "";
                invoice.supplier_id = null;
                invoice.operation_id = null;
            }else {
                $state.go('invoice');
            }
        }

        function onError(result) {
            Toast.showToast('No se ha podido guardar la compra', 'error-toast');
        }

        function save(e) {
            exit = e;
            if (invoice.id == null) {
                InvoiceService.resource.save(invoice, onSuccess, onError);
            }else {
                InvoiceService.resource.update(invoice, onSuccess, onError);
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

        function operationError() {
            Toast.showToast('No se ha podido guardar la operación', Toast.errorStyle);
        }

        function operationSelected() {
            OperationService.resource.get({id:vm.invoice.operation_id}, success, error);
            function success(result) {
                vm.operation.name = result.name;
                vm.operation.id = result.id;
                vm.operation.section_id = result.section_id;
            }
            function error() {
                Toast.showToast('Error al recuperar el proveedor', Toast.errorStyle);
            }
        }

        function loadSuppliers() {
            var query = {page: 0, size: 1000, sort: 'name,asc'};
            vm.supplierPromise = SupplierService.resource.findAll(query, function(result) {
                while (vm.suppliers.length > 0) {
                    vm.suppliers.pop();
                }
                for (var i = 0; i < result.length; i++) {
                    vm.suppliers.push(result[i]);
                }
            }).$promise;
        }

        function supplierSuccess(result) {
            Toast.showToast('Se ha guardado el proveedor', Toast.successStyle);
            loadSuppliers();
            vm.invoice.supplier_id = result.id;
            vm.supplier.id = result.id;
        }

        function supplierError() {
            Toast.showToast('No se ha podido guardar el proveedor', Toast.errorStyle);
        }

        function supplierSelected() {
            SupplierService.resource.get({id:vm.invoice.supplier_id}, success, error);
            function success(result) {
                vm.supplier.name = result.name;
                vm.supplier.id = result.id;
                vm.supplier.nif = result.nif;
            }
            function error() {
                Toast.showToast('Error al recuperar el proveedor', Toast.errorStyle);
            }
        }

        function invoiceLineSuccess() {
            Toast.showToast('Linea de factura guardada', 'success-toast');
            vm.invoiceLine.id = null;
            vm.invoiceLine.base = 0;
            vm.invoiceLine.iva = 21;
            vm.invoiceLine.invoice_id = vm.invoice.id;
            vm.invoiceLine.total = 0;
            vm.reload = true;
        }

        function invoiceLineError() {
            Toast.showToast('No se ha podido guardar la linea de factura', Toast.errorStyle);
        }

        function init() {
            if (entity != null) {
                invoice = entity;
            }
            vm.invoice = invoice;
            vm.max_date = new Date();
            vm.save = save;
            // Operation
            vm.operation = {name: '', section_id: ''};
            vm.operations = [];
            vm.operationSuccess = operationSuccess;
            vm.operationError = operationError;
            loadOperations();
            vm.operationSelected = operationSelected;
            // Supplier
            vm.supplier = {name: '', nif: ''};
            vm.suppliers = [];
            vm.supplierSuccess = supplierSuccess;
            vm.supplierError = supplierError;
            loadSuppliers();
            vm.supplierSelected = supplierSelected;
            // Invoice line
            vm.invoiceLine = {id: null, base: 0, iva: 21, total: 0, invoice_id: vm.invoice.id};
            vm.invoiceLineSuccess = invoiceLineSuccess;
            vm.invoiceLineError = invoiceLineError;
            vm.reload = false;
        }

        init();
    });
})();
