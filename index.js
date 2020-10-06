require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;


const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 5000


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jo990.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("tatabook").collection("tatabook_user");
      console.log('db connected')
 


    app.post('/user', (req, res) =>{
        console.log(req.body)
        collection.insertOne(req.body)
        .then(result =>{
            if(result.insertedCount > 0){
                res.send(result)
            }
        })
    })




});




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen( process.env.PORT || port)