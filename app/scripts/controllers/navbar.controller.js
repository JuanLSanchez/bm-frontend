(function () {
    'use strict';
    angular.module('bmFrontendApp')
      .controller('NavbarController', function (Auth, $state, Principal) {
          var vm = this;

          var nav = {
              isOpen: false,
              count: 0,
              selectedDirection: 'down',
              selectedMode: 'md-scale'
          };
          function logout() {
              Auth.logout();
              $state.go('login');
          }
          var isAuthenticated = Principal.isAuthenticated;

          function init() {
              vm.nav = nav;
              vm.logout = logout;
              vm.isAuthenticated = isAuthenticated;
          }
          init();

      });
})();
