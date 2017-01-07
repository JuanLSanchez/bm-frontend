(function() {
'use strict';

angular.module('bmFrontendApp')
  .service('BookService', BookService);

function BookService($resource, ConstantURL, $http, Toast, FileSaver) {
    var service = {
        range: range(),
        document: document,
        resultToObject: resultToObject,
        numberToQuarter: numberToQuarter
    };

    var quarters = {0: {id: 0, name: 'Enero, Febrero y Marzo'},
                    1: {id: 1, name: 'Abril, Mayo y Junio'},
                    2: {id: 2, name: 'Julio, Agosto y Septiembre'},
                    3: {id: 3, name: 'Octubre, Noviembre y Diciembre'}};

    function range() {
        return $resource(ConstantURL.RANGE_URL, {}, {
          'get': {
            method: 'GET',
            transformResponse: function (data) {
              data = angular.fromJson(data);
              data.min = new Date(data.min);
              data.max = new Date(data.max);
              return data;
          }},
          'getToObject': {
              method: 'GET',
              transformResponse: function (data) {
                  data = angular.fromJson(data);
                  data.min = new Date(data.min);
                  data.max = new Date(data.max);
                  return resultToObject(data);
              }
          }});
    }

    function numberToQuarter(number) {
        return quarters[number];
    }

    function document(type, data) {
        $http({
            url: ConstantURL.DOCUMENT_URL.replace(':type', type),
            method: 'POST',
            responseType: 'arraybuffer',
            data: data, //this is your json data string
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/vnd.ms-excel'
            }
        }).then(success, error);

        function success(data) {
            var fileName = data.headers()['filename'];
            var blob = new Blob([data.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            FileSaver.saveAs(blob, fileName);
            Toast.showToast("Se ha generado el documento '" + fileName + "'", Toast.successStyle);
        }

        function error() {
            Toast.showToast("No se ha podido generar el libro", Toast.errorStyle);
        }
    }

    function resultToObject(result) {
        var start = result.min;
        var end = result.max;
        var startQuarter = Math.floor(start.getMonth() / 3);
        var startYear = start.getFullYear();
        var endQuarter = Math.floor(end.getMonth() / 3);
        var endYear = end.getFullYear();
        var result = {};

        var startQuarters = [];
        for (var quarter = startQuarter; quarter < 4; quarter++) {
            startQuarters.push(quarter);
        }
        result[startYear] = startQuarters;

        for (var i = startYear + 1; i < endYear; i++) {
            var quarters = [0, 1, 2, 3];
            result[i] = quarters;
        }

        var endQuarters = [];
        for (var quarter = 0; quarter <= endQuarter; quarter++) {
            endQuarters.push(quarter);
        }
        result[endYear] = endQuarters;

        return result;
    }

    return service;
}
})();
