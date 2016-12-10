(function() {
    'use strict';

    angular
      .module('bmFrontendApp')
      .factory('IncomeService', IncomeService);

    function IncomeService ($resource, ConstantURL, DateUtils) {
        var service = {
            resource: resource()
        };

        function resource() {
            return $resource(ConstantURL.INCOME_URL, {}, {
                'findAll': {method: 'GET', isArray: true,
                  transformResponse: function (data) {
                      data = angular.fromJson(data);
                      for (var i = 0; i < data.length; i++) {
                          data[i].income_date = DateUtils.convertDateTimeFromServer(data[i].income_date);
                      }
                      return data;
                  }},
                'get': {method: 'GET',
                  transformResponse: function (data) {
                      data = angular.fromJson(data);
                      data.income_date = DateUtils.convertDateTimeFromServer(data.income_date);
                      return data;
                  }},
                'update': {method:'PUT'}
            });
        }

        return service;
    }
})();
