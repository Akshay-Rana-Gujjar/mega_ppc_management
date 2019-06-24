app.controller("customerController", function($scope, $http){

    $scope.customerData = customerData;


    console.log($scope.customerData);


    $scope.newCustomerData = {};


    $scope.addCustomerSubmit = function(){

        $http.post("/api/v1/customers", $scope.newCustomerData)
        .then(function(response){

            console.log(response.data);

            alert("Customer Added");

            location.reload();

        }, function(err){
            console.log(err);
            alert("Error = " + err  );
        });
 
    };


})