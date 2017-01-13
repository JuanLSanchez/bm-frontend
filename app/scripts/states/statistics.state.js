(function () {
    'use strict';

    angular.module('bmFrontendApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('statistics', {
            parent: 'site',
            url: '/statistics',
            data: {
                pageTitle: 'Estadísticas'
            },
            views: {
                'container@': {
                    templateUrl: 'views/statistics.html',
                    controller: 'StatisticsController',
                    controllerAs: 'vm'
                }
            }
        })
    });
})();
