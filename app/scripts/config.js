(function () {
    'use strict';

    angular.module('bmFrontendApp')
      .config(config);

    function config($urlRouterProvider, $stateProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('site', {
            'abstract': true
        });
    }
})();
