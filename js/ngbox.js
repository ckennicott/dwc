var box = angular.module("box", []);


box.controller("timerController", function($sce, $scope, $timeout){

  $scope.timerPromise = null;
  $scope.disableStart = false;
  $scope.minCount = 3;
  $scope.secCount = 0;
  $scope.intermission = false;
  $scope.roundCount = 1;
  $scope.intSecCount = 60;
  $scope.showIntermission = true;
  $scope.tone = new Audio('tone.wav');
  $scope.disableStop = true;
  $scope.disableRoll = true;
  $scope.timerHeading = "Round " + $scope.roundCount;
  $scope.showDice = false;

  $scope.countdown = function() {
    $scope.secCount--;
    $scope.timerHeading = "Round " + $scope.roundCount;
    if ($scope.secCount < 1 && $scope.minCount > 0) {
    	$scope.secCount = 59;
    	$scope.minCount--;
    	$scope.timerPromise = $timeout($scope.countdown, 1000);
    }
    else if ($scope.secCount > 0) {
    	$scope.timerPromise = $timeout($scope.countdown, 1000);
    }
    if ($scope.secCount < 1 && $scope.minCount < 1) {
    	$scope.minCount = 3;
  		$scope.secCount = 0;
  		$scope.roundCount++;
  		$scope.showIntermission = true;
  		$timeout.cancel($scope.timerPromise);
  		$scope.tone.play();
  		$scope.timerPromise = $timeout($scope.intermissionCountdown, 1000)
    }
    
  }

  $scope.intermissionCountdown = function() {
  	$scope.intSecCount--;
  	if ($scope.intSecCount < 1) {
  		$scope.showIntermission = true;
  		$scope.intSecCount = 60;
  		$timeout.cancel($scope.timerPromise);
  		$scope.tone.play();
  		$scope.timerPromise = $timeout($scope.countdown, 1000);
  	}
  	else {
  		$scope.timerPromise = $timeout($scope.intermissionCountdown, 1000);
  	}
  	
  }

  $scope.start = function() {
    $scope.disableStart = true;
    $scope.disableStop = false;
    $scope.disableRoll = false;
    $scope.tone.play();
    $scope.countdown();
  }
   $scope.stop = function() {
    $scope.disableStart = true;
    $scope.disableStop = false;
    $scope.disableRoll = true;
    $timeout.cancel($scope.timerPromise);
  }
   $scope.reset = function() {
    $timeout.cancel($scope.timerPromise);
    $scope.minCount = 3;
  	$scope.secCount = 0;
  	$scope.disableStart = false;
	  $scope.intermission = false;
	  $scope.showDice = false;
	  $scope.roundCount = 1;
	  $scope.showIntermission = true;
  }
  $scope.roll = function() {
  	$scope.showDice = true;
  	$scope.p1Die = Math.floor(Math.random() * (7 - 1) + 1);
  	$scope.p2Die = Math.floor(Math.random() * (7 - 1) + 1);
  }

});

box.filter('numberFixedLen', function () {
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
box.directive('navbar', function() {
  return {
    templateUrl: 'templates/navbar.html'
  };
});
box.directive('footer', function() {
  return {
    templateUrl: 'templates/footer.html'
  };
});

