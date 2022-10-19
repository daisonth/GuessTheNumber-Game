`user strict`;

const input = document.querySelector(`.input`);

const btnPlus = document.querySelector(`.inc`);
const btnMinus = document.querySelector(`.dec`);
const btnCheck = document.querySelector(`.submit`);
const btnReload = document.querySelector(`.reload`);
const btnChangeMode = document.querySelector(`.mod`);

const textScore = document.querySelector(`.score`);
const textStatus = document.querySelector(`.status`);
const textOutput = document.querySelector(`.output`);
const textHighScore = document.querySelector(`.highscore`);

let highscore = 0;

newGame();
setBGColor();

const setBGColor = function () {
  if (localStorage.mode) {
    document.body.style.backgroundColor = localStorage.mode;
    btnChangeMode.src = `./src/${localStorage.mode}.png`;
  }
};

btnReload.addEventListener(`click`, newGame);

btnChangeMode.addEventListener(`click`, function () {
  document.body.style.transition = `0.5s`;
  if (localStorage.mode == `white`) {
    localStorage.mode = `black`;
  } else {
    localStorage.mode = `white`;
  }
  setBGColor();
});

btnPlus.addEventListener(`click`, function () {
  num = parseInt(input.value);
  checkOutOfBound(num);
  if (num + 1 < 21) input.value = `${++num}`;
});

btnMinus.addEventListener(`click`, function () {
  num = parseInt(input.value);
  checkOutOfBound(num);
  if (num - 1 > 0) input.value = `${--num}`;
});

// game login
btnCheck.addEventListener(`click`, function () {
  let num = input.value;
  if (num == random) {
    textOutput.innerText = `${random}`;
    textStatus.innerText = `correct :)`;
    document.documentElement.style.cssText = `--colo: lightgreen`;
    if (score > highscore) {
      highscore = score;
      sessionStorage.highscore = highscore;
      textHighScore.innerText = `HIGHSCORE : ${highscore}`;
      textStatus.innerHTML = `correct :)  NEW HIGHSCORE : ${highscore}`;
    }
  } else {
    --score;
    textScore.innerText = `SCORE : ${score}`;
    if (num < random) {
      if (num >= random - 2) textStatus.innerText = `low`;
      else textStatus.innerText = `too low`;
    } else {
      if (num <= random + 2) textStatus.innerText = `high`;
      else textStatus.innerText = `too high`;
    }
  }
});

const checkOutOfBound = function (n) {
  if (n > 20 || n < 1) input.value = `1`;
};

const newGame = function () {
  random = Math.floor(Math.random() * 19) + 1;
  score = 20;
  textOutput.innerText = `?`;
  textScore.innerText = `SCORE : ${score}`;
  input.value = `1`;
  textStatus.innerText = `Start Gussing...`;
  document.documentElement.style.cssText = `--colo: red`;
  console.log(random);
  if (sessionStorage.highscore) {
    highscore = parseInt(sessionStorage.highscore);
    textHighScore.innerText = `HIGHSCORE : ${highscore}`;
  }
};
