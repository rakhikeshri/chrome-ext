const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config()
mongoose.connect( process.env.URL, {useNewUrlParser: true} ).then(() => { console.log('connected to mongodb atlas') })

const Snippet = require('./snippets') 

const PORT = process.env.PORT || 3000;

const app = express()

app.use(cors())

app.use(express.json())

//connect to mongodb atlas

app.post("/create", async (req,res) => {
    let data = new Snippet(req.body);
    let result = data.save();
    console.log(result);
    res.send(result);
})

app.get("/snippets", async (req, res) => {
    let data = await Snippet.find();
    res.send(data);
})

//searching 
app.get("/snippet/:key", async (req, res) => {
    console.log(req.params.key)
    let data = await Snippet.find(
        {
            "$or": [
                {"topic": {$regex:req.params.key}}
            ]
        }
    )
    res.send(data)
})

app.listen(PORT, () =>{
    console.log("server on ", PORT)
})