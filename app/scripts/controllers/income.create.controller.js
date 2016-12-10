(function() {
    'use strict';

    angular.module('bmFrontendApp')
    .controller('IncomeCreateController', function (IncomeService, $state) {
        var vm = this;
        var income = {
            income_date: new Date(),
            name:"",
            nif:"",
            base:0.0,
            iva:21
        };

        function onSuccess(result) {
            $state.go('income');
        }

        function onError(result) {

        }

        function save() {
            IncomeService.resource.save(income, onSuccess, onError);
        }

        function init() {
            vm.income = income;
            vm.max_date = new Date();
            vm.save = save;
        }

        init();
    });
})();
