(function() {
    'use strict';

    angular
      .module('bmFrontendApp')
      .factory('OperationService', OperationService);

    function OperationService ($resource, ConstantURL) {
        var service = {
            resource: resource()
        };

        function resource() {
            return $resource(ConstantURL.OPERATION_URL, {}, {
                'findAll': {method: 'GET', isArray: true},
                'get': {method: 'GET'},
                'update': {method:'PUT', params: {id: "@id"}}
            });
        }

        return service;
    }
})();
