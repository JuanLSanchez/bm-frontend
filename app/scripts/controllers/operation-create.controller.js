(function() {
'use strict';

angular.module('bmFrontendApp')
  .controller('OperationCreateController', OperationCreateController);

function OperationCreateController (SectionService, OperationService, Toast) {
    var vm = this;
    var sections = [];

    function loadSections() {
        var query = {page: 0, size: 100, sort: 'name,asc'};
        SectionService.resource.findAll(query, success, error);
        function success(result) {
            while (vm.sections.length > 0) {
                vm.sections.pop();
            }
            for (var i = 0; i < result.length; i++) {
                vm.sections.push(result[i]);
            }
        }
        function error() {
            Toast.showToast('No se ha podido cargar las secciones', Toast.errorStyle);
        }
    }

    function save() {
        if (vm.operation.id != null) {
            OperationService.resource.update(vm.operation, vm.success, vm.error);
        }else {
            OperationService.resource.save(vm.operation, vm.success, vm.error);
        }
    }

    function unselect() {
        vm.operation.id = null;
        vm.operation.name = '';
        vm.operation.section_id = null;
    }

    function init() {
        vm.sections = sections;
        vm.save = save;
        vm.unselect = unselect;
        loadSections();
    }

    init();

}
})();
