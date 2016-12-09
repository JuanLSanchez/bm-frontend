(function () {
    'use strict';

    angular
      .module('bmFrontendApp')
      .controller('LoginController', LoginController);

    function LoginController($rootScope, $state, Auth, $mdDialog, Principal) {
        var vm = this;

        init();

        // $timeout(function (){angular.element('#username').focus();});

        function clean() {
            vm.username = null;
            vm.password = null;
            vm.rememberMe = true;
        }

        function login(event) {
            event.preventDefault();
            Auth.login({
                username: vm.username,
                password: vm.password,
                rememberMe: vm.rememberMe
            }).then(function () {
                vm.authenticationError = false;

                $rootScope.$broadcast('authenticationSuccess');

                $state.go('home');
            }).catch(function () {
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('No se ha podido iniciar la sesión')
                    .textContent('No se ha podido encontrar un usuario con esa contraseña')
                    .ariaLabel('Alert Dialog')
                    .ok('Aceptar')
                );
            });
        }

        function check() {
            Principal.identity().then(function (data) {
                if (data) {
                    $state.go('home');
                }
            });
        }

        function init() {

            vm.clean = clean;
            vm.credentials = {};
            vm.login = login;
            vm.password = null;
            vm.rememberMe = true;
            vm.username = null;

            check();
        }
    }
})();
