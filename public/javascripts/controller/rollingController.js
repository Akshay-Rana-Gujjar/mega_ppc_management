app.controller("rollingController", function ($scope, $http, $q) {

    $scope.products = [
        { "name": "Square" },
        { "name": "Round bar" },
        { "name": "RCS" },
        { "name": "Flat" },
    ];


    $scope.rolling = {};

    $scope.parseInt = parseInt;


    $scope.rollingData = [{
        shape: "",
        ingot_size: "",
        ingot_weight: "",
        grade: "",
        ingot_pcs: "",
        heat_no: "",
        pieces: "",
        weight: "",
        shape_size: "",
    }];

    $q.all({
        // customers: $http.get("/api/v1/customers"),
        grades: $http.get("/api/v1/grades"),
        rolling: $http.get('/api/v1/rolling')
        // products: $http.get("/api/v1/products")

    }).then(function (responses) {

        $scope.grades = responses.grades.data;

        console.log("rolling.data = ", responses.rolling.data);

        $scope.allRollingData = responses.rolling.data;
        console.log("$scope.allRollingData = ", $scope.allRollingData)


    });

    $scope.addMoreSize = function () {

        $scope.rollingData.push({
            shape: "",
            ingot_size: "",
            ingot_weight: "",
            grade: "",
            ingot_pcs: "",
            heat_no: "",
            pieces: "",
            weight: "",
            shape_size: "",
        });

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })

    };


    $scope.sizes = {
        "NGI": {
            "Round bar": {
                "4x5": [32, 36, 40, 42, 45, 47, 50, 53, 56, 60],
                "5.5x6.5": [63, 66, 70, 75, 80, 85],
                "7x8": [90],
                "7.25x8.25": [95, 100, 105],
                "8x9": [110],
                "9x10": [118, 125, 130],
                "10x11": [142, 152, 156, 170]
            },
            "RCS": {
                "5.5x6.5": [63, 75],
                "8x9": [100, 110],
                "9x10": [125]
            },
            "Square": {
                "4x5": [32, 38, 40, 42, 50]
            },
            "Flat": {
                "4x5": ["50x16", "50x20", "50x25", "65x16", "65x20", "65x25", "65x30", "65x75", "65x100", "125x12", "125x16", "125x25"]
            }
        },

        "Raghu": {
            "Round bar": {
                "4x5": [32, 34, 36, 38, 40, 42, 45, 47, 50, 53, 56, 60],
                "5.5x6.5": [63, 66, 70, 75, 80, 85],
                "7x8": [90],
                "7.25x8.25": [100, 110, 118, 125],
                "8x9": [118, 125]

            }
        },

        "Kisco": {
            "Round bar": {
                "9x10": [120, 125, 130],
                "10x11": [140, 142, 150, 152, 156, 160],
                "11x13": [140],
                "13x15": [170, 180]
            }
        }
    }


    $scope.ingot_input_size = [
        { size: "4x5", weight: "130" },
        { size: "5.5x6.5", weight: "185" },
        { size: "7x8", weight: "300" },
        { size: "7.25x8.25", weight: "360" },
        { size: "8x9", weight: "480" },
        { size: "9x10", weight: "620" },
        { size: "10x11", weight: "765" },
        { size: "11x13", weight: "1300" },
        { size: "13x15", weight: "1100" },
        { size: "14x17", weight: "1700" },
        { size: "18x21", weight: "2100" },
        { size: "21x25", weight: "4000" },
        { size: "23x27", weight: "5150" },
        { size: "27x30", weight: "6100" },
        { size: "28x34", weight: "7600" }
    ];


    $scope.calculateTotalWeight = function (weight, piece) {

        console.log("weight = ", weight, piece);
        return parseInt(weight) * parseInt(piece);
    }


    $scope.submitRollingData = function () {
        console.log($scope.rolling, $scope.rollingData);
        var requestArray = [];
        var rollingData = $scope.rollingData;

        for (i = 0; i < rollingData.length; i++) {
            rollingData[i].rolling_mill = $scope.rolling.rolling_mill;
            rollingData[i].challan_no = $scope.rolling.challan_no;
            rollingData[i].status = "out";
            rollingData[i].ingot_weight = rollingData[i].input_size.weight;
            rollingData[i].ingot_size = rollingData[i].input_size.size;


            requestArray.push($http.post("/rolling-out", rollingData[i]));

        }

        console.log("rollingData = ", rollingData, requestArray);

        $q.all(requestArray)
            .then(function (response) {
                console.log("response =", response);

                $q.all({
                    // customers: $http.get("/api/v1/customers"),
                    
                    rolling: $http.get('/api/v1/rolling')
                    // products: $http.get("/api/v1/products")
            
                }).then(function (responses) {
            
                   
            
                    console.log("rolling.data = ", responses.rolling.data);
            
                    $scope.allRollingData = responses.rolling.data;
                    console.log("$scope.allRollingData = ", $scope.allRollingData)
            
            
                });

                alert("Added!!");
            });
    };


    $scope.downloadAsCSV = function () {
        var table = document.querySelector("table#main-table");
        var csvString = '';
        for (var i = 0; i < table.rows.length; i++) {
            var rowData = table.rows[i].cells;
            for (var j = 0; j < rowData.length; j++) {
                console.log(csvString);
                if (["Approval Status", "Hold", "Approval", "Not approval"].indexOf(rowData[j].innerText) >= 0) {
                    csvString = csvString + ",";

                    // csvString = csvString + rowData[j].querySelector("button[disabled]").innerText + ",";
                } else
                    csvString = csvString + rowData[j].innerText + ",";
            }
            csvString = csvString.substring(0, csvString.length - 1);
            csvString = csvString + "\n";
        }
        csvString = csvString.substring(0, csvString.length - 1);
        var a = $('<a/>', {
            style: 'display:none',
            href: 'data:application/octet-stream;base64,' + btoa(csvString),
            download: 'Order_List.csv'
        }).appendTo('body');
        a[0].click();
        a.remove();
    }


    $scope.exportTableToExcel = function exportTableToExcel(tableID, filename = ''){
        var downloadLink;
        var dataType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById(tableID);
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
        
        // Specify file name
        filename = filename?filename+'.xls':'excel_data.xls';
        
        // Create download link element
        downloadLink = document.createElement("a");
        
        document.body.appendChild(downloadLink);
        
        if(navigator.msSaveOrOpenBlob){
            var blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob( blob, filename);
        }else{
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        
            // Setting the file name
            downloadLink.download = filename;
            
            //triggering the function
            downloadLink.click();
        }
    }


    //======================== Rolling In ==================

    $scope.disableRollingInSubmit = false;

    $scope.rollingIn = {};

    $scope.showRollingDataByHeat = function(){
    
        $http.get("api/v1/rolling" , {params : {heat_no: $scope.rollingIn.heat}})
        .then(response=>{
            console.log("rollingDataByHeat = ", response.data);

            $scope.rollingDataByHeat = response.data

        });
    }

    $scope.addRollingInData = function(){

        $http.post("api/v1/rolling-in", $scope.rollingIn)
        .then(response=>{

            console.log(response.data);
            alert("added");

        });



    }

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
});

