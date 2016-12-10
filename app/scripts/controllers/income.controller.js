(function () {
    'use strict';

    angular
      .module('bmFrontendApp')
      .controller('IncomeController', IncomeController);

    function IncomeController(IncomeService, ParseLinks) {
        var vm = this;
        var page = 1;
        var pageSize = 10;
        var incomes = [];
        var order = {
            sort:'incomeDate',
            dir:'desc'
        };

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
            loadPage(page, pageSize);
        }
    }
})();
