(function() {
'use strict';

angular.module('bmFrontendApp')
  .controller('SupplierCreateController', SupplierCreateController);
function SupplierCreateController(SupplierService) {
    var vm = this;

    function save() {
        if (vm.supplier.id != null) {
            SupplierService.resource.update(vm.supplier, vm.success, vm.error);
        }else {
            SupplierService.resource.save(vm.supplier, vm.success, vm.error);
        }
    }

    function unselect() {
        vm.supplier.id = null;
        vm.supplier.name = '';
        vm.supplier.nif = '';
    }

    function init() {
        vm.save = save;
        vm.unselect = unselect;
    }

    init();

}

})();
