const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const TIMER_TIMEOUT = 1000;
let timerId;

const onBtnStartHandler = event => {
  btnStart.disabled = true;
  body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, TIMER_TIMEOUT);
};

const onBtnStopHandler = event => {
  btnStart.disabled = false;
  clearInterval(timerId);
};

btnStart.addEventListener('click', onBtnStartHandler);
btnStop.addEventListener('click', onBtnStopHandler);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
