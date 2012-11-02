$(document).ready(function(){
    
    var stopButton;
    var currentSelection;
    var previousSelection;
    var selectionDifference;
    var shotsToGo;
    var counterHTML;
    var secondsCountdownHTML;
    var shotBarProgress = 0;
    var secToGo = 0;
    var audio = $("#beer-sound")[0];
    var secondsTimeout;



    $(".start-button").click(function() {

        audio.play();

        if (currentSelection == null)
        {
            secToGo = 1;
            currentSelection = $(this).val();
            shotsToGo = currentSelection - 1;

    		counterHTML = "<h3>" + shotsToGo + " shots to go!</h3>";
    		$("#counter").html(counterHTML);
    		shotBarProgress = (1 / currentSelection) * 100;
    		$("#game-progress-bar").progress(shotBarProgress);

    		$("#next-shot-progress-bar").progress((secToGo / 60) * 100);
    		secondsCountdownHTML = "<h4>Next shot in " + (60 - secToGo) + " seconds.</h4>";
    		$("#seconds-countdown-div").html(secondsCountdownHTML);

    		(function secondsCountdown() {
            	secondsTimeout = setTimeout(function() {

            		if (secToGo++ <60){
            			$("#next-shot-progress-bar").progress((secToGo / 60) * 100);
            			secondsCountdownHTML = "<h4>Next shot in " + (60 - secToGo) + " seconds.</h4>";
            			$("#seconds-countdown-div").html(secondsCountdownHTML);
            		    secondsCountdown();

            		}

            	}, 1000);

            })();

        }

        else if ($(this).val() != currentSelection)
        {

            previousSelection = Math.abs(currentSelection);

            currentSelection = $(this).val();
            selectionDifference = currentSelection - previousSelection;
    	    shotsToGo = shotsToGo + selectionDifference;
    	    counterHTML = "<h3>" + shotsToGo + " shots to go!</h3>";
    		$("#counter").html(counterHTML);
    	    clearTimeout(stopButton);
    	    clearTimeout(secondsTimeout);

    	    secToGo = 1;
    	    $("#next-shot-progress-bar").progress((secToGo / 60) * 100);
    		secondsCountdownHTML = "<h4>Next shot in " + (60 - secToGo) + " seconds.</h4>";
    		$("#seconds-countdown-div").html(secondsCountdownHTML);
		
    		shotBarProgress = ((currentSelection - shotsToGo) / currentSelection) * 100;
            $("#game-progress-bar").progress(shotBarProgress);

    		(function secondsCountdown() {

            	secondsTimeout = setTimeout(function() {

            		if (secToGo++ <60){

            			$("#next-shot-progress-bar").progress((secToGo / 60) * 100);
            			secondsCountdownHTML = "<h4>Next shot in " + (60 - secToGo) + " seconds.</h4>";
            			$("#seconds-countdown-div").html(secondsCountdownHTML);
            		    secondsCountdown();

            		}

            	}, 1000);

            })();

        }

        if (currentSelection == 30) {

            $("#start-button-30").addClass("disabled").prop("disabled",true);

        }

        else if (currentSelection == 60) {

            $("#start-button-30").addClass("disabled").prop("disabled",true);
            $("#start-button-60").addClass("disabled").prop("disabled",true);

        }

        else if (currentSelection == 100) {

            $("#start-button-30").addClass("disabled").prop("disabled",true);
            $("#start-button-60").addClass("disabled").prop("disabled",true);
            $("#start-button-100").addClass("disabled").prop("disabled",true);

        }

        $("#stop").prop("disabled",false).removeClass("disabled");

    	document.getElementById('beer-sound').play();

        $('html, body').animate({

            scrollTop: $("#counter-section").offset().top

         }, 500);


        (function countDown() {


          stopButton = setTimeout(function() {

              clearTimeout(secondsTimeout);
              secToGo = 1;
              $("#next-shot-progress-bar").progress((secToGo / 60) * 100);
              counterHTML = "<h3>" + shotsToGo + " shots to go!</h3>";
                $("#counter").html(counterHTML);
                audio.play();
                shotBarProgress = ((currentSelection - shotsToGo) / currentSelection) * 100;
                $("#game-progress-bar").progress(shotBarProgress);

            if (shotsToGo-- > 0) {

          

              (function secondsCountdown() {

              	secondsTimeout = setTimeout(function() {

              		if (secToGo++ < 60) {

              			$("#next-shot-progress-bar").progress((secToGo / 60) * 100);
              			secondsCountdownHTML = "<h4>Next shot in " + (60 - secToGo) + " seconds.</h4>";
            			$("#seconds-countdown-div").html(secondsCountdownHTML);
              		secondsCountdown();

              		}

              	}, 1000);

              	$("#next-shot-progress-bar").progress((secToGo / 60) * 100);
      			secondsCountdownHTML = "<h4>Next shot in " + (60 - secToGo) + " seconds.</h4>";
    			$("#seconds-countdown-div").html(secondsCountdownHTML);

              })();

              countDown();

            }

          }, 60000);

        })();

    });

    $("#stop").click(function() {
    
        $('html, body').animate({
            scrollTop: 0
         }, 700);

        $("#stop").prop("disabled",true).addClass("disabled");
    	clearTimeout(stopButton)

    	stopButton = null;
        currentSelection = null;
        previousSelection = null;
        selectionDifference = null;
        shotsToGo = null;
    

        $("#start-button-30").removeClass("disabled").prop("disabled",false);
        $("#start-button-60").removeClass("disabled").prop("disabled",false);
        $("#start-button-100").removeClass("disabled").prop("disabled",false);
    
        counterHTML = "";
        $("#counter").html(counterHTML);
        $("#game-progress-bar").progress(0);

        secToGo = 0;
        $("#next-shot-progress-bar").progress((secToGo / 60) * 100);
    	secondsCountdownHTML = "<h4>Next shot in " + (60 - secToGo) + " seconds.</h4>";
    	$("#seconds-countdown-div").html(secondsCountdownHTML);
    	clearTimeout(secondsTimeout);

    });
})
