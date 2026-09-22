const https = require('https');
const ids = ['WhEUZrB2Osc', 'qQDaxjLReck', '69z_rxOOpCw', '3rf16_Q77WQ', 'rSTO0VrV38Y', 'ytMxh-_6EcI', '7SqNVv98e8Q'];
ids.forEach(id => {
  const url = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  console.log(url);
});
