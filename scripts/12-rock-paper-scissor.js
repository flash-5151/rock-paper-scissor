let computerPick = "";
function computerMove() {
  let num = Math.random();

  if (num < 1 / 3) {
    computerPick = "rock";
  }
  if (num > 1 / 3 && num < 2 / 3) {
    computerPick = "paper";
  }
  if (num > 2 / 3) {
    computerPick = "scissor";
  }
  //console.log(computerPick);
}

let result = "";
let res = "";
let userchoice = "";
let Wins = 0;
let Losses = 0;
let Ties = 0;

let pastScore = JSON.parse(localStorage.getItem("savedScore"));
if (pastScore) {
  Wins = pastScore.Wins;
  Losses = pastScore.Losses;
  Ties = pastScore.Ties;
}

function gameStart(userpick) {
  userchoice = userpick;
  if (userpick === computerPick) {
    result = "Tie";
    Ties++;
  } else if (userpick === "rock" && computerPick === "scissor") {
    result = "You win";
    Wins++;
  } else if (userpick === "scissor" && computerPick === "paper") {
    result = "You win";
    Wins++;
  } else if (userpick === "paper" && computerPick === "rock") {
    result = "You win";
    Wins++;
  } else {
    result = "You lose";
    Losses++;
  }
}
function resetScore() {
  Wins = 0;
  Losses = 0;
  Ties = 0;
  localStorage.removeItem("savedScore");
}
function saveScore() {
  let score = {
    Wins: Wins,
    Losses: Losses,
    Ties: Ties,
    //same as Ties(one Ties enough)
  };
  localStorage.setItem("savedScore", JSON.stringify(score));
}
function display(rock, paper, scissor) {
  document.querySelector(".js-output1").innerHTML = result;
  let pic, pic2;
  if (userchoice === "rock") {
    pic = rock;
  }
  if (userchoice === "paper") {
    pic = paper;
  }
  if (userchoice === "scissor") {
    pic = scissor;
  }

  if (computerPick === "rock") {
    pic2 = rock;
  }
  if (computerPick === "paper") {
    pic2 = paper;
  }
  if (computerPick === "scissor") {
    pic2 = scissor;
  }

  document.querySelector(
    ".js-output2"
  ).innerHTML = `You <img src="${pic} " class='result-images'>    -     <img src=" ${pic2}" class='result-images'>  computer`;

  document.querySelector(
    ".js-output3"
  ).innerHTML = `Wins: ${Wins}, Losses: ${Losses}, Ties: ${Ties}`;
}
let autoGame = null;
function autoplay() {
  const play = document.querySelector(".Auto-play");
  if (play.innerText === "Auto-play") {
    play.innerHTML = "Stop-play";
    autoGame = setInterval(function () {
      computerMove();
      gameStart(userchoice);
      display(
        "images/rock-emoji.png",
        "images/paper-emoji.png ",
        "images/scissors-emoji.png"
      );
    }, 1000);
    play.classList.add("stop-play");
  } else {
    play.innerHTML = "Auto-play";
    clearInterval(autoGame);
    autoGame = null;
    play.classList.remove("stop-play");
  }
}
document.querySelector(".js-rock-event").addEventListener("click", () => {
  computerMove();
  gameStart("rock");

  display(
    "images/rock-emoji.png",
    "images/paper-emoji.png ",
    "images/scissors-emoji.png"
  );
  saveScore();
});
