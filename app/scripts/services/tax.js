(function() {
'use strict';

angular.module('bmFrontendApp')
  .service('Tax', Tax);
function Tax() {
    var service = {
        totalAndIvaToBase:totalAndIvaToBase,
        baseAndIvaToTotal:baseAndIvaToTotal
    };

    function totalAndIvaToBase(total, iva) {
        return total / (1 + iva / 100);
    }

    function baseAndIvaToTotal(base, iva) {
        return base * (1 + iva / 100);
    }

    return service;
}
})();
