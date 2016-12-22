(function () {
'use strict';

angular.module('bmFrontendApp')
  .service('SectionService', SectionService);
function SectionService ($resource, ConstantURL) {
    var service = {
        resource: resource()
    };

    function resource() {
        return $resource(ConstantURL.SECTION_URL, {}, {
            'findAll': {method: 'GET', isArray: true},
            'get': {method: 'GET'},
            'update': {method:'PUT', params: {id: "@id"}}
        });
    }

    return service;

}
})();
