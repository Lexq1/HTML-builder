const fs = require('fs');
const path = require('path');
const route = path.join(__dirname, 'files');
const dirCopy = path.join(__dirname, 'files-copy');

fs.promises.rm(dirCopy, {recursive: true, force: true}).
finally(() =>{fs.readdir(route, {withFileTypes: true}, (err,files) =>{
	if(err) console.log(err);
	files.forEach(file => {
		if(file.isFile()){
			const route2 = path.join(__dirname, 'files/', file['name']);
			const copyFile = path.join(dirCopy, file['name']);
			fs.promises.mkdir(dirCopy, {recursive: true}).then(() => {
				const read = fs.createReadStream(route2, 'utf-8');
				const write = fs.createWriteStream(copyFile, 'utf-8');
				read.on('data', () => {
					write.write('data', 'utf-8');
				})
			})
		}
	})
})})

