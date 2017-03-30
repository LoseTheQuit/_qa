'use strict';

console.log("OUTSIDE _map");

angular.module("mainModule").directive('map', function() {
    console.log("INSIDE _map");
    return {
        templateUrl: '/templates/_map.html',
        controller: 'alloyController',
        replace: false
    }
});
