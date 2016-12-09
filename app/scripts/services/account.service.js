(function() {
    'use strict';

    angular
      .module('bmFrontendApp')
      .factory('Account', Account);

    function Account ($resource, ConstantURL) {
        var service = $resource(ConstantURL.ACCOUNT_URL, {}, {
            'get': {method: 'GET', params: {}, isArray: false,
        interceptor: {
            response: function(response) {
                // expose response
                return response;
            }
        }
      }
        });

        return service;
    }
})();
