$('.colored').prop('disabled', true);
var randomColor =['red','yellow','green','blue']
var computerColor = [];
var userColor = [];
var userClick = 0;
var userInput = 1;
var chance = 0;
var highscore = 0;
var temp = 0;
var currentScore = 0;

$('.colored').on('click', function(){
    $('.colored').prop('disabled', true);
});

function game_start(){
    computerColor = [];
    temp = 1;
    currentScore = 0;
    $('.title').empty().append(`Let's Begin`);
    computer();
}

$('.start_game').on('click', function (){
    $('.start_game').prop('disabled', true);
    $(".m0").addClass("click-bsg");
    setTimeout(function (){
        $(".m0").removeClass("click-bsg");
    }, 1000);
    game_start();
});
$(document).on('keypress', function (event){
   if(event.key == 'a' || event.key == 'A' )
   {
    if(temp == 1 ){
        e.preventDefault();
    }
    game_start();
   }
});

function computer(){
    userColor = [];
    chance = 0;
    userInput = 1;
    $('.title').empty().append(`Wait`);
    var randomNumber=Math.floor(Math.random()*randomColor.length)
    var buttonClick = randomColor[randomNumber];
    var audio = new Audio("sounds/" + buttonClick + ".mp3");
    audio.play();
    $("." + buttonClick).addClass("click-" + buttonClick);
    setTimeout(function (){
        $('.colored').prop('disabled', false);
        $('.title').css('visibility','visible');
        $('.title').empty().append(`Click The First Color`);
        $("." + buttonClick).removeClass("click-" + buttonClick);
    }, 1000);
    computerColor.push(buttonClick);
    userClick = computerColor.length;
    currentScore++;
    $('.current').empty().append(`Current Score : <span>`+(currentScore-1)+`</span>`);
}



$('.colored').on('click', function(e){
    var userClickedColor = e.target.className;
    var parts = userClickedColor.split(' ');
    var userClickTrans = parts[0]; 
    userColor.push(userClickTrans);
    $("." + userClickTrans).addClass("click-" + userClickTrans);
    if(computerColor[chance]==userColor[chance]){
        var audio = new Audio("sounds/" + userClickTrans + ".mp3");
        audio.play();
        setTimeout(function (){
            $("." + userClickTrans).removeClass("click-" + userClickTrans);
            console.log(userInput);
            chance++;
            userInput++;
            if(userInput <= userClick){
                $('.colored').prop('disabled', false);
                $('.title').css('visibility','visible');
                $('.title').empty().append(`Click the Next Color`);
            }
            else{
                setTimeout(function (){            
                    computer();
                }, 500);
            }
        }, 500);
    }
    else{
        setTimeout(function (){
            $("." + userClickTrans).addClass("click-" + userClickTrans);
            $("." + userClickTrans).removeClass("click-" + userClickTrans);
        }, 500);
        var audio = new Audio("sounds/wrong.mp3");
            audio.play();
        if(currentScore > highscore){
            highscore = currentScore;
            highscore = highscore - 1;
        }
        $('.high').empty().append(`Highest Score : <span>`+(highscore)+`</span>`);
        $('.title').css('visibility','visible');
        if ($(window).width() > 700) {
            $('.title').empty().append(`Game Over!, Press A to Restart`); 
        } else {
            $('.title').empty().append(`Game Over!, Restart`); 
        }    
        temp = 0;
        $('.start_game').prop('disabled', false);
    }
});
