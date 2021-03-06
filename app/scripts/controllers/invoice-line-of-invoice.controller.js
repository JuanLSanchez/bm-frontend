(function() {
    'use strict';

    angular.module('bmFrontendApp')
    .controller('InvoiceLineOfInvoiceController', function (InvoiceLineService, entity, ParseLinks, $mdDialog, Toast) {
        var vm = this;
        var page = 1;
        var pageSize = 10;
        var invoiceLines = [];
        var order = {
            sort:'base',
            dir:'desc'
        };

        function remove() {
            var i = 0, u = 0;
            var total = invoiceLines.length;
            function add(units) {
                i++;
                u += units;
                if (i == total) {
                    loadPage(vm.page, vm.pageSize);
                    if (u > 0) {
                        if (u == 1) {
                            Toast.showToast('Se han eliminado ' + u + ' lineas de factura', 'success-toast');
                        }else {
                            Toast.showToast('Se han eliminado ' + u + ' lineas de factura', 'success-toast');
                        }
                    }else {
                        Toast.showToast('No se ha eliminado ninguna lineas de factura', 'error-toast');
                    }
                }
            }

            function onSuccess() {
                add(1);
            }

            function onError() {
                add(0);
            }

            while (invoiceLines.length > 0) {
                InvoiceLineService.resource.delete({id:invoiceLines.pop().id}, onSuccess, onError);
            }
        }

        function loadPage(page, pageSize) {
            var query = {invoice_id: entity.id, page: page - 1, size: pageSize, sort:order.sort + ',' + order.dir};

            vm.promise = InvoiceLineService.invoiceResource.findAll(query, function(result, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                while (vm.data.length > 0) {
                    vm.data.pop();
                }
                for (var i = 0; i < result.length; i++) {
                    vm.data.push(result[i]);
                }
            }).$promise;
        }

        function reOrder(sort) {
            if (sort.substr(0, 1) == '-') {
                order.sort = sort.substr(1);
                order.dir = 'desc'
            }else {
                order.sort = sort;
                order.dir = 'asc'
            }
            loadPage(vm.page, vm.pageSize);
        }

        function showConfirm(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var text = '';
            invoiceLines.forEach(function(invoiceLine) {
                text += invoiceLine.base + '€ al ' + invoiceLine.iva + '%, ';
            });
            text = text.substr(0, text.length - 2);
            if (invoiceLines.length > 0) {
                var confirm = $mdDialog.confirm()
                  .title('¿Desea eliminar las lineas de factura seleccionadas?')
                  .textContent(text)
                  .ariaLabel('Lucky day')
                  .targetEvent(ev)
                  .ok('Si')
                  .cancel('No');

                $mdDialog.show(confirm).then(function () {
                    remove();
                }, null);
            }
        }

        function edit(invoiceLine) {
            vm.invoiceLine.id = invoiceLine.id;
            vm.invoiceLine.base = invoiceLine.base;
            vm.invoiceLine.iva = invoiceLine.iva;
            vm.invoiceLine.invoice_id = invoiceLine.invoice_id;
        }

        function success() {
            Toast.showToast('Se ha guardado la linea de compra', Toast.successStyle);
            loadPage(page, pageSize);
            vm.invoiceLine.id = null;
            vm.invoiceLine.base = 0;
            vm.invoiceLine.iva = 21;
        }

        function error() {
            Toast.showToast('No se ha podido guardar la linea de compra', Toast.errorStyle);
        }

        init();

        function init() {
            vm.promise;
            vm.loadPage = loadPage;
            vm.invoiceLines = invoiceLines;
            vm.links;
            vm.data = [];
            vm.pageSize = pageSize;
            vm.page = page;
            vm.mdLabel = {
                of:'de',
                page:'Pagina',
                rowsPerPage:'Elementos por página'
            },
            vm.reOrder = reOrder;
            vm.showConfirm = showConfirm;
            loadPage(page, pageSize);
            vm.invoiceId = entity.id;
            vm.invoiceLine = {iva:21, base:0, invoice_id:vm.invoiceId};
            vm.edit = edit;
            vm.success = success;
            vm.error = error;
        }

    });
})();
