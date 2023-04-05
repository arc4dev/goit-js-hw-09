import flatpickr from 'flatpickr';
import { Notify } from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const startBtn = document.querySelector('button[data-start]');
let selectedDate = null;
let timerId = null;

startBtn.setAttribute('disabled', 'true');

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose date in the future.');
      startBtn.setAttribute('disabled', 'true');
      return;
    }
    selectedDate = selectedDates[0];
    startBtn.removeAttribute('disabled');
  },
});

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

const updateCountdown = () => {
  const addLeadingZero = value => {
    return String(value).padStart(2, 0);
  };

  const now = new Date().getTime();
  const time = selectedDate.getTime() - now;
  const timeObj = convertMs(time);

  const allZero = Object.values(timeObj).every(val => val === 0);

  if (allZero) clearInterval(timerId);

  Object.keys(timeObj).forEach(key => {
    const element = document.querySelector(`[data-${key}]`);
    element.textContent = addLeadingZero(timeObj[key]);
  });
};

//events
startBtn.addEventListener('click', () => {
  updateCountdown();
  timerId = setInterval(updateCountdown, 1000);
});
