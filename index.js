const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 4000



// middleware 

app.use(cors())
app.use(express.json())




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dslsy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){


    try{

        await client.connect();
        const serviceCollection=  client.db("geniusCar").collection("services")
        const orderCollection= client.db("geniusCar").collection("order")



    //  auth related api 


    app.post('login',(req,res)=>{
      const user=req.body
      const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
      res.send(accessToken)
    })





//  service related api 


    //   create 
      app.post('/service',async(req,res)=>{
          const newService= req.body
          const result = await serviceCollection.insertOne(newService);
          res.send(result)
        })

   
    //read 

     app.get('/services',async(req,res)=>{
        const query= {}
        const cursor = serviceCollection.find(query)
        const services= await cursor.toArray()
        res.send(services)
     })


     app.get('/hero',async(req,res)=>{
       
        res.send('i am hero')
     })

   


    // update

    //delete 


 //create api order collection

 app.post('/order',async(req,res)=>{
    const order = req.body
    const result = await orderCollection.insertOne(order);
    res.send(result)


  })
//  load order 

app.get('/order',async(req,res)=>{
    const email=req.query.email
    console.log(email);
    const query= {email:email}
    const cursor = orderCollection.find(query)
    const order= await cursor.toArray()
    res.send(order)
 })


  



    }
    finally{

    }

}

run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('rinning car')
})

app.listen(port, () => {
    console.log('listening');
})