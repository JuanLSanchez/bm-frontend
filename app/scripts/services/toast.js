(function() {
    'use strict';

    angular.module('bmFrontendApp')
    .service('Toast', function ($mdToast) {
        var service = {
            showToast:showToast
        };

        function getToastPosition() {
            var toastPosition = {
                bottom: false,
                top: true,
                left: false,
                right: true
            };

            return Object.keys(toastPosition)
          .filter(function (pos) {
              return toastPosition[pos];
          })
          .join(' ');
        };

        function showToast(msg, theme) {
            var pinTo = getToastPosition();

            $mdToast.show(
              $mdToast.simple()
                .textContent(msg)
                .position(pinTo)
                .theme(theme)
                .hideDelay(2000)
            );
        };

        return service;
    });
})();
