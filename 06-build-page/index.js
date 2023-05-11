const fs = require('fs');
const path = require('path');
const route = path.join(__dirname, 'styles');
const routeTemplate = path.join(__dirname, 'template.html');
const writableRoute = path.join(__dirname,'project-dist');
const fileWritable = path.join(writableRoute, 'style.css');
const writableStream = fs.createWriteStream(fileWritable, 'utf-8');

fs.promises.mkdir(writableRoute, {recursive: true});
async function createStyleFile(){
	fs.readdir(route, { withFileTypes: true }, (err,files) => {
		if(err) console.log(err);
		files.forEach(async (file) => {
			let redableRouteFile = path.join(route,file.name);
			if(file.isFile() && path.extname(redableRouteFile) === '.css'){
				const redableStream = fs.createReadStream(redableRouteFile, 'utf-8');
				redableStream.pipe(writableStream);
			}
		})
	})
}

createStyleFile();

async function createHtmlFile(){
	const redableRoute = path.join(__dirname, 'components');
	const writableRouteFile = path.join(writableRoute, 'index.html');
	let templateCopy = await fs.promises.readFile(routeTemplate, 'utf-8');
	await fs.readdir(redableRoute, {withFileTypes: true}, (err, files) => {
		if(err) console.log(err);
		files.forEach(async (file) => {
			if (file.isFile() && path.extname(routeTemplate) === '.html') {
				let readableRouteFile = path.join(redableRoute, file.name);
				let content = await fs.promises.readFile(readableRouteFile, 'utf-8');
				templateCopy = templateCopy.replace(`{{${file.name.split('.')[0]}}}`, content);
				await fs.promises.writeFile(writableRouteFile,templateCopy);
			}
		})
	})
}

createHtmlFile();

// async function copyDirectory(){
// 	const route = path.join(__dirname, 'assets');
// 	await	fs.readdir(route, {withFileTypes: true}, (err,files) =>{
// 		if(err) console.log(err);
// 		files.forEach(async (file) => {
// 			if(file.isFile()){
// 				const route2 = path.join(route, file['name']);
// 				const copyFile = path.join(writableRoute, file['name']);
// 				const read = fs.createReadStream(route2, 'utf-8');
// 				const write = fs.createWriteStream(copyFile, 'utf-8');
// 					read.on('data', () => {
// 						write.write('data', 'utf-8');
// 					})
// 			}
// 		})
// 	})
// }

// copyDirectory();