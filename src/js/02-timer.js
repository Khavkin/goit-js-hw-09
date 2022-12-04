import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timerDate;
let timerId;

Notify.init({
  position: 'center-top',
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timerDate = selectedDates[0];
    // console.log(convertMs(selectedDates[0] - Date.now()));
    if (Date.now() < timerDate) btnStart.disabled = false;
    else {
      btnStart.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
  },
};

const editDateTime = document.querySelector('#datetime-picker');
const timer = [...document.querySelectorAll('.timer .value')];
const btnStart = document.querySelector('button[data-start]');

const onClickHandler = event => {
  if (timerDate - Date.now() > 0) {
    showTimer();
    timerId = setInterval(checkTimer, 1000);
    btnStart.disabled = true;
    editDateTime.disabled = true;
  }
};

btnStart.addEventListener('click', onClickHandler);

btnStart.disabled = true;

addStyleSheetRules();
flatpickr(editDateTime, options);

function showTimer() {
  const timerParts = ['days', 'hours', 'minutes', 'seconds'];
  const timerObj = convertMs(timerDate - Date.now());

  for (tp of timerParts) {
    timer.filter(el => tp in el.dataset)[0].innerHTML = addLeadingZero(
      timerObj[tp].toString()
    );
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addStyleSheetRules() {
  const styles = [
    '.timer {display:flex; gap:16px; margin-top:20px;}',
    '.field {display:flex; flex-direction:column; align-items:center; justify-content:center}',
    '.value {font-size:35px; font-weight:600; line-height:1.2; }',
    '.label {font-size:12px;text-transform:uppercase; line-height:1.2;}',
  ];

  const styleEl = document.createElement('style');

  // Append <style> element to <head>
  document.head.appendChild(styleEl);

  // Grab style element's sheet
  const styleSheet = styleEl.sheet;

  for (st of styles) {
    styleSheet.insertRule(st);
  }
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function checkTimer() {
  if (timerDate - Date.now() >= 0) {
    showTimer();
  } else {
    clearInterval(timerId);
    editDateTime.disabled = false;
  }
}
