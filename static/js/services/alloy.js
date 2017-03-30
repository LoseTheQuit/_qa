'use strict';

console.log("OUTSIDE alloy");

angular.module("mainModule")
    .service('alloy', function($http) {
        console.log("alloy initialized!");

        this.helloConsole = function() {
            console.info("INSIDE alloy");
        };

        this.createUser = function(callback) {
            $http({
                url: '/create-user',
                method: "POST"
            }).then(callback);
        };

        this.getUsers = function(callback) {
            $http({
                url: '/read-all',
                method: "GET"
            }).then(callback);
        };

        this.useServiceOne = function(id, callback) {
            $http({
                url: '/service-one/' + id,
                method: "GET"
            }).then(callback);
        };

        this.useServiceTwo = function(id, callback) {
            $http({
                url: '/service-two/' + id,
                method: "GET"
            }).then(callback);
        };

        this.delUser = function(id, callback) {
            console.log("success from delHomeBrew");

            $http({
                url: '/del-user/' + id,
                method: "DELETE"
            })

            .then(callback);

        };

        this._edit = function(id, callback) {

            $http({
                url: '/find-one/' + id,
                method: "GET",
            })

            .then(callback);

        };

        this.putCredits = function(id, params, callback) {
            console.log("success from putCredits");

            $http({
                url: '/put-credits/' + id,
                method: "PUT",
                data: params
            })

            .then(callback);

        };
        this.delCredits = function(id, callback) {
            console.log("success from putCredits");

            $http({
                url: '/del-credits/' + id,
                method: "PUT"
            })

            .then(callback);

        };

        this.putCreditsAWS = function(id, callback) {
            console.log("success from putCredits");

            $http({
                url: '/put-credits-aws/' + id,
                method: "PUT",
            })

            .then(callback);

        };

    });
