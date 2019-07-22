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

    $scope.dateRangeFilterFunction = function(){


        
        var filterObj = {}

        if(!$scope.datePicker.date){
            alert("Please Choose a date or range.");
            return;
        }
        console.log($scope.dateRangeFilterType, $scope.datePicker.date.startDate._d, $scope.datePicker.date.endDate._d);
        
        if($scope.datePicker.date.startDate._d && $scope.datePicker.date.endDate._d){
            var startDate = new Date($scope.datePicker.date.startDate._d).getTime();
            var endDate = new Date($scope.datePicker.date.endDate._d).getTime();
            console.log(startDate, endDate);
            filterObj[$scope.dateRangeFilterType] = {$gte : startDate, $lte : endDate}
        }else if($scope.datePicker.date.startDate._d){
            filterObj[$scope.dateRangeFilterType] = {$gte : $scope.datePicker.date.startDate._d}
        }else if($scope.datePicker.date.endDate._d){
            filterObj[$scope.dateRangeFilterType] = {$lte : $scope.datePicker.date.endDate._d}
        }else{
            alert("Please Choose a date or range.");
            return;
        }


        $http.get("/api/v1/orders", {params :filterObj })
        .then(function(response){

            console.log(response.data);
            $scope.ordersData = response.data;
            // $scope.bulkAction = {
            //     bulkOrderChecked : []
            // }
        }, function(err){
            console.log(err);
            alert("Error: "+ err)
        })
        
    }

    $scope.reload = function(){
        location.reload();
    }

    $scope.downloadAsCSV = function(){
        var table = document.querySelector("table#main-table");
	        	var csvString = '';
	        	for(var i=0; i<table.rows.length;i++){
	        		var rowData = table.rows[i].cells;
	        		for(var j=0; j<rowData.length;j++){
                        console.log(csvString);
						if(["Approval Status" , "Hold" , "Approval" , "Not approval"].indexOf(rowData[j].innerText)>=0){
                            csvString = csvString + ",";
                            
							// csvString = csvString + rowData[j].querySelector("button[disabled]").innerText + ",";
						}else
	        			csvString = csvString + rowData[j].innerText + ",";
	        		}
	        		csvString = csvString.substring(0,csvString.length - 1);
	        		csvString = csvString + "\n";
			    }
	         	csvString = csvString.substring(0, csvString.length - 1);
	         	var a = $('<a/>', {
		            style:'display:none',
		            href:'data:application/octet-stream;base64,'+btoa(csvString),
		            download:'Order_List.csv'
		        }).appendTo('body');
		        a[0].click();
		        a.remove();
    }

    $scope.getRemarks = function(remarks){

        if(remarks.toLowerCase() == "none" || "no remarks"){
            return "";
        }

        return remarks;


    }


});