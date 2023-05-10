const fs = require('fs');
const path = require('path');
const route = path.join(__dirname, 'styles');
const writableRoute = path.join(__dirname,'project-dist');
const fileWritable = path.join(writableRoute, 'bundle.css');
const writableStream = fs.createWriteStream(fileWritable, 'utf-8');

fs.readdir(route, { withFileTypes: true }, (err,files) => {
	if(err) console.log(err);
	files.forEach(file => {
		let redableRouteFile = path.join(route,file.name);
		if(file.isFile() && path.extname(redableRouteFile) === '.css'){
			const redableStream = fs.createReadStream(redableRouteFile, 'utf-8');
			redableStream.pipe(writableStream);
		}
	})
})
