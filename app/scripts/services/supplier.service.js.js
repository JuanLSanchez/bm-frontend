(function() {
    'use strict';

    angular
      .module('bmFrontendApp')
      .factory('SupplierService', SupplierService);

    function SupplierService ($resource, ConstantURL) {
        var service = {
            resource: resource()
        };

        function resource() {
            return $resource(ConstantURL.SUPPLIER_URL, {}, {
                'findAll': {method: 'GET', isArray: true},
                'get': {method: 'GET'},
                'update': {method:'PUT', params: {id: "@id"}}
            });
        }

        return service;
    }
})();
