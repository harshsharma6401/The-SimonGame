var gamePattern=[];
var userClickedPattern=[];
var level =-1;
var buttonColours = ["red","blue","green","yellow"];

function nextsequence(){
    level++;
     userClickedPattern=[];
    $("#level-title").text(" Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor =  buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(75).fadeIn(75); 
    playSound( randomChosenColor);
   
}

$(".btn").on("click",function(e){
    
    userChosenColor =$(this).attr("id");
    //console.log(e.target.id);         Alternate method

    userClickedPattern.push(userChosenColor);

    //console.log(userClickedPattern);
    playSound( userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name)
{
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
    
}

function animatePress(currentColor)
{
     $("#"+currentColor).addClass("pressed");
    
     setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}
var started= 0;
$(document).on("keypress",function(e){

    started++;

    if(started == 1)
    nextsequence();

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextsequence();
        }, 1000);
      }
    } else {
      gameOver();
      startOver();
    }
}

function startOver()
{
    level =-1;
    gamePattern =[];
    started = 0;

}
function gameOver()
{
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text(" Game Over, Press Any Key to Restart" );
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();

}

