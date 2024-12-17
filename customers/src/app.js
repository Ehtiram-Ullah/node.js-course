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
    // console.log(await mongoose.connection.db.listCollections().toArray());
    try{
        res.statusCode=200;

        const result = await Customer.find();
        res.json(result);
    }catch(e){
        res.status(500);
        res.send({"Error": e.message})
        // console.log(e.message);
    }
});

app.get('/api/customers/:id',async(req,res)=>{

    const {id:customerID} = req.params;

    console.log(customerID);

    try{

        const customer = await Customer.findById(customerID);
        if(!customer){
            res.status(404).json({error: "Customer not found with the given id."})
        }else{
            
            res.status(200).json({customer});
        }
    }catch(e){
        res.status(500).json({error:e.message})
    }


});

app.post('/api/customers',async(req,res)=>{
    customers.push(req.body);
    const newCustomer = new Customer(req.body);

    try{

        await newCustomer.save();
        res.status(201).json({newCustomer});
    }catch(e){
        res.status(400);
        res.send({error: e.message});
    }
    
    // res.send("New customer added Successfully!");
});

app.put('/api/customers/:id',async (req,res)=>{

    const {id: customerID} = req.params;

    const customer = await Customer.replaceOne(
        {_id: customerID},
        req.body
    );
    res.status(201).json({success: customer.modifiedCount})
});

app.delete('/api/customers/:id',async(req,res)=>{
    const {id: customerID} = req.params;
    try{
        const deletedCustomer = await Customer.deleteOne({_id: customerID});

        res.status(200).json({
            deletedCount: deletedCustomer.deletedCount
        });
    }catch(e){
        res.status(500).json({error: e.message})
    }
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