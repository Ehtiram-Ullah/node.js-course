const express = require('express')

const app  = express();


app.get('/',(req,res)=>{
    res.statusCode=200;
    res.send('the port is '+PORT);
});

app.post('/',(req,res)=>{
    res.send('This is a post req, let change something');
});

const PORT = 3000;

app.listen(PORT,()=>console.log('App listening on port '+PORT));
