`user strict`;

// dark mode handler
toggleBGColor();
function toggleBGColor() {
  if (localStorage.mode) {
    document.body.style.backgroundColor = localStorage.mode;
    document.querySelector(`.mod`).src = `./src/${localStorage.mode}.png`;
  }
}
//On click toggle backgroundColor and button logo and also store the change in browser memory
document.querySelector(`.mod`).addEventListener(`click`, function () {
  document.body.style.transition = `0.5s`;
  if (localStorage.mode == `white`) {
    localStorage.mode = `black`;
  } else {
    localStorage.mode = `white`;
  }
  toggleBGColor();
});

// initializing...
let random = Math.floor(Math.random() * 19) + 1;
let score = 20;
let highscore = 0;
if (sessionStorage.highscore) {
  highscore = parseInt(sessionStorage.highscore);
  document.querySelector(`.highscore`).innerText = `HIGHSCORE : ${highscore}`;
}
console.log(random);

// game login
document.querySelector(`.submit`).addEventListener(`click`, function () {
  let num = document.querySelector(`.input`).value;
  if (num == random) {
    document.querySelector(`.output`).innerText = `${random}`;
    document.querySelector(`.status`).innerText = `correct :)`;
    document.documentElement.style.cssText = `--colo: lightgreen`;
    if (score > highscore) {
      highscore = score;
      sessionStorage.highscore = highscore;
      document.querySelector(
        `.highscore`
      ).innerText = `HIGHSCORE : ${highscore}`;
      document.querySelector(
        `.status`
      ).innerHTML = `correct :)  NEW HIGHSCORE : ${highscore}`;
    }
  } else {
    --score;
    document.querySelector(`.score`).innerText = `SCORE : ${score}`;
    if (num < random) {
      if (num >= random - 2)
        document.querySelector(`.status`).innerText = `low`;
      else document.querySelector(`.status`).innerText = `too low`;
    } else {
      if (num <= random + 2)
        document.querySelector(`.status`).innerText = `high`;
      else document.querySelector(`.status`).innerText = `too high`;
    }
  }
});

// handle + button
document.querySelector(`.inc`).addEventListener(`click`, function () {
  num = parseInt(document.querySelector(`.input`).value);
  checkOutOfBound(num);
  if (num + 1 < 21) document.querySelector(`.input`).value = `${++num}`;
});

// handle - button
document.querySelector(`.dec`).addEventListener(`click`, function () {
  num = parseInt(document.querySelector(`.input`).value);
  checkOutOfBound(num);
  if (num - 1 > 0) document.querySelector(`.input`).value = `${--num}`;
});

function checkOutOfBound(n) {
  if (n > 20 || n < 1) document.querySelector(`.input`).value = `1`;
}

//reset everything
document.querySelector(`.reload`).addEventListener(`click`, function () {
  random = Math.floor(Math.random() * 19) + 1;
  score = 20;
  document.querySelector(`.output`).innerText = `?`;
  document.querySelector(`.score`).innerText = `SCORE : ${score}`;
  document.querySelector(`.input`).value = `1`;
  document.querySelector(`.status`).innerText = `Start Gussing...`;
  document.documentElement.style.cssText = `--colo: red`;
  console.log(random);
});
