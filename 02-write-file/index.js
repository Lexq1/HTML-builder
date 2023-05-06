const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const route = path.join(__dirname, 'text.txt');
const stream = fs.createWriteStream(route, 'utf-8');
console.log('Привет! Введи текст.\n');

stdin.on('data', data => {
	if(String(data).trim() === 'exit') process.exit();
	else stream.write(data, 'utf-8');
})

process.addListener('SIGINT', ()=> {
  process.exit();
});

process.on('exit', () => stdout.write('Удачи!'));