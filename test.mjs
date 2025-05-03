

await fetch('http://localhost:4200/', {
  method: 'POST',
  body: JSON.stringify({
    key: 'value',
    timestamp: Date.now()
  })
})
  .then(response => response.text())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
