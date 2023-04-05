import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      setTimeout(resolve, delay, { position, delay });
    } else {
      // Reject
      setTimeout(reject, delay, { position, delay });
    }
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const firstDelay = +formData.get('delay');
  const delayStep = +formData.get('step');
  const amount = +formData.get('amount');

  Notify.info('Wait for the results!');
  form.reset();

  let delay = firstDelay;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(data =>
        Notify.success(`Fulfilled promise ${data.position} in ${data.delay}ms`)
      )
      .catch(data =>
        Notify.failure(`Rejected promise ${data.position} in ${data.delay}ms`)
      );
    delay += delayStep;
  }
});
