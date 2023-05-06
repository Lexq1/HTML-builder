const fs = require('fs');
const path = require('path');
const route = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(route, 'utf-8');
let data = '';

stream.on('data', el => data += el);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log('Error', error.message));
