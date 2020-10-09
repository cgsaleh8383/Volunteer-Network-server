const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lvtch.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express();
app.use(cors());
app.use(bodyParser.json());



const port = 4000;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const socialWorks = client.db("socialWork").collection("section");

    //data add
    app.post('/addCategory', (req, res) => {
        const socialWork = req.body;
        socialWorks.insertMany(socialWork)
        .then(result => {
            console.log(result.insertedCount);
            res.send(result.insertedCount);  
        })
    })

    //data Ride
    app.post('/addWork', (req, res) => {
        const socialWork = req.body;
        socialWorks.insertOne(socialWork)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
        console.log(socialWork);
    })

    //data create
    app.get('/createWork', (req, res) => {
        // console.log(req.query.email);
        socialWorks.find({ email: req.query.email })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    // //delate
    // app.delete('/delete/:id', (req, res) => {
    //     userCollection.deleteOne({ _id: ObjectId(req.params.id) })
    //         .then(result =>
    //             res.send(result.deletedCount > 0)
    //         )
    // })


});



app.listen(port)
