const http = require('http');
const path = require('path');
const pug = require('pug');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const server=http.createServer(async (req, res)=>{
console.log('req.url', req.url);
let content;

let filePath = path.join(__dirname,'public', req.url);


// = path.join(__dirname,'public', req.url==='/'? 'index.html': req.url);

const ext= path.extname(filePath);
let contentType = 'text/html';

if (ext === '.css' || ext === ".js") {
    try{
        content = await readFile(filePath);
    } catch(err) {throw err}
}


switch(ext){
    case '.css':
        contentType = 'text/css';
        break
    
    case '.js': 
        contentType = 'text/javascript';
        break

    default:
        contentType = 'text/html'
        const brandName = req.url.slice(1,req.url.length);
        content = pug.renderFile(path.join(__dirname,'public', 'template.pug'), {
            name: brandName,
            styleLink: req.url==='/'? './': `./brands/${brandName}/`
          });
}

    res.writeHead(200, {
                'Content-Type': contentType
        })
    res.end(content);
       
})

const PORT = process.env.PORT || 3000;

server.listen(PORT,()=>{
    console.log('server has been started on port', PORT);
});