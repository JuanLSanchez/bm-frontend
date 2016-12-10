(function () {
    angular.module('bmFrontendApp')
    .service('DateUtils', function () {

        function convertDateTimeFromServer(stringDate) {
            return stringDate.substr(0, 10);
        }

        var service = {
            convertDateTimeFromServer:convertDateTimeFromServer
        };

        return service;
    });
})();
