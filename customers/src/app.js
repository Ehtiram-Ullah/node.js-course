const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Customer = require('./models/customer')

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


const customer = new Customer({
    name: 'Ehtiram',
    industry: 'Computer Science'
});

//  customer.save();
app.get('/', (req,res)=>{
    res.statusCode=200;

    res.send("<h1>Hello Customers</h1>");
});
app.get('/api/customers',async(req,res)=>{
    res.statusCode=200;
    const result = await Customer.find();
    res.json(result);
});

app.get('/api/customers/:name',(req,res)=>{
    res.statusCode = 200;
    res.send(customers.find((customer)=>customer.name==req.params.name));
});

app.post('/api/customers',async(req,res)=>{
    res.statusCode=200;
    customers.push(req.body);
    const newCustomer = new Customer({
        name: req.body.name,
        industry: req.body.industry
    });

    await newCustomer.save();
    
    res.send("New customer added Successfully!");
});

app.put('/api/customers/:name',(req,res)=>{
    res.statusCode =200;
    const name = req.params.name;
    console.log("name is "+name);
    const index= customers.findIndex((std)=>std.name == name);
    customers[index] = req.body;
    res.send("updated " +req.body);
});

app.delete('/api/customers/:name',(req,res)=>{
    delete(customers[ customers.findIndex((customer)=>customer.name==req.params.name)]);
    res.sendStatus = 200;
    res.send("Successfully deleted :!");
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