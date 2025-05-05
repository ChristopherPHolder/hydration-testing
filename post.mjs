import { fetch } from 'undici';

const response = await fetch('http://localhost:9999/ClientDist/browser', {
  method: 'POST',
  body: JSON.stringify({
    placeholders: 'Christopher',
  }),
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

console.log(await response.text());
