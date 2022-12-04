import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
Notify.init({ position: 'center-top' });

const onSubmit = event => {
  event.preventDefault();
  const promises = [];
  const { amount, delay, step } = [...event.target]
    .filter(el => el.tagName === 'INPUT')
    .reduce((result, current) => {
      result[current.name] = Number.parseInt(current.value);
      return result;
    }, {}); // get values from form elements;

  for (let i = 0; i < amount; i += 1) {
    createPromise(i, delay + step * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};

form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        //resolve
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
