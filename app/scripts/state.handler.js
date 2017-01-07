(function() {
    'use strict';

    angular
      .module('bmFrontendApp')
      .factory('stateHandler', stateHandler);

    stateHandler.$inject = ['$rootScope', '$state', '$window', 'Principal'];

    function stateHandler($rootScope, $state, $window, Principal) {
        return {
            initialize: initialize
        };

        function initialize() {

            var stateChangeStart = $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams, fromState) {
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                $rootScope.fromState = fromState;

                if (toState.external) {
                    event.preventDefault();
                    $window.open(toState.url, '_self');
                }

                if (toState.name == 'login') {
                    Principal.identity().then(function(data) {
                        if (data) {
                            $state.go('home');
                        }
                    });
                } else {
                    Principal.identity().then(function(data) {
                        if (!data) {
                            $state.go('login');
                        }
                    });
                }

            });

            var stateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function(event, toState) {
                var titleKey = 'BM';

                // Set the page title key to the one configured in state or use default one
                if (toState.data.pageTitle) {
                    titleKey = toState.data.pageTitle;
                }

                $window.document.title = titleKey;
            });

            $rootScope.$on('$destroy', function() {
                if (angular.isDefined(stateChangeStart) && stateChangeStart !== null) {
                    stateChangeStart();
                }

                if (angular.isDefined(stateChangeSuccess) && stateChangeSuccess !== null) {
                    stateChangeSuccess();
                }
            });
        }
    }
})();
