const fs = require('fs');
const path = require('path');
const route = path.join(__dirname, 'secret-folder');

fs.readdir(route,{ withFileTypes: true },(err, files) => {
    if(err) console.log(err.message);
    else{
    	files.forEach(file => {
    		let route2 = path.join(__dirname, 'secret-folder', file['name']);
    		let fileName = file.name.slice(0,file.name.indexOf('.'));
    		let fileSrc = file.name.slice(file.name.indexOf('.') + 1);
    		let fileSize = 0;
    		fs.stat(route2,(err,stats) =>{
    			fileSize += stats['size'] / 1024;
    			if (!err) console.log(`${fileName} - ${fileSrc} - ${fileSize}kB`);
    			else console.log(err.message);
    		})
    	});	
    }
});
