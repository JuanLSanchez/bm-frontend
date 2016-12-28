(function() {
    'use strict';

    angular
      .module('bmFrontendApp')
      .factory('InvoiceLineService', InvoiceLineService);

    function InvoiceLineService ($resource, ConstantURL, DateUtils) {
        var service = {
            resource: resource(),
            invoiceResource: invoiceResouce()
        };

        function resource() {
            return $resource(ConstantURL.INVOICE_LINE_URL, {}, {
                'findAll': {method: 'GET', isArray: true},
                'get': {method: 'GET'},
                'update': {method:'PUT', params: {id: "@id"}}
            });
        }

        function invoiceResouce() {
            return $resource(ConstantURL.INVOICE_LINE_OF_INVOICE_URL, {}, {
                'findAll': {method: 'GET', isArray: true}
            });
        }

        return service;
    }
})();
