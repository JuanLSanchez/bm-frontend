(function() {
    'use strict';

    angular.module('bmFrontendApp')
    .controller('IncomeCreateController', function (IncomeService, $state, entity) {
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
            if (income.id == null) {
                IncomeService.resource.save(income, onSuccess, onError);
            }else {
                IncomeService.resource.update(income, onSuccess, onError);
            }
        }

        function init() {
            if (entity != null) {
                income = entity;
            }
            vm.income = income;
            vm.max_date = new Date();
            vm.save = save;
        }

        init();
    });
})();
