(function () {
    'use strict';
    angular.module('bmFrontendApp')
      .controller('NavbarController', function (Auth, $state, Principal, $mdSidenav) {
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
          function sidenav(componentId) {
              $mdSidenav(componentId).toggle();
          }
          var isAuthenticated = Principal.isAuthenticated;

          function listItemClass(item) {
              var result = 'md-1-line';
              var url = $state.$current.url.toString();
              var itemUrl = '/' + item + '/';
              if (url.includes(itemUrl)) {
                  result += ' is-selected-son'
              }
              if ($state.$current.name == item) {
                  result += ' is-selected'
              }
              return result;
          }

          function init() {
              vm.nav = nav;
              vm.logout = logout;
              vm.isAuthenticated = isAuthenticated;
              vm.sidenav = sidenav;
              vm.listItemClass = listItemClass;
          }
          init();

      });
})();
