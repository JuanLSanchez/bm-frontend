(function() {
    'use strict';

    angular
      .module('bmFrontendApp')
      .factory('IncomeService', IncomeService);

    function IncomeService ($resource, ConstantURL) {
        var service = {
            resource: resource()
        };

        function resource() {
            return $resource(ConstantURL.INCOME_URL, {}, {
                'findAll': {method: 'GET', isArray: true},
                'get': {method: 'GET'},
                'update': {method:'PUT'}
            });
        }

        return service;
    }
})();
