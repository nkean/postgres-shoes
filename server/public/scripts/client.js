console.log('client.js has been loaded');

var app = angular.module('ShoeStoreApp', []);

app.controller('ShoeStoreController', ['$http', function($http) {
    console.log('ShoeStoreController has been loaded');
    var self = this;

    self.shoeList = [];

    self.getShoeList = function() {
        $http({
            method: 'GET',
            url: '/shoe',
        })
        .then(function(response){
            self.shoeList = response.data;
            console.log(self.shoeList);
        })
        .catch(function(error) {
            console.log('Error on GET to /shoe: ', error);
        })
    }

    self.updateShoe = function(shoeObject) {
        $http({
            method: 'PUT',
            url: '/shoe',
            data: shoeObject,
        })
        .then(function(response){
            console.log(response);
            self.getShoeList();
        })
        .catch(function(error) {
            console.log('Error on PUT to /shoe: ', error);
        })
    }

    self.getShoeList();
}]);