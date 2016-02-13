var dwc = angular.module("dwc", [
	'ngRoute',
  'angularytics'
]);

dwc.config(function(AngularyticsProvider) {
  AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
  })
  .run(function(Angularytics) {
    Angularytics.init();
});

dwc.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

});


/**
 * Routes
 */
dwc.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  	// Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Disclaimer
    .when("/disclaimer", {templateUrl: "partials/disclaimer.html", controller: "PageCtrl"})
    // Beer Pong
    .when("/beerpong", {templateUrl: "partials/beerpong.html", controller: "PageCtrl"})
    // Power Hour
    .when("/powerhour", {templateUrl: "partials/powerhour.html", controller: "phCtrl"})
    // Kings Cup
    .when("/kingscup", {templateUrl: "partials/kingscup.html", controller: "kcCtrl"})
    // Boxing
    .when("/boxing", {templateUrl: "partials/boxing.html", controller: "boxCtrl"})    
    // Privacy Policy
    .when("/privacy", {templateUrl: "partials/privacy.html", controller: "PageCtrl"})
    // Flip Cup
    .when("/flipcup", {templateUrl: "partials/flipcup.html", controller: "PageCtrl"})           
    // 404
    .when("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"})            
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
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
 * Controls all other Pages
 */
dwc.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");


});


/**
 * Controls the power hour timer
 */
