(function() {
'use strict';

angular.module('bmFrontendApp')
  .directive('operationCreate', operationCreate);

function operationCreate () {
    return {
        templateUrl: 'views/operation-create.html',
        restrict: 'E',
        controller: 'OperationCreateController',
        controllerAs: 'vm',
        scope: {
            operation: '=',
            success: '=',
            error: '=',
            edition: '='
        },
        bindToController: true,
        replace: true
    };
}

})();
