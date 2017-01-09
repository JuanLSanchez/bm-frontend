(function () {
    angular.module('bmFrontendApp')
    .service('DateUtils', function () {

        function convertDateTimeFromServer(stringDate) {
            var date = new Date(stringDate);
            return date.getFullYear() + '-'
              + ("0" + (date.getMonth() + 1)).slice(-2) + '-'
              + ("0" + (date.getDate())).slice(-2);
        }

        function convertToUtc(date) {
            return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        }

        var service = {
            convertDateTimeFromServer:convertDateTimeFromServer,
            convertToUtc:convertToUtc
        };

        return service;
    });
})();
