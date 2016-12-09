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

        function loadPage(page, pageSize) {
            vm.promise = IncomeService.resource.findAll({page: page - 1, size: pageSize}, function(result, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                while (vm.data.length > 0) {
                    vm.data.pop();
                }
                for (var i = 0; i < result.length; i++) {
                    vm.data.push(result[i]);
                }
            }).$promise;
        };

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
            loadPage(page, pageSize);
        }
    }
})();
