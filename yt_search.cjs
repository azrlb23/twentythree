const https = require('https');
const queries = [
  'Sal Priadi Foto Kita Blur lirik lyrics',
  'Sal Priadi Kita Usahakan Rumah Itu lirik lyrics'
];

async function search(q) {
  return new Promise((resolve) => {
    https.get('https://www.youtube.com/results?search_query=' + encodeURIComponent(q), (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = [...data.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)];
        resolve(matches.length > 0 ? matches.map(m => m[1]).slice(0, 3) : ['not found']);
      });
    });
  });
}

(async () => {
  for (const q of queries) {
    const ids = await search(q);
    console.log(q, '=>', ids);
  }
})();
