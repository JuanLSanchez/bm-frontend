(function () {
'use strict';

angular.module('bmFrontendApp')
  .controller('OperationController', OperationController);

function OperationController(OperationService, ParseLinks, $mdDialog, Toast) {
    var vm = this;
    var page = 1;
    var pageSize = 10;
    var operations = [];
    var order = {
        sort: '',
        dir:'desc'
    };

    function remove() {
        var i = 0, u = 0;
        var total = operations.length;
        function add(units) {
            i++;
            u += units;
            if (i == total) {
                loadPage(vm.page, vm.pageSize);
                if (u > 0) {
                    if (u == 1) {
                        Toast.showToast('Se han eliminado ' + u + ' operacion', 'success-toast');
                    }else {
                        Toast.showToast('Se han eliminado ' + u + ' operaciones', 'success-toast');
                    }
                }else {
                    Toast.showToast('No se ha eliminado ninguna operación', 'error-toast');
                }
            }
        }

        function onSuccess() {
            add(1);
        }

        function onError() {
            add(0);
        }

        while (operations.length > 0) {
            OperationService.resource.delete({id:operations.pop().id}, onSuccess, onError);
        }
    }

    function loadPage(page, pageSize) {
        var query = {page: page - 1, size: pageSize, sort:order.sort + ',' + order.dir};

        vm.promise = OperationService.resource.findAll(query, function(result, headers) {
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
        operations.forEach(function(operation) {
            text += operation.name + ', ';
        });
        text = text.substr(0, text.length - 2);
        if (operations.length > 0) {
            var confirm = $mdDialog.confirm()
              .title('¿Desea eliminar las operaciones seleccionadas?')
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

    function edit(operation) {
        vm.operation.id = operation.id;
        vm.operation.name = operation.name;
        vm.operation.section_id = operation.section_id;
    }

    function success() {
        Toast.showToast('Se ha guardado la operación', Toast.successStyle);
        loadPage(page, pageSize);
        vm.operation.id = null;
        vm.operation.name = '';
        vm.operation.section_id = null;
    }

    function error() {
        Toast.showToast('No se ha podido guardar la operación', Toast.errorStyle);
    }

    init();

    function init() {
        vm.promise;
        vm.loadPage = loadPage;
        vm.operations = operations;
        vm.links;
        vm.data = [];
        vm.pageSize = pageSize;
        vm.page = page;
        vm.operation = {name: '', section_id: ''};
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
