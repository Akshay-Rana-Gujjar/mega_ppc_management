app.controller("productController" , function($scope, $http){

    $scope.productData = productData;

    $scope.newProductData = {};


    $scope.addProductSubmit = function(){

        $http.post("/api/v1/product", $scope.newProductData)
        .then(function(response){

            alert("Product Added!!")
            location.reload();
        },function(err){
            console.log(err);
            alert("Error : "+ err);
        })  

    }



})