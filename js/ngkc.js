var kc = angular.module("kc", []);

phr.controller("timerController", function($sce, $scope, $timeout){
  
    var cardArray = [
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
	["Jack", "Last slap", "The player who drew the card can place the card on the table anytime, and the last person to place their hand on the card has to drink a second per player in the game."],
	["Queen", "Question Master", "Whoever draws this card becomes the \"Question Master\". Whenever they ask you a question, you must answer their question with another question, or else not answer them at all. If you answer a question with a statement, you must take one drink. This person is the \"Question Master\" until someone else draws a queen."],
	["King", "RuleMaster", "The 4th King drawn must drink the center cup. The first 3 King's may add drinks to the center cups as well as make a rule."]
	];
	
	var previousCardsArray = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	
	var suitArray = ["Hearts", "Diamonds", "Clubs", "Spades"];

});