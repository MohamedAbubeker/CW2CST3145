const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://CW2User:1HTS9Okx4nzZlgf2@cw2cluster.aywvxgz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const db = client.db('Schoolclasses');
const collectionSubject = db.collection("subjects");
var data;
const port = 4000;

// logger middleware
app.use(function (req, res, next) {
    console.log(new Date() + " || request method: " + req.method + " || on url: " + req.url);
    next();
})


// static images middleware
app.use(function (req, res, next) {
    console.log(new Date() + " || request method: " + req.method + " || on url: " + req.url);
    next();
})

app.get("/", (req, res) => {
    res.send("express server main route");
});

app.get("/lessons", (req, res) => {

    MongoClient.connect(uri, function (err, client) {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
        }
        console.log('Connected...');
        const collection = client.db("Schoolclasses").collection("subjects");
        // perform actions on the collection object
        collection.find({}).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
            client.close();
        });
    });
});

app.post("/lessons", (req, res) => {
    
    client.connect(err => {
        
        // perform actions on the collection object
        const collection = client.db("Schoolclasses").collection("subjects");
        // perform actions on the collection object
        for (let i = 0; i < req.body.length; i++) {
        collection.updateOne({ topic: req.body[i].subject}, { $inc: { space:  - 1 } } 
        );
        }
        
    });
      client.close();
    });


app.listen(port, () => {
    console.log("server is running on port: " + port);

});



