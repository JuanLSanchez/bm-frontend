(function () {
    angular.module('bmFrontendApp')
    .service('DateUtils', function () {

        function convertDateTimeFromServer(stringDate) {
            var date = new Date(stringDate);
            return date.getFullYear() + '-'
              + ("0" + (date.getMonth() + 1)).slice(-2) + '-'
              + ("0" + (date.getDate())).slice(-2);
        }

        var service = {
            convertDateTimeFromServer:convertDateTimeFromServer
        };

        return service;
    });
})();
