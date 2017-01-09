(function() {
    'use strict';

    angular
      .module('bmFrontendApp')
      .factory('InvoiceService', InvoiceService);

    function InvoiceService ($resource, ConstantURL, DateUtils) {
        var service = {
            resource: resource()
        };

        function resource() {
            return $resource(ConstantURL.INVOICE_URL, {}, {
                'findAll': {method: 'GET', isArray: true,
                            transformResponse: function (data) {
                                data = angular.fromJson(data);
                                for (var i = 0; i < data.length; i++) {
                                    data[i].date_buy = DateUtils.convertDateTimeFromServer(data[i].date_buy);
                                }
                                return data;
                            }},
                'get': {method: 'GET',
                        transformResponse: function (data) {
                            data = angular.fromJson(data);
                            data.date_buy = new Date(data.date_buy);
                            return data;
                        }},
                'update': {method:'PUT',
                          params: {
                              id: "@id"
                          },
                          transformRequest: function (data) {
                              data.date_buy = DateUtils.convertToUtc(data.date_buy);
                              return angular.toJson(data);
                          }},
                'save': {method:'POST',
                          transformRequest: function (data) {
                              data.date_buy = DateUtils.convertToUtc(data.date_buy);
                              return angular.toJson(data);
                          }}
            });
        }

        return service;
    }
})();
