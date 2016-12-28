(function() {
    'use strict';

    function invoiceLineList () {
        return {
            templateUrl: 'views/invoice-line-list.html',
            restrict: 'E',
            controller: 'InvoiceLineOfInvoiceDirectiveController',
            controllerAs: 'vm',
            scope: {
                entity: '=',
                reload: '=',
                invoiceLine: '='
            },
            bindToController: true,
            replace: true
        };
    }
    invoiceLineList.$inject = [];

    angular.module('bmFrontendApp')
      .directive('invoiceLineList', invoiceLineList);

})();
