(function() {
'use strict';

angular.module('bmFrontendApp')
  .controller('SupplierController', SupplierController);
function SupplierController(SupplierService, ParseLinks, Toast) {
    var vm = this;
    var page = 1;
    var pageSize = 10;
    var suppliers = [];
    var order = {
        sort: '',
        dir:'desc'
    };

    function remove() {
        var i = 0, u = 0;
        var total = suppliers.length;
        function add(units) {
            i++;
            u += units;
            if (i == total) {
                loadPage(vm.page, vm.pageSize);
                if (u > 0) {
                    if (u == 1) {
                        Toast.showToast('Se han eliminado ' + u + ' proveedores', 'success-toast');
                    }else {
                        Toast.showToast('Se han eliminado ' + u + ' proveedores', 'success-toast');
                    }
                }else {
                    Toast.showToast('No se ha eliminado ninguna proveedor', 'error-toast');
                }
            }
        }

        function onSuccess() {
            add(1);
        }

        function onError() {
            add(0);
        }

        while (suppliers.length > 0) {
            SupplierService.resource.delete({id:operations.pop().id}, onSuccess, onError);
        }
    }

    function loadPage(page, pageSize) {
        var query = {page: page - 1, size: pageSize, sort:order.sort + ',' + order.dir};

        vm.promise = SupplierService.resource.findAll(query, function(result, headers) {
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
        var text = '';
        suppliers.forEach(function(supplier) {
            text += supplier.name + '-' + supplier.nif + ', ';
        });
        text = text.substr(0, text.length - 2);
        if (suppliers.length > 0) {
            var confirm = $mdDialog.confirm()
              .title('¿Desea eliminar los proveedores seleccionados?')
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

    function edit(supplier) {
        vm.supplier.id = supplier.id;
        vm.supplier.name = supplier.name;
        vm.supplier.nif = supplier.nif;
    }

    function success() {
        Toast.showToast('Se ha guardado la operación', Toast.successStyle);
        loadPage(page, pageSize);
        vm.supplier.id = null;
        vm.supplier.name = '';
        vm.supplier.nif = '';
    }

    function error() {
        Toast.showToast('No se ha podido guardar el proveedor', Toast.errorStyle);
    }

    init();

    function init() {
        vm.promise;
        vm.loadPage = loadPage;
        vm.suppliers = suppliers;
        vm.links;
        vm.data = [];
        vm.pageSize = pageSize;
        vm.page = page;
        vm.supplier = {name: '', section_id: ''};
        vm.error = error;
        vm.success = success;
        vm.edit = edit;
        vm.mdLabel = {
            of:'de',
            page:'Pagina',
            rowsPerPage:'Elementos por página'
        };
        vm.reOrder = reOrder;
        vm.showConfirm = showConfirm;
        loadPage(page, pageSize);
    }
}
})();
