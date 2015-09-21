var phr = angular.module("phr", []);

phr.controller("timerController", function($sce, $scope, $timeout){
  
  $scope.secToGo = 60;
  $scope.shotToGo = 60;
  $scope.timerPromise = null;
  $scope.disableStart = false;
  $scope.shotProgressStyle = {"background-image": "linear-gradient(90deg, #F0F8FF 50%, transparent 50%, transparent), linear-gradient(90deg, #6495ED 50%, #F0F8FF 50%, #F0F8FF)"};
  $scope.secProgressStyle = {"background-image": "linear-gradient(90deg, #F0F8FF 50%, transparent 50%, transparent), linear-gradient(90deg, #6495ED 50%, #F0F8FF 50%, #F0F8FF)"};


  $scope.countdown = function() {
    if ($scope.secToGo < 1) {
      $scope.shotToGo -= 1;
      $scope.secToGo = 61;



      if ((60- $scope.shotToGo) < 30) {
        nextdeg = 90 + (6 * (60 - $scope.shotToGo));
        $scope.shotProgressStyle = {"background-image": "linear-gradient(90deg, #F0F8FF 50%, transparent 50%, transparent), linear-gradient(" + nextdeg + "deg, #6495ED 50%, #F0F8FF 50%, #F0F8FF)"};
      }
      else {
        nextdeg = -90 + (6 * -($scope.shotToGo - 30));
        $scope.shotProgressStyle = {"background-image": "linear-gradient(" + nextdeg + "deg, #6495ED 50%, transparent 50%, transparent), linear-gradient(270deg, #6495ED 50%, #F0F8FF 50%, #F0F8FF)"};
      }
    }



    $scope.secToGo -= 1;

    if ((60- $scope.secToGo) < 30) {
        nextdeg = 90 + (6 * (60 - $scope.secToGo));
        $scope.secProgressStyle = {"background-image": "linear-gradient(90deg, #F0F8FF 50%, transparent 50%, transparent), linear-gradient(" + nextdeg + "deg, #6495ED 50%, #F0F8FF 50%, #F0F8FF)"};
    }
    else {
      nextdeg = -90 + (6 * -($scope.secToGo - 30));
      $scope.secProgressStyle = {"background-image": "linear-gradient(" + nextdeg + "deg, #6495ED 50%, transparent 50%, transparent), linear-gradient(270deg, #6495ED 50%, #F0F8FF 50%, #F0F8FF)"};
    }

    if ($scope.shotToGo == 0) {
      $timeout.cancel(timerPromise);
    }
    else {
      $scope.timerPromise = $timeout($scope.countdown, 10);
    }
    


  }

  $scope.start = function() {
    $scope.disableStart = true;
    $scope.timerPromise = $timeout($scope.countdown, 10);
  }

  $scope.stop = function() {
    $timeout.cancel($scope.timerPromise);
  }

  $scope.reset = function() {
    $timeout.cancel($scope.timerPromise);
    $scope.secToGo = 60;
    $scope.shotToGo = 60;
    $scope.timerPromise = null;
    $scope.disableStart = false;
    $scope.shotProgressStyle = {"background-image": "linear-gradient(90deg, #F0F8FF 50%, transparent 50%, transparent), linear-gradient(90deg, #6495ED 50%, #F0F8FF 50%, #F0F8FF)"};
    $scope.secProgressStyle = {"background-image": "linear-gradient(90deg, #F0F8FF 50%, transparent 50%, transparent), linear-gradient(90deg, #6495ED 50%, #F0F8FF 50%, #F0F8FF)"};
  }

});

