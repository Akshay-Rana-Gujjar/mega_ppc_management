app.controller("mainController", function ($scope, $http) {

  $scope.selectedObj = {};
  $scope.orderDate = {};
  $scope.grade = [{
    "name": "EN 36C"
  },
  {
    "name": "EN 24"
  },
  {
    "name": "EN-19"
  },
  {
    "name": "EN 47"
  },
  {
    "name": "EN-31 "
  },
  {
    "name": "EN 36C SPL"
  },
  {
    "name": "EN 353"
  },
  {
    "name": "4130"
  },
  {
    "name": "B-16"
  },
  {
    "name": "410"
  },
  {
    "name": "F-11"
  },
  {
    "name": "8620"
  },
  {
    "name": "42CrMo4"
  },
  {
    "name": "SA 105"
  },
  {
    "name": "4140"
  },
  {
    "name": "9Cr"
  },
  {
    "name": "13Cr"
  },
  {
    "name": "F-22"
  },
  {
    "name": "F-91"
  },
  {
    "name": "EN 8"
  },
  {
    "name": "H-11"
  },
  {
    "name": "H-13"
  },
  {
    "name": "EN-31"
  }];


  $scope.suspCondition = [{
    "name": "As Rolled"
  },
  {
    "name": "Anld"
  },
  {
    "name": "As Cast"
  }]

  $scope.parties = [
    {
      "name": "ALLOYS STEEL ENT."
    },
    {
      "name": "A.K. STEEL"
    },
    {
      "name": "A TO Z STEEL (MUM)"
    },
    {
      "name": "A TO Z STEEL (AHMD)"
    },
    {
      "name": "TATVA STEEL (A TO Z)"
    },
    {
      "name": "ARIHANT ISPAT"
    },
    {
      "name": "B.D. IMPEX"
    },
    {
      "name": "BMD (RANJAY)"
    },
    {
      "name": "CALCUTTA STEEL"
    },
    {
      "name": "DYNAMIC FLOW"
    },
    {
      "name": "FERROBEND"
    },
    {
      "name": "FASTINO (CAL)"
    },
    {
      "name": "H.D. INTERNATIONAL"
    },
    {
      "name": "H.D. INDUSTRIES"
    },
    {
      "name": "JAYPEE ALLOYS"
    },
    {
      "name": "KAMDHENU (AHMD)"
    },
    {
      "name": "KANODIA UDYOG"
    },
    {
      "name": "MIT INDUSTRIES"
    },
    {
      "name": "METAL FORGING"
    },
    {
      "name": "SHIVANSH STEEL (M.D.)"
    },
    {
      "name": "MADHUSUDAN FERROMETS"
    },
    {
      "name": "MICRO METAL"
    },
    {
      "name": "NAKOD METAL"
    },
    {
      "name": "NIRMAL STEEL"
    },
    {
      "name": "PRAKASH YANTRA"
    },
    {
      "name": "PATEL COIMBATORE"
    },
    {
      "name": "PRATIK STEEL"
    },
    {
      "name": "PARTH STEEL"
    },
    {
      "name": "PARVEEN IND. (Mum)"
    },
    {
      "name": "PARVEEN IND. (Kundali)"
    },
    {
      "name": "PARAG METALS"
    },
    {
      "name": "RONAK STEEL"
    },
    {
      "name": "RYTHME ALLOYS"
    },
    {
      "name": "ROTO PUMPS"
    },
    {
      "name": "SANDOZ METAL"
    },
    {
      "name": "SARAWATI ALLOYS"
    },
    {
      "name": "SHIVA ENGG."
    },
    {
      "name": "SACHIN STEEL"
    },
    {
      "name": "STEEL CO INDIA"
    },
    {
      "name": "STEEL TRADE"
    },
    {
      "name": "SURYA STEEL"
    },
    {
      "name": "S G ENTERPRISES"
    },
    {
      "name": "SHRI CHANANI ALLOYS"
    },
    {
      "name": "SOUTHERN STEEL"
    },
    {
      "name": "V. NATH"
    },
    {
      "name": "WINDLASS ENGG."
    }
  ];

  $('#orderDate').datepicker({
    uiLibrary: 'bootstrap4',
    format: 'dd mmm yyyy'
  });

  $('#deliveryDate').datepicker({
    uiLibrary: 'bootstrap4',
    format: 'dd mmm yyyy'
  });



  $scope.complete = function (string, dataArray) {

    var output = [];
    angular.forEach($scope.grade, function (gradeName) {
      console.log(gradeName.name.toLowerCase());
      if (gradeName.name.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
        output.push(gradeName.name);
      }
    });
    $scope.filterGrade = output;
  }
  $scope.fillTextbox = function (string) {
    $scope.orderDate.grade = string;
    $scope.filterGrade = null;
  }

  $scope.removeSuggestion = function () {
    setTimeout(function () {
      $scope.filterGrade = null;
    }, 500)

  }



  $scope.addOrder = function () {

    $scope.orderDate.order_date =   $('#orderDate').val();
    $scope.orderDate.delivery_date =  $('#deliveryDate').val(); 

    $http.post("/api/v1/orders", $scope.orderDate)
    .then(function(response){
        console.log(response.data);
        alert("Order Added!!");
        
    })
    .catch(function(err){
      console.log(err);
    })

  }
})