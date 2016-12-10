(function() {
    'use strict';

    angular.module('bmFrontendApp')
    .controller('InvoiceController', function (InvoiceService, ParseLinks, $mdDialog) {
        var vm = this;
        var page = 1;
        var pageSize = 10;
        var invoices = [];
        var order = {
            sort:'dateBuy',
            dir:'desc'
        };

        function remove() {
            var i = 0;
            var total = invoices.length;
            function add() {
                i++;
                if (i == total) {
                    loadPage(vm.page, vm.pageSize);
                }
            }
            while (invoices.length > 0) {
                InvoiceService.resource.delete({id:invoice.pop().id}, add, add);
            }
        }

        function loadPage(page, pageSize) {
            var query = {page: page - 1, size: pageSize, sort:order.sort + ',' + order.dir};

            vm.promise = InvoiceService.resource.findAll(query, function(result, headers) {
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
            invoices.forEach(function(invoice) {
                text += invoice.date_buy + ' ' + invoice.number + ', ';
            });
            text = text.substr(0, text.length - 2);
            if (invoices.length > 0) {
                var confirm = $mdDialog.confirm()
                  .title('¿Desea eliminar las facturas seleccionadas?')
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

        init();

        function init() {
            vm.promise;
            vm.loadPage = loadPage;
            vm.invoices = invoices;
            vm.links;
            vm.data = [];
            vm.pageSize = pageSize;
            vm.page = page;
            vm.mdLabel = {
                of:'de',
                page:'Pagina',
                rowsPerPage:'Elementos por página'
            }
            vm.reOrder = reOrder;
            vm.showConfirm = showConfirm;
            loadPage(page, pageSize);
        }

    });
})();
