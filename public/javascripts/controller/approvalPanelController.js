app.controller("approvalPanelController", function($scope, $http, $q){

    $scope.orderData = orderData;

    $scope.productData = productData;

    $scope.bulkAction = {
        bulkOrderChecked : []
    }

    console.log( $scope.orderData,  $scope.productData);

    $scope.datePicker = { date: {startDate: null, endDate: null} };


    $scope.getDiffDays = function (delDate) {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(delDate);
        var secondDate = new Date();

        var diffDays = Math.round((secondDate.getTime() - firstDate.getTime()) / (oneDay));

        return diffDays;
    }

    $scope.getTotal = function(collection, column){

        var total = 0;
    
        collection.forEach(function (item) {
            total += parseInt(item[column]);
        });
    
        return total;
    
    }



    $scope.approveOrder= function(orderID, e, index){

        console.log(orderID, e.target, index);

        $http.put("/api/v1/orders/"+orderID, {status : "approval"})
        .then(function(response){
            console.log(response.data)
            location.reload();
        },
        function(err){
            alert(err)
        });

    };
    $scope.holdOrder= function(orderID, e, index){
        console.log(orderID, e.target, index);

        $http.put("/api/v1/orders/"+orderID, {status : "hold"})
        .then(function(response){
            // https://github.com/Akshay-Rana-Gujjar/mega_ppc_management.git
            console.log(response)
            // https://github.com/Akshay-Rana-Gujjar/mega_ppc_management.git
            location.reload();
        },
        function(err){
            alert(err)
        });
    };

    $scope.approvalFilter = function(approvalFilterSelection){

        

        console.log(approvalFilterSelection);
        var filterObj = {}

        if(approvalFilterSelection){
            filterObj.status = approvalFilterSelection
        }


        $http.get("/api/v1/orders", { params: filterObj })
        .then(function(response){

            console.log(response.data);
            $scope.orderData = response.data;

            $scope.bulkAction = {
                bulkOrderChecked : []
            }

        }, function(err){
            console.log(err);
            alert("Error: "+ err)
        })

    };

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
            $scope.orderData = response.data;
            $scope.bulkAction = {
                bulkOrderChecked : []
            }
        }, function(err){
            console.log(err);
            alert("Error: "+ err)
        })
        
    }

     
    $scope.$watchCollection("bulkAction.bulkOrderChecked", function(newVal, oldVal){
        // console.log(newVal, oldVal,"current length = "+ $scope.bulkAction.bulkOrderChecked.length);
        if($scope.bulkAction.bulkOrderChecked.length){
            $('#myModal').modal('show')
        }else{
            $('#myModal').modal('hide')
        }
    
    });

    $scope.bulkApproveOrder = function(){
        console.log($scope.bulkAction.bulkOrderChecked);
        var promiseList = []
        var seletedOrders = $scope.bulkAction.bulkOrderChecked;
        for (i in seletedOrders){
            console.log(seletedOrders[i]);
            var orderID = seletedOrders[i]
            promiseList.push($http.put("/api/v1/orders/"+orderID, {status : "approval"}));
        }  
        
        $q.all(promiseList)
        .then(function(response){
            console.log(response);
            alert("Marked Approved!");
            location.reload();
        },function(err){
            console.log(err);
        })

    };

    $scope.bulkHoldOrder = function(){
        console.log($scope.bulkAction.bulkOrderChecked);

        var promiseList = []
        var seletedOrders = $scope.bulkAction.bulkOrderChecked;

        for (i in seletedOrders){
            console.log(seletedOrders[i]);
            var orderID = seletedOrders[i]
            promiseList.push($http.put("/api/v1/orders/"+orderID, {status : "hold"}));
        }
        
        $q.all(promiseList)
        .then(function(response){
            console.log(response);
            alert("Marked Hold!");
            location.reload();
        },function(err){
            console.log(err);
        })

    }


    $scope.checkAll = function(){

        var bulkOrderChecked =  $scope.bulkAction.bulkOrderChecked;

        console.log(bulkOrderChecked);

        if(bulkOrderChecked.length){
            $scope.bulkAction.bulkOrderChecked = [];
        }else{
            $scope.bulkAction.bulkOrderChecked = $scope.orderData.map((data)=>data._id)
        }


    }

    $scope.reload = function(){
        location.reload();
    }


    $scope.getRemarks = function(remarks){

        if(remarks.toLowerCase() == "none" || "no remarks"){
            return "";
        }

        return remarks;


    }

});