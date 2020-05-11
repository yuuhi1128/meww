let isCatched = false;
let step = 0;

function randomCoordinate() {
  const MAX_X = 85;
  const MAX_Y = 86;

  return {
    x: Math.floor(Math.random() * MAX_X) + 1,
    y: Math.floor(Math.random() * MAX_Y) + 1
  }

}

function timeout(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function run() {
  await timeout(1000);

  let IMG = document.getElementById('cat');

  const translate = randomCoordinate();
  IMG.style.top = translate.x + '%';
  IMG.style.left = translate.y + '%';

  if (!isCatched && (step < 500)) {
    await run();
  }

  ++step;

  if (step >= 500) {
    await timeout(500);
    const isContinue = confirm('Game Over!\nDo you want to play a new game?');
    if (isContinue) {
      newGame();
      await run();
    }
  }
}

function catched() {
  const IMG = document.getElementById('cat');
  IMG.src = 'src/images/mew2.gif';
  IMG.style.width = '20%';
  IMG.style.height = '20%';
}

function newGame() {
  const IMG = document.getElementById('cat');
  IMG.src = 'src/images/mew1.gif';
  IMG.style.width = '15%';
  IMG.style.height = '15%';
  step = 0;
  isCatched = false;
}

async function onMouseDown() {
  isCatched = true;
  catched();
  await timeout(500);
  const isContinue = confirm('You Win!\nDo you want to play a new game?');
  if (isContinue) {
    newGame();
    await run();
  }
}

window.onload = async () => await run();