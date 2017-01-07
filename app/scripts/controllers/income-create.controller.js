(function() {
    'use strict';

    angular.module('bmFrontendApp')
    .controller('IncomeCreateController', function (IncomeService, $state, entity, Toast, Tax) {
        var vm = this;
        var income = {
            income_date: new Date(),
            name:"",
            nif:"",
            base:0.0,
            iva:21,
            total:0.0
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
                income.total = calculateTotal(income);
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
                var total = calculateTotal(vm.income);
                vm.income.total = Math.round(total * 100.0) / 100;
            }
        }

        function calculateWithIva() {
            if (vm.income.base && vm.income.base != 0) {
                var total = calculateTotal(vm.income);
                vm.income.total = Math.round(total * 100.0) / 100;
            }else if (vm.income.total && vm.income.total != 0) {
                var base = calculateBase(vm.income);
                vm.income.base = Math.round(base * 100.0) / 100;
            }
        }

        function calculateWithTotal() {
            if (vm.income.iva && vm.income.iva != 0) {
                var base = calculateBase(vm.income);
                vm.income.base = Math.round(base * 100.0) / 100;
            }
        }

        function calculateTotal(income) {
            return Tax.baseAndIvaToTotal(income.base, income.iva);
        }

        function calculateBase(income) {
            return Tax.totalAndIvaToBase(income.total, income.iva);
        }

        function init() {
            if (entity != null) {
                income = entity;
                income.total = calculateTotal(entity);
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
