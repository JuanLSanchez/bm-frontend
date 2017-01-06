(function() {
    'use strict';

    angular.module('bmFrontendApp')
    .controller('IncomeCreateController', function (IncomeService, $state, entity, Toast) {
        var vm = this;
        var income = {
            income_date: new Date(),
            name:"",
            nif:"",
            base:0.0,
            iva:21
        };
        var exit = true;

        function onSuccess(result) {
            Toast.showToast('Ingreso guardado', Toast.successStyle);
            if (exit) {
                $state.go('income');
            }else {
                income.id = null;
                income.income_date = new Date();
                income.name = "";
                income.nif = "";
                income.base = 0.0;
                income.iva = 21;
            }
        }

        function onError(result) {
            Toast.showToast('No se ha podido guardar el ingreso', Toast.errorStyle);
        }

        function save(e) {
            exit = e;
            if (income.id == null) {
                IncomeService.resource.save(income, onSuccess, onError);
            }else {
                IncomeService.resource.update(income, onSuccess, onError);
            }
        }

        function calculateWithBase() {
            if (vm.income.iva) {
                var total = (vm.income.base / (1 - vm.income.iva / 100));
                vm.income.total = Math.round(total * 100.0) / 100;
            }
        }

        function calculateWithIva() {
            if (vm.income.base && vm.income.base != 0) {
                var total = (vm.income.base / (1 - vm.income.iva / 100));
                vm.income.total = Math.round(total * 100.0) / 100;
            }else if (vm.income.total && vm.income.total != 0) {
                vm.income.base = vm.income.total * (1 - vm.income.iva / 100);
            }
        }

        function calculateWithTotal() {
            if (vm.income.iva && vm.income.iva != 0) {
                vm.income.base = vm.income.total * (1 - vm.income.iva / 100);
            }
        }

        function init() {
            if (entity != null) {
                income = entity;
            }
            vm.income = income;
            vm.max_date = new Date();
            vm.save = save;
            vm.calculateWithTotal = calculateWithTotal;
            vm.calculateWithBase = calculateWithBase;
            vm.calculateWithIva = calculateWithIva;
        }

        init();
    });
})();
