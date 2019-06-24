app.controller("rollingController", function ($scope, $http, $q) {

    $scope.products = [
        { "name": "Square" },
        { "name": "Round" },
        { "name": "RCS" },
        { "name": "Flat" },
    ];


    $scope.rolling = {};


    $scope.rollingData = [{
        shape:"",
        input_size:"",
        ingot_pcs:"",
        output_size:"",
        heat_no:"",
        pieces:"",
        weight:""
    }];


    $scope.addMoreSize = function () {

        $scope.rollingData.push({
            shape:"",
            input_size:"",
            ingot_pcs:"",
            output_size:"",
            heat_no:"",
            pieces:"",
            weight:""
        });

    };


    $scope.sizes = {
        "NGI" : {
            "Round":{
                "4x5":[32,36,40,42,45,47,50,53,56,60],
                "5 1/2x6 1/2":[63,66,70,75,80,85],
                "7x8":[90],
                "7 1/4x8 1/4":[95,100,105],
                "8x9":[110],
                "9x10":[118,125,130],
                "10x11":[142,152,156,170]
            },
            "RCS":{
                "5 1/2x6 1/2":[63,75],
                "8x9":[100,110],
                "9x10":[125]
            },
            "Square":{
                "4x5":[32,38,40,42,50]
            },
            "Flat":{
                "4x5":["50x16", "50x20", "50x25", "65x16", "65x20", "65x25", "65x30", "65x75", "65x100", "125x12", "125x16", "125x25"]
            }
        },

        "Raghu":{
            "Round":{
                "4x5":[32,34,36,38,40,42,45,47,50,53,56,60],
                "5 1/2x6 1/2":[63,66,70,75,80,85],
                "7x8":[90],
                "7 1/4x8 1/4":[100,110,118,125],
                "8x9":[118,125]

            }
        },

        "Kisco":{
            "Round":{
                "9x10":[120,125,130],
                "10x11":[140,142,150,152,156,160],
                "11x13":[140],
                "13x15":[170,180]
            }
        }
    }


    $scope.ingot_input_size = [
        {size:"4x5"},
        {size:"5 1/2x6 1/2"},
        {size:"7x8"},
        {size:"7 1/4x8 1/4"},
        {size:"8x9"},
        {size:"9x10"},
        {size:"10x11"},
        {size:"11x13"},
        {size:"13x15"},
        {size:"14x17"},
        {size:"18x21"},
        {size:"21x25"},
        {size:"23x27"},
        {size:"27x30"},
        {size:"28x34"}
    ];





    $scope.submitRollingData = function(){
        console.log($scope.rolling, $scope.rollingData);
        var requestArray = [];
        var rollingData = $scope.rollingData;

        for(i=0; i < rollingData.length;i++){
            rollingData[i].party = $scope.rolling.party;
            rollingData[i].challan_no = $scope.rolling.challan_no;
            rollingData[i].status = "out";
            
            requestArray.push($http.post("/rolling-out", rollingData[i]));

        }

        console.log("rollingData = ", rollingData, requestArray);

        $q.all(requestArray)
        .then(function (response) {
            console.log("response =",response);
            alert("Added!!");
        });
    };


    //======================== Rolling In ==================

    $scope.disableRollingInSubmit = false;

    





})