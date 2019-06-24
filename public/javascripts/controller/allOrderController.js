app.controller("allOrderController", function ($scope, $http) {


    $scope.ordersData = orderData;
    console.log($scope.ordersData);

    $scope.filter = {};

    $scope.getDiffDays = function (delDate) {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(delDate);
        var secondDate = new Date();

        var diffDays = Math.round((secondDate.getTime() - firstDate.getTime()) / (oneDay));

        return diffDays;
    }


    $scope.getTotal = function (collection, column) {

        var total = 0;

        collection.forEach(function (item) {
            total += parseInt(item[column]);
        });

        return total;

    }

    angular.element("#afterDate").datepicker({
        uiLibrary: 'bootstrap4',
        format: 'dd mmm yyyy',
        change : function(e){
            console.log(e.target.value);
            var afterDate = e.target.value;
            var afterDateFormat = new Date(e.target.value);
            console.log(afterDateFormat);
            // angular.element("#beforeDate").datepicker("reset");
            angular.element("#beforeDate")
            // .datepicker("remove")
            .datepicker({
                uiLibrary: 'bootstrap4',
                format: 'dd mmm yyyy',
                minDate : new Date(e.target.value)
            })
            
        }
    });

    angular.element("#beforeDate").datepicker({
        uiLibrary: 'bootstrap4',
        format: 'dd mmm yyyy',
    });


    $scope.approvalFilter = function(approvalFilterSelection){
        var filterObj = {}

        if(approvalFilterSelection){
            filterObj.status = approvalFilterSelection
        }


        $http.get("/api/v1/orders", {params :filterObj })
        .then(function(response){

            console.log(response.data);
            $scope.ordersData = response.data;

        }, function(err){
            console.log(err);
            alert("Error: "+ err)
        })

    };

    $scope.dateRangeFilter = function(){

       var afterDate = $('#afterDate').val();
       var beforeDate = $('#beforeDate').val();
       var filterObj = {};

       if(afterDate && beforeDate){
        filterObj = {
            order_date_timestamp : {$gte : new Date(afterDate).getTime()},
            delivery_date_timestamp : {$lte: new Date(beforeDate).getTime() }
            
        }

       }else if(afterDate){
        filterObj = {
            order_date_timestamp : {$gte : new Date(afterDate).getTime()}
            
        }

       }else if(beforeDate){
        filterObj = {
            delivery_date_timestamp : {$lte: new Date(beforeDate).getTime() }
            
        }

       }else{
           alert("Please Choose a Date!");
           return;
       }

       console.log("filterObj ",filterObj);

    }

});