dwc.controller("phCtrl", function($sce, $scope, $timeout){
  
  $scope.secToGo = 60;
  $scope.shotToGo = 60;
  $scope.timerPromise = null;
  $scope.disableStart = false;
  $scope.hideJumbotron = false;
  $scope.hideMeters = false;
  $scope.showComplete = false;
  $scope.shotProgressStyle = {"background-image": "linear-gradient(90deg, #F0F8FF 50%, transparent 50%, transparent), linear-gradient(90deg, #6495ED 50%, #F0F8FF 50%, #F0F8FF)"};
  $scope.secProgressStyle = {"background-image": "linear-gradient(90deg, #F0F8FF 50%, transparent 50%, transparent), linear-gradient(90deg, #6495ED 50%, #F0F8FF 50%, #F0F8FF)"};
  $scope.tone = new Audio('tone.wav');

  $scope.countdown = function() {
    if ($scope.secToGo < 1) {
      $scope.shotToGo -= 1;
      $scope.secToGo = 60;
      $scope.tone.play();
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
    $scope.shotProgressStyle = {"background-image": "linear-gradient(90deg, #F0F8FF 50%, transparent 50%, transparent), linear-gradient(90deg, #6495ED 50%, #F0F8FF 50%, #F0F8FF)"};
    $scope.secProgressStyle = {"background-image": "linear-gradient(90deg, #F0F8FF 50%, transparent 50%, transparent), linear-gradient(90deg, #6495ED 50%, #F0F8FF 50%, #F0F8FF)"};
  }

  // Cleanup timer promise
  $scope.$on("$destroy", function() {
    if ($scope.timerPromise) {
      $timeout.cancel($scope.timerPromise);
    };
  });

});


/**
 * Controls the Kings Cup app
 */

dwc.controller("kcCtrl", function($sce, $scope, $timeout){
  
  $scope.cardArray = [
		["Ace", "Waterfall", "The Player who drew this card begins to chug or sip, so then does everybody else. When the person who picked up the card stops drinking the person to their right can stop drinking. When that person stops drinking the person to their right can stop drinking. This goes to the end of the circle. Also known as Tom Ace"],
		[2, "You", "The Player who drew this card selects someone who then must drink."],
		[3, "Me", "The Player who drew this card must drink."],
		[4, "Whores", "Ladies and women drink."],
		[5, "Never have I ever", "Every Player holds up 5 fingers and the person who drew the card begins the questioning with a sentence \"Never have I ever.....\" Player must state something that he/she has never done. If any of the other players have done it then they lose a finger. 1st person to lose all five fingers they must drink."],
		[6, "Dicks", "Gentlemen or men drink."],
		[7, "Thumb Master", "The player who picks this card can place their thumb anywhere at any time and the last player to notice and place their thumb in the same position must drink. For example if you place your thumb on the person to your lefts' nose then all players must place their thumb on the nose of the player to the left. The last person to do this must drink."],
		[8, "Gambler's Fate", "When a player draws this card they must guess the colour of the next card. If they get it wrong, they drink. If they get it right, they give a drink to another player."],
		[9, "Bust a Rhyme", "The player who drew the 9 says a phrase, then the players go around in the circle saying phrases that rhyme with the original. No phrase may be said twice, the first player who can not come up with a phrase, or says a phrase that doesn't rhyme must drink."],
		[10, "Categories", "The player who drew the 10 picks a category such as \"sports teams\" or \"bands from the '90s,\" the players then go around in the circle saying items from that category, the first player who can not think of an item or says something not in the category (or if all items have been exhausted) must drink."],
		["Jack", "Last slap", "The player who drew the card can place their hand on the table anytime, the last person to place their hand on the table has to drink a second per player in the game."],
		["Queen", "Question Master", "Whoever draws this card becomes the \"Question Master\". Whenever they ask you a question, you must answer their question with another question, or else not answer them at all. If you answer a question with a statement, you must take one drink. This person is the \"Question Master\" until someone else draws a queen."],
		["King", "RuleMaster", "The 4th King drawn must drink the center cup. The first 3 King's may add drinks to the center cups as well as make a rule."]
	];
	
	$scope.previousCardsArray = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	
	$scope.suitArray = ["Hearts", "Diamonds", "Clubs", "Spades"];

	$scope.cardCount = 52;
	$scope.kingCount = 4;
	$scope.hideCard = false;
	$scope.currentCardNum = 0;
	$scope.currentSuitNum = 0;
	
	$scope.draw = function() {
			$scope.hideCard = true;
			$scope.foundCard = false;
			while ($scope.foundCard == false) {
				
				// Pick a card number
				$scope.currentCardNum = Math.floor(Math.random() * 13);
				
				// Pick a suit
				$scope.currentSuitNum = Math.floor(Math.random() * 4);
			
				// Make sure the card number hasn't been drawn before
				if ($scope.previousCardsArray[$scope.currentSuitNum][$scope.currentCardNum] == 0) {
					// Valid card found
					$scope.foundCard = true;
					
					// Mark the current card used
					$scope.previousCardsArray[$scope.currentSuitNum][$scope.currentCardNum] = 1;
					
					// Incriment the card counter
					$scope.cardCount--;
					
					// Incriment king counter if neccesary
					if ($scope.currentCardNum == 12) {
						if ($scope.kingCount == 1) {
							// triker popover for last kings cup
							$scope.kingCount--
						}
						else {
							$scope.kingCount--
						}
				    
					}

					// Update page content
					$scope.cardTitle = $scope.cardArray [$scope.currentCardNum][0] + " - " + $scope.cardArray[$scope.currentCardNum][1];
					
					$scope.cardDescription = $scope.cardArray [$scope.currentCardNum][2];
					
					$scope.cardImg = "img/cards/" + $scope.cardArray [$scope.currentCardNum][0].toString().toLowerCase() + $scope.suitArray[$scope.currentSuitNum].toString().toLowerCase() + ".svg";			
					if ($scope.cardCount == 0) {
						
						// Trigger popover with play again button
						$scope.reset();
						
					}
				}
			}			
		}

	$scope.reset = function() {
		//reset game
		$scope.hideCard = false;
		$scope.previousCardsArray = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  	];
		$scope.cardCount = 52;
		$scope.kingCount = 4;
		$scope.cardTitle = "";
		$scope.cardDescription = "";

	}

});

/**
 * Controlles the Boxing app
 */


dwc.controller("boxCtrl", function($sce, $scope, $timeout){

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

  // Cleanup timer promise
  $scope.$on("$destroy", function() {
    if ($scope.timerPromise) {
      $timeout.cancel($scope.timerPromise);
    };
  });

});


/**
 * Filters
 */

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





