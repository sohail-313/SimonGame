// The Idea of game is 
// 1.key is pressed
// 2.nextSequence is called, which will push some color in generatedPatternArray
// 3.now btn is clicked, which returns it's id(color), in userClickedPattern that color is pushed
// 4.initally userClickedPattern length = 1 which will be checked with generatedPatternArray[1] 
// 5.if both array length is same nextSequence is called
// 6.everytime nextSequence is called userClickedPattern array is recreated


var buttonColours = ["red", "blue", "green", "yellow"];

var generatedPatternArray = [];
var userClickedPattern = [];

var started = false; 
var level = 0;

function keyPress(){
    if(!started){
        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
    }
}
// $(document).keypress(function(){
//     if(!started){
//         $("#level-title").text("Level " + level)
//         nextSequence();
//         started = true;
//     }
// });


$(".btn").click(function(event) {
    // var userChosenColour = event.target.id;
    //                     or 
    var userChosenColour = $(this).attr("id")
   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);
   
   checkAnswer(userClickedPattern.length-1)
});

function nextSequence(){
    
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4) ;

    var randomChosenColour = buttonColours[randomNumber];

    generatedPatternArray.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3" );
        audio.play();
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100)

}

function checkAnswer(currentLevel){
    if(generatedPatternArray[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");

        if(userClickedPattern.length === generatedPatternArray.length){
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }

    }
    else{
        console.log("Failure");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        playSound("wrong");
        $("#level-title").text("Game Over, Press Start");
        startOver();
    }
}

function startOver(){
    setTimeout(function(){
        level--;

        if(level === -1)level = 0;

        alert("Your Score is " + level);
        level = 0;
        generatedPatternArray = [];
        started = false;
    }, 500)
    
}