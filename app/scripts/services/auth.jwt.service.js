(function () {
    'use strict';

    angular
      .module('bmFrontendApp')
      .factory('AuthServerProvider', AuthServerProvider);

    function AuthServerProvider($http, $localStorage, $sessionStorage, $q, ConstantURL) {
        var service = {
            getToken: getToken,
            login: login,
            loginWithToken: loginWithToken,
            storeAuthenticationToken: storeAuthenticationToken,
            logout: logout,
            start: start
        };

        return service;

        function start() {
            $http.defaults.headers.common['Authorization'] = getToken;
        }

        function getToken() {
            return $localStorage.authenticationToken || $sessionStorage.authenticationToken;
        }

        function login(credentials) {

            var data = {
                username: credentials.username,
                password: credentials.password,
                rememberMe: credentials.rememberMe
            };
            return $http.post(ConstantURL.AUTHENTICATION_URL, data).then(authenticateSuccess);
            function authenticateSuccess(response) {
                var bearerToken = response.data.id_token;
                if (angular.isDefined(bearerToken)) {
                    var jwt = bearerToken;
                    service.storeAuthenticationToken(jwt, credentials.rememberMe);
                    return jwt;
                }
            }
        }

        function loginWithToken(jwt, rememberMe) {
            var deferred = $q.defer();

            if (angular.isDefined(jwt)) {
                this.storeAuthenticationToken(jwt, rememberMe);
                deferred.resolve(jwt);
            } else {
                deferred.reject();
            }

            return deferred.promise;
        }

        function storeAuthenticationToken(jwt, rememberMe) {
            if (rememberMe) {
                $localStorage.authenticationToken = 'Bearer ' + jwt;
            } else {
                $sessionStorage.authenticationToken = 'Bearer ' + jwt;
            }

            $http.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
        }

        function logout() {
            delete $localStorage.authenticationToken;
            delete $sessionStorage.authenticationToken;
        }
    }
})();
