module.exports = function($sce, $scope, $timeout){
  
  $scope.secToGo = 60;
  $scope.shotToGo = 60;
  $scope.timerPromise = null;
  $scope.disableStart = false;
  $scope.hideJumbotron = false;
  $scope.hideMeters = false;
  $scope.showComplete = false;
  $scope.shotProgressStyle = {"background-image": "linear-gradient(90deg, #fff 50%, transparent 50%, transparent), linear-gradient(90deg, #222 50%, #fff 50%, #fff)"};
  $scope.secProgressStyle = {"background-image": "linear-gradient(90deg, #fff 50%, transparent 50%, transparent), linear-gradient(90deg, #222 50%, #fff 50%, #fff)"};
  $scope.tone = new Audio('../tone.wav');

  $scope.countdown = function() {
    if ($scope.secToGo < 1) {
      $scope.shotToGo -= 1;
      $scope.secToGo = 60;
      $scope.tone.play();
      if ((60- $scope.shotToGo) < 30) {
        nextdeg = 90 + (6 * (60 - $scope.shotToGo));
        $scope.shotProgressStyle = {"background-image": "linear-gradient(90deg, #fff 50%, transparent 50%, transparent), linear-gradient(" + nextdeg + "deg, #222 50%, #fff 50%, #fff)"};
      }
      else {
        nextdeg = -90 + (6 * -($scope.shotToGo - 30));
        $scope.shotProgressStyle = {"background-image": "linear-gradient(" + nextdeg + "deg, #222 50%, transparent 50%, transparent), linear-gradient(270deg, #222 50%, #fff 50%, #fff)"};
      }
    }

    $scope.secToGo -= 1;

    if ((60- $scope.secToGo) < 30) {
        nextdeg = 90 + (6 * (60 - $scope.secToGo));
        $scope.secProgressStyle = {"background-image": "linear-gradient(90deg, #fff 50%, transparent 50%, transparent), linear-gradient(" + nextdeg + "deg, #222 50%, #fff 50%, #fff)"};
    }
    else {
      nextdeg = -90 + (6 * -($scope.secToGo - 30));
      $scope.secProgressStyle = {"background-image": "linear-gradient(" + nextdeg + "deg, #222 50%, transparent 50%, transparent), linear-gradient(270deg, #222 50%, #fff 50%, #fff)"};
    }

    if ($scope.shotToGo == 0) {
      $scope.hideMeters = true;
      $scope.showComplete = true;
      $timeout.cancel(timerPromise);

    }
    else {
      $scope.timerPromise = $timeout($scope.countdown, 1000);
    }
    

  }

  $scope.start = function() {
    $scope.secToGo = 60;
    $scope.shotToGo = 59;
    $scope.tone.play();
    $scope.disableStart = true;
    $scope.hideJumbotron = true;
    $scope.hideMeters = false;
    $scope.showComplete = false;
    $scope.timerPromise = $timeout($scope.countdown, 1000);


  }

  $scope.stop = function() {
    $timeout.cancel($scope.timerPromise);
  }

  $scope.reset = function() {
    $timeout.cancel($scope.timerPromise);
    $scope.secToGo = 60;
    $scope.shotToGo = 59;
    $scope.timerPromise = null;
    $scope.disableStart = false;
    $scope.hideMeters = false;
    $scope.showComplete = false;
    $scope.shotProgressStyle = {"background-image": "linear-gradient(90deg, #fff 50%, transparent 50%, transparent), linear-gradient(90deg, #222 50%, #fff 50%, #fff)"};
    $scope.secProgressStyle = {"background-image": "linear-gradient(90deg, #fff 50%, transparent 50%, transparent), linear-gradient(90deg, #222 50%, #fff 50%, #fff)"};
  }

  // Cleanup timer promise
  $scope.$on("$destroy", function() {
    if ($scope.timerPromise) {
      $timeout.cancel($scope.timerPromise);
    };
  });

};