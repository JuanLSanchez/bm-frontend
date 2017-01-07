(function () {
    'use strict';

    angular.module('bmFrontendApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('books', {
            parent: 'site',
            url: '/books',
            data: {
                pageTitle: 'Libros'
            },
            views: {
                'container@': {
                    templateUrl: 'views/books.html',
                    controller: 'BookController',
                    controllerAs: 'vm'
                }
            }
        })
    });
})();
