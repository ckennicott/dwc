require('angular')
require('angular-route')
var Angularytics = require('angularytics')
var PageCtrl = require('./PageCtrl')
var phCtrl = require('./phCtrl')
var kcCtrl = require('./kcCtrl')
var boxCtrl = require('./boxCtrl')


var dwc = angular.module("dwc", [
	'ngRoute',
  'angularytics'
])


dwc.config(['AngularyticsProvider', function(AngularyticsProvider) {
  AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
  }])
  .run(['Angularytics', function(Angularytics) {
      Angularytics.init();
  }]);

dwc.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode(true)
  $locationProvider.hashPrefix('!')

}])


/**
 * Routes
 */
dwc.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  	// Home
    .when("/", {title: "Drunk With Chuck", templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Disclaimer
    .when("/disclaimer", {title: "Disclaimer - Drunk With Chuck", templateUrl: "partials/disclaimer.html", controller: "PageCtrl"})
    // Beer Pong
    .when("/beerpong", {title: "Beer Poing - Drunk With Chuck", templateUrl: "partials/beerpong.html", controller: "PageCtrl"})
    // Power Hour
    .when("/powerhour", {title: "Power Hour Timer - Drunk With Chuck", templateUrl: "partials/powerhour.html", controller: "phCtrl"})
    // Kings Cup
    .when("/kingscup", {title: "Kings Cup - Drunk With Chuck", templateUrl: "partials/kingscup.html", controller: "kcCtrl"})
    // Boxing
    .when("/boxing", {title: "Boxing - Drunk With Chuck", templateUrl: "partials/boxing.html", controller: "boxCtrl"})    
    // Privacy Policy
    .when("/privacy", {title: "Privacy Policy - Drunk With Chuck", templateUrl: "partials/privacy.html", controller: "PageCtrl"})
    // Flip Cup
    .when("/flipcup", {title: "Flip Cup - Drunk With Chuck", templateUrl: "partials/flipcup.html", controller: "PageCtrl"})           
    // 404
    .when("/404", {title: "Page Not Found - Drunk With Chuck", templateUrl: "partials/404.html", controller: "PageCtrl"})            
    // else 404
    .otherwise("/404", {title: "Page Not Found - Drunk With Chuck", templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

dwc.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);


/**
 * Directives
 */

dwc.directive('shotMeter', function() {
  return {
    templateUrl: 'templates/shot-meter.html'
  };
});
dwc.directive('secMeter', function() {
  return {
    templateUrl: 'templates/sec-meter.html'
  };
});

/**
 * Controllers
 */

dwc.controller('PageCtrl', ['$scope', PageCtrl])
dwc.controller('phCtrl', ['$sce', '$scope', '$timeout', phCtrl])
dwc.controller('kcCtrl', ['$sce', '$scope', '$timeout', kcCtrl])
dwc.controller('boxCtrl', ['$sce', '$scope', '$timeout', boxCtrl])


// /**
//  * Filters
//  */

dwc.filter('numberFixedLen', function () {
  return function (n, len) {
      var num = parseInt(n, 10);
      len = parseInt(len, 10);
      if (isNaN(num) || isNaN(len)) {
          return n;
      }
      num = ''+num;
      while (num.length < len) {
          num = '0'+num;
      }
      return num;
  };
});





