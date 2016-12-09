(function () {
    'use strict';
    angular
    .module('bmFrontendApp').constant('ConstantURL', (function () {
        var APP_URL = 'http://localhost:8080';
        var API_URL = APP_URL + '/api';
        return {
            APP_URL: APP_URL,
            API_URL: API_URL,
            AUTHENTICATION_URL: API_URL + '/authenticate',
            ACCOUNT_URL: API_URL + '/account'
        }
    })());
})();
