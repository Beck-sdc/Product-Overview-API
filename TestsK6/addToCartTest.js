import http from 'k6/http';
import { sleep, check } from 'k6';


export const options = {
  vus: 10,
  duration: '15s',
};

export default function () {
  const url = 'http://localhost:3001/cart';
  const payload = {
    "user_session": 1111,
    "product_id": 1,
    "active": 1,
    "sku_id": 34,
    "quantity": 1
  };

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = http.post(url, payload, params);
  check(res, {
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  })
  sleep(0.1);
}

// k6 run addToCartTest.js