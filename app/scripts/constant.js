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
            ACCOUNT_URL: API_URL + '/account',
            INCOME_URL: API_URL + '/income/:id',
            INVOICE_URL: API_URL + '/invoice/:id',
            OPERATION_URL: API_URL + '/operation/:id',
            SECTION_URL: API_URL + '/section/:id',
            SUPPLIER_URL: API_URL + '/supplier/:id',
            INVOICE_LINE_URL: API_URL + '/invoice_line/:id',
            INVOICE_LINE_OF_INVOICE_URL: API_URL + '/invoice_line/invoice/:invoice_id',
            RANGE_URL: API_URL + '/:type/range',
            DOCUMENT_URL: API_URL + '/:type/document',
            STATISTICS_EVOLUTION_URL: API_URL + '/:type/statistic/evolution'
        }
    })());
})();
