var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = true;
// Keydown Event
$(document).keydown(function() {
  if (started === true) {
    nextSequence();
    $("h1").text("Level " + level);;
    started = !true;
  }
});
// Click Event
$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
// CheckAnswer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("h1").text("Game Over, Press Any Key to Restart")
    started = true;
    $("body").addClass("game-over");
    playSound("wrong");
    startOver();
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    gamePattern = [];
    level = 0;
  }
}
// Game
function nextSequence(currentLevel) {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  userClickedPattern = [];
  gamePattern.push(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    level = 0;
  }
}
// Start Over
function startOver() {
  level = 0;
}
// Animation Click Event
function animatePress(currentColour) {
  var activeButton = $("#" + currentColour);
  activeButton.addClass("pressed");
  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);
}
// Sound setup
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
