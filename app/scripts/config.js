(function () {
    'use strict';

    angular.module('bmFrontendApp')
      .config(config);

    function config($urlRouterProvider, $stateProvider, $qProvider, $mdDateLocaleProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('site', {
            'abstract': true,
            views: {
                'navbar@': {
                    templateUrl: 'views/navbar.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                }
            }
        });

        $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
          'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago',
          'Sep', 'Oct', 'Nov', 'Dic'];
        $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        $mdDateLocaleProvider.shortDays = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
        $mdDateLocaleProvider.firstDayOfWeek = 1;
    }
})();
