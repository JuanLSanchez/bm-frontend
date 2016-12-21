(function() {
'use strict';

angular.module('bmFrontendApp')
  .controller('selectCreateSupplierController', selectCreateSupplierController);

function selectCreateSupplierController (SupplierService) {
    var vm = this;

    var query = {page: 0, size: 10000, sort:'name,asc'};
    var suppliers = [];
    var supplier = {
        id:null,
        name:'',
        nif:''
    };

    function findAllSuppliers() {
        SupplierService.resource.findAll(query, addSuppliers);
        function addSuppliers(result) {
            for (var i = 0; i < result.length; i++) {
                suppliers.push(result[i])
            }
        }
    }

    function init() {
        findAllSuppliers();
        vm.suppliers = suppliers;
    }

    init();
}

})();
