app.controller("productController" , function($scope, $http, $q){

    $scope.productData = productData;

    $scope.newProductData = {};


    $scope.addProductSubmit = function(){
        
        console.log($scope.newProductData);
        
        // return;
        $http.post("/api/v1/products", $scope.newProductData)
        .then(function(response){

            alert("Product Added!!")
            // location.reload();
            $scope.newProductData = {};
        },function(err){
            console.log(err);
            alert("Error : "+ err);
        })  

    }


   
    $q.all({
        grades: $http.get("/api/v1/grades"),
        shapes: $http.get("/api/v1/shapes"),
        
    })
    .then(function (responses) {
       
        $scope.grades = responses.grades.data;
        $scope.shapes = responses.shapes.data;
       

        console.log(responses)

        // console.log($scope.grades)

    });





});