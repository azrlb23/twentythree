const https = require('https');
const artists = {
  'Pamungkas': 'https://open.spotify.com/artist/6P7cbEJoM1aP9pQj202758',
  'Perunggu': 'https://open.spotify.com/artist/2L980zW1H9HjB8k28yP55I',
  'Raim Laode': 'https://open.spotify.com/artist/12R9cRk8Fj8w6a5r96lY75',
  'Nadin Amizah': 'https://open.spotify.com/artist/20zaNeOAzQGLzO43jV5R5a',
  'Hindia': 'https://open.spotify.com/artist/69xQ2L8P3eHjQ6A9h9eZ69',
  'Sal Priadi': 'https://open.spotify.com/artist/2p9fV1L2oX8O9jR7m1b7bA'
};

Object.entries(artists).forEach(([name, url]) => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/<meta property="og:image" content="([^"]+)"/);
      if(match) console.log(`'${name}': '${match[1]}',`);
      else console.log(`${name}: not found`);
    });
  });
});
