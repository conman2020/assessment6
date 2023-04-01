const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');

if (process.argv.length !== 3) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1);
}

const filename = process.argv[2];

fs.readFile(filename, 'utf8', (err, data) => {
  if (err) {
    console.error(`Couldn't read file ${filename}: ${err}`);
    process.exit(1);
  }

  const urls = data.trim().split('\n');
  console.log(urls)

  const requests = urls.map((u) => {
    const options = url.parse(u);
    console.log(options);
    const protocol = options.protocol === 'https:' ? https : http;
    return new Promise((resolve, reject) => {
      protocol.get(options, (res) => {
        let html = '';
        res.on('data', (chunk) => {
          html += chunk;
        });
        res.on('end', () => {
          const filename = options.hostname;
          fs.writeFile(filename, html, (err) => {
            if (err) {
              console.error(`Couldn't write to file ${filename}: ${err}`);
            } else {
              console.log(`Wrote to ${filename}`);
            }
            resolve();
          });
        });
      }).on('error', (err) => {
        console.error(`Couldn't download ${u}: ${err}`);
        resolve();
      });
    });
  });

  Promise.all(requests).then(() => {
    console.log('Done');
  });
})