app.controller("orderController", function($scope, $http){

    $http.get("/api/v1/orders")
    .then(function(response){
        console.log(response.data);

        $scope.orders = response.data;

    });




});