const fs = require('fs');
const path = require('path');
const route = path.join(__dirname, 'styles');
const routeTemplate = path.join(__dirname, 'template.html');
const writableRoute = path.join(__dirname,'project-dist');
const fileWritable = path.join(writableRoute, 'style.css');
const writableStream = fs.createWriteStream(fileWritable, 'utf-8');
const assets = path.join(__dirname, 'assets');
const copyDirectoryFolder = path.join(writableRoute, 'assets');

createDirectory(writableRoute)
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


async function createDirectory(name) {
  await fs.promises.mkdir(name, { recursive: true });
}

async function copyDirectory(i, o) {
  await createDirectory(o);
  await fs.promises.readdir(i, { withFileTypes: true, recursive: true}) 
  .then ( dir => {
    dir.forEach(async folder => {
    await createDirectory(path.join(o, folder.name))
    const file = await fs.promises.readdir(path.join(i, folder.name), { withFileTypes: true, recursive: true});
    file.forEach(item => {
      fs.promises.copyFile( path.join(i, folder.name, item.name), path.join(o, folder.name, item.name));
    });
   });
  });
};

copyDirectory(assets, copyDirectoryFolder);