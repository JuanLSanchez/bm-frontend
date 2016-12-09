(function () {
    'use strict';

    angular.module('bmFrontendApp')
      .run(run);

    function run($rootScope, $window, AuthServerProvider, stateHandler) {
        AuthServerProvider.start();
        stateHandler.initialize();
    }
})();
