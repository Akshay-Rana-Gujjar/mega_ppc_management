app.controller("newOrderController", function ($scope, $http, $q) {

    $scope.customers = [];
    $scope.grades = [];
    $scope.newOrder = {};
    $scope.products = [
        { "name": "ingot" },
        { "name": "round bar" },
        { "name": "rcs bar" },
        { "name": "flat bar" },
    ]

    $scope.sup_cond = [
        { "name": "As Rolled" },
        { "name": "Annealed" },
        { "name": "As Cast" }
    ]

    $scope.sizes = {

        "round bar": [
            {
                "size": 32
            },
            {
                "size": 34
            },
            {
                "size": 36
            },
            {
                "size": 38
            },
            {
                "size": 40
            },
            {
                "size": 45
            },
            {
                "size": 50
            },
            {
                "size": 53
            },
            {
                "size": 56
            },
            {
                "size": 60
            },
            {
                "size": 63
            },
            {
                "size": 65
            },
            {
                "size": 66
            },
            {
                "size": 70
            },
            {
                "size": 75
            },
            {
                "size": 80
            },
            {
                "size": 85
            },
            {
                "size": 90
            },
            {
                "size": 95
            },
            {
                "size": 100
            },
            {
                "size": 105
            },
            {
                "size": 110
            },
            {
                "size": 118
            },
            {
                "size": 120
            },
            {

                "size": 125
            },
            {
                "size": 130
            },
            {
                "size": 142
            },
            {
                "size": 152
            },
            {
                "size": 156
            }
        ],
        "ingot": [
            {
                "size": "4x5"
            },
            {
                "size": "5.5x6.5"
            },
            {
                "size": "7x8"
            },
            {
                "size": "7.25x8.25"
            },
            {
                "size": "8x9"
            },
            {
                "size": "9x10"
            },
            {
                "size": "10x11"
            },
            {
                "size": "11x13"
            },
            {
                "size": "13x15"
            },
            {
                "size": "13x16.5"
            },
            {
                "size": "14x17"
            },
            {
                "size": "18x21"
            },
            {
                "size": "21x25"
            },
            {
                "size": "23x27"
            },
            {
                "size": "27x30"
            },
            {
                "size": "29x35"
            }

        ],
        "flat bar": [
            {
                "size": "50x16"
            },
            {
                "size": "50x20"
            },
            {
                "size": "50x25"
            },
            {
                "size": "65x16"
            },
            {
                "size": "65x20"
            },
            {
                "size": "65x25"
            },
            {
                "size": "65x30"
            },
            {
                "size": "65x75"
            },
            {
                "size": "65x100"
            },
            {
                "size": "125x12"
            },
            {
                "size": "125x16"
            },
            {
                "size": "125x20"
            },
            {
                "size": "125x25"
            },
        ],
        "rcs bar": [
            {
                "size": "63"
            },
            {
                "size": "75"
            },
            {
                "size": "100"
            },
            {
                "size": "110"
            },
            {
                "size": "125"
            },
        ]
    }

    $scope.orderData = [
        {
            grade: "",
            product: "",
            rate: "",
            size: "",
            quantity: "",
            piece: "",
            sup_condi: "",
            pyt: "",
            frtg: "",
            remarks: ""

        }
    ];

    $scope.mktCodes = [
        { code: "RG" },
        { code: "AG" },
        { code: "SG" },
        { code: "MHT" },
        { code: "BAUJI" }
    ]
    // key = weight, value = per piece/KG (weight)
    $scope.pieceData = {

        // round sizes
        "32": "35",
        "34": "35",
        "36": "35",
        "38": "42",
        "40": "62",
        "42": "62",
        "45": "62",
        "47": "62",
        "50": "62",
        "53": "62",
        "56": "125",
        "60": "125",
        "63": "86",
        "66": "172",
        "70": "172",
        "75": "172",
        "80": "172",
        "85": "172",
        "90": "280",
        "95": "335",
        "100": "335",
        "105": "335",
        "110": "445",
        "118": "572",
        "120": "572",
        "125": "572",
        "130": "572",
        "140": "710",
        "142": "710",
        "150": "710",
        "152": "710",
        "156": "710",
        "160": "710",
        // ingot sizes
        "4x5": "130",
        "5 1/2x6 1/2": "185",
        "7x8": "300",
        "7 1/4x8 1/4": "360",
        "8x9": "480",
        "9x10": "620",
        "10x11": "765",
        "11x13": "1300",
        "13x15": "1100",
        "13x16.5": "1550",
        "14x17": "1850",
        "18x21": "2600",
        "21x25": "4000",
        "23x27": "5150",
        "27x30": "6100",
        "29x35": "7600",

        // rcs size
        "63": "172",
        "75": "172",
        "100": "445",
        "110": "445",
        "125": "572",
    }



    $q.all({
        customers: $http.get("/api/v1/customers"),
        grades: $http.get("/api/v1/grades"),
        products: $http.get("/api/v1/products")

    }).then(function (responses) {
        $scope.customers = responses.customers.data;
        $scope.grades = responses.grades.data;
        // $scope.products = responses.products.data;

        console.log(responses)

        console.log($scope.customers, $scope.grades)

    });
    var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    $('#orderDate').datepicker({
        uiLibrary: 'bootstrap4',
        format: 'dd mmm yyyy',
        minDate : today
    });

    $("#poDate").datepicker({
        uiLibrary: 'bootstrap4',
        format: 'dd mmm yyyy'
    })

    $scope.initDatetime = function (arrayLength) {
        setTimeout(function () {
            for (i = 0; i < arrayLength; i++) {
                // console.log("arrayLength ", $('#orderDate' + i));
                // $('#orderDate' + i).datepicker({
                //     uiLibrary: 'bootstrap4',
                //     format: 'dd mmm yyyy'
                // });
                $('#deliveryDate' + i).datepicker({
                    uiLibrary: 'bootstrap4',
                    format: 'dd mmm yyyy',
                    minDate : today
                });
            }
        }, 500);
    }


    $scope.removeOrderRow = function ($index) {
        $scope.orderData.splice($index, 1);
    }

    $scope.addOrderRow = function () {
        $scope.orderData.push(
            {
                grade: "",
                product: "",
                size: "",
                quantity: "",
                sup_condi: "",


            }
        );
    }



    $scope.addOrderSubmit = function () {

        var requestArray = [];

        var orderData = $scope.orderData;

        console.log("before orderData =", orderData);

        for (i = 0; i < orderData.length; i++) {

            orderData[i].order_date = $('#orderDate').val();
            orderData[i].delivery_date = $('#deliveryDate' + i).val();
            orderData[i].product = orderData[i].product.name;
            orderData[i].customer_name = $scope.newOrder.customer_name;
            orderData[i].po_no = $scope.newOrder.po_no;
            orderData[i].po_date = $("#poDate").val();
            orderData[i].mkt = $scope.newOrder.mkt;
            orderData[i].pyt = $scope.newOrder.pyt;
            orderData[i].frtg = $scope.newOrder.frtg;

            requestArray.push($http.post("/new-order", orderData[i]));
        }

        console.log("orderData =", orderData);

        // return;
        $q.all(requestArray)
            .then(function (response) {
                console.log("response =", response);
                alert("Added!!");
                $scope.orderData = [
                    {
                        grade: "",
                        product: "",
                        rate: "",
                        size: "",
                        quantity: "",
                        piece: "",
                        sup_condi: "",
                        pyt: "",
                        frtg: "",
                        remarks: ""

                    }
                ];
            })

    }


    $scope.updateQuantity = function (index) {
        $scope.orderData[index].quantity =
            $scope.orderData[index].piece * $scope.pieceData[$scope.orderData[index].size];
    }

    $scope.updatePiece = function (index) {
        $scope.orderData[index].piece =
            Math.round($scope.orderData[index].quantity / $scope.pieceData[$scope.orderData[index].size]);
    }

});