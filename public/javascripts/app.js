var app = angular.module("MegaApp", ["angucomplete-alt", 'angular.filter', 'daterangepicker', "checklist-model"]);
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});