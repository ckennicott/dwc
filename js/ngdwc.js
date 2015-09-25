var dwc = angular.module("dwc", []);

dwc.directive('navbar', function() {
  return {
    templateUrl: 'templates/navbar.html'
  };
});
dwc.directive('footer', function() {
  return {
    templateUrl: 'templates/footer.html'
  };
});