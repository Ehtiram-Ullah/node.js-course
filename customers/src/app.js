const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
mongoose.set('strictQuery',false)
const app  = express();
//Database password - uc3IK63xbdNiISOs
app.use(express.json());

const customers = [
    {
        name:"Jibran",
        industry:"Football"
    },
    {
        name: "Afsar Ali",
        industry: "App developer",
    },
    {
        name:"Mazhar Ali",
        industry:"Music"
    }
];
app.get('/',(req,res)=>{
    res.statusCode=200;
    res.send("<h1>Hello Customers</h1>");
});
app.get('/api/customers',(req,res)=>{
    res.statusCode=200;
    res.send(customers);
});
app.post('/api/customers',(req,res)=>{
    res.statusCode=200;
    console.log("Hello world");
    console.log(req.body);
    customers.push(req.body);
    
    res.send("New customer added Successfully!");
});

app.post('/',(req,res)=>{
    res.send('This is a post req, let change something');
});

const CONNECTION = process.env.CONNECTION;
const PORT = process.env.PORT || 3000;



const start = async()=>{
    try{

        await mongoose.connect(CONNECTION);
        app.listen(PORT,()=>console.log('App listening on port '+PORT));
    }catch(e){
        console.log(e.message);
    }
    
}

start();