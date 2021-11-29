import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';
import http from 'k6/http';

export const options = {
  vus: 10,
  duration: '15s',
};

var myErrorCounter = new Counter("my_error_counter");


export default () => {
  const res = http.get(`http://localhost:3001/cart`);
  check(res, {
    'is status 200': r => r.status === 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,

  });
  if (res.status === 404) {
    myErrorCounter.add(1)
  }
  sleep(0.1);
};


// k6 run getCartTest.js