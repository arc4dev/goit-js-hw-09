const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;
const delay = 0.5; //s

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeBackground = () => {
  document.body.style.backgroundColor = getRandomHexColor();
};

startBtn.addEventListener('click', () => {
  if (timerId) return; //if timerid exist return (double check)

  changeBackground();

  timerId = setInterval(changeBackground, delay * 1000);

  startBtn.setAttribute('disabled', 'true');
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  startBtn.removeAttribute('disabled');
});
