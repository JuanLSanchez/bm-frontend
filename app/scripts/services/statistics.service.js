(function() {
'use strict';

angular.module('bmFrontendApp')
  .service('StatisticsService', StatisticsService);

function StatisticsService($resource, ConstantURL) {
    var service = {
        evolution:evolution()
    };

    function evolution() {
        return $resource(ConstantURL.STATISTICS_EVOLUTION_URL, {}, {
            'get': {method: 'GET'}
        });
    }

    return service;
}

})();
