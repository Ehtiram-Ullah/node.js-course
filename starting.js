const http = require('http');


const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('Hello Ehtiram, learning mern huh ?');

});


server.listen(3000,'127.0.0.1',()=>console.log("server is listening ...."));