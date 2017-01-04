(function () {
    'use strict';

    angular
      .module('bmFrontendApp')
      .controller('IncomeController', IncomeController);

    function IncomeController(IncomeService, ParseLinks, $mdDialog, Toast) {
        var vm = this;
        var page = 1;
        var pageSize = 10;
        var incomes = [];
        var order = {
            sort:'incomeDate',
            dir:'desc'
        };

        function remove() {
            var i = 0, u = 0;
            var total = incomes.length;
            function add(units) {
                i++;
                u += units;
                if (i == total) {
                    loadPage(vm.page, vm.pageSize);
                    if (u > 0) {
                        if (u == 1) {
                            Toast.showToast('Se han eliminado ' + u + ' ingresos', 'success-toast');
                        }else {
                            Toast.showToast('Se han eliminado ' + u + ' ingresos', 'success-toast');
                        }
                    }else {
                        Toast.showToast('No se ha eliminado ningun ingreso', 'error-toast');
                    }
                }
            }

            function onSuccess() {
                add(1);
            }

            function onError() {
                add(0);
            }

            while (incomes.length > 0) {
                IncomeService.resource.delete({id:incomes.pop().id}, onSuccess, onError);
            }
        }

        function loadPage(page, pageSize) {
            var query = {page: page - 1, size: pageSize, sort:order.sort + ',' + order.dir};
            //query[order.sort + '.dir'] = order.dir;
            vm.promise = IncomeService.resource.findAll(query, function(result, headers) {
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
            incomes.forEach(function(income) {
                text += income.income_date + ' ' + income.name + ' ' + income.base + '€, ';
            });
            text = text.substr(0, text.length - 2);
            if (incomes.length > 0) {
                var confirm = $mdDialog.confirm()
                  .title('¿Desea eliminar los ingresos seleccionados?')
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
            vm.incomes = incomes;
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
    }
})();
