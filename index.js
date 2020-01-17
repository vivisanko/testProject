const http = require('http');
const path = require('path');
const fs = require('fs');

const server=http.createServer((req, res)=>{
console.log('req.url', req.url);


let filePath = path.join(__dirname,'public', req.url);
if(req.url==='/'){
    filePath=path.join(__dirname,'public', 'index.html')
}
if(req.url==='/clever'){
    filePath=path.join(__dirname,'public', 'clever.html')
}
if(req.url==='/cheerful'){
    filePath=path.join(__dirname,'public', 'cheerful.html')
}
if(req.url==='/handsome'){
    filePath=path.join(__dirname,'public', 'handsome.html')
}
if(req.url==='/kindly'){
    filePath=path.join(__dirname,'public', 'kindly.html')
}


// = path.join(__dirname,'public', req.url==='/'? 'index.html': req.url);

const ext= path.extname(filePath);
let contentType = 'text/html'

switch(ext){
    case '.css':
        contentType = 'text/css'
        break
    
    case '.js': 
        contentType = 'text/javascript'
        break

    default:
        contentType = 'text/html'
}


console.log('filePath', filePath);

        fs.readFile(filePath, (err, content)=>{
            if(err){
                    res.writeHead(500);
                    res.end('Server Error')
                }
             else {
                res.writeHead(200, {
                    'Content-Type': contentType
                })
                res.end(content)
            }
        })
})

const PORT = process.env.PORT || 3000;

server.listen(PORT,()=>{
    console.log('server has been started on port', PORT);
});