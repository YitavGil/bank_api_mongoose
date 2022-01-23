const express = require('express');
const req = require('express/lib/request');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const User = require("./User");
const {addUser, deleteUser, depositCash, transferCash, withdrawCash} = require('./utils')
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())
dotenv.config()
mongoose.connect(`mongodb+srv://Yitav:${process.env.DB_PWD}@cluster0.ztd7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true }).then( (e) => {
    console.log("You are connected")
    console.log(e);
}
)


async function run() {
    try{
 const user = await User.create({
    name: "Chubaka",
    city: "Kashyyyk",
    age: 104,
    cash: 3000000,
    credit: 5000000 })
    user.save()
    }
    catch(e) {
        console.log(e);
    }  
 }
//  run()



 app.get('/users',async (req, res) => {
    try{
        if(req.query.name) {
            const users = await User.find({name:req.query.name})
            res.status(200).json(users)
        }
        else{
            const users = await User.find()
            res.status(200).json(users)
        }
      
    }
    catch(e){
        res.status(400).send({error: e.message})
    }
    
})

app.post('/users', async(req, res) => {
    try {
        const user = await addUser(req.body)
        res.status(200).json(user)
    }
    catch(e){
        res.status(400).send({error: e.message})
    }
})

app.delete('/users/:id', async(req, res) => {
    try{
        await deleteUser(req.params.id)
        res.status(200).send()
    }
    catch(e) {
        console.log(e);
    }
})

app.patch('/users/:id', async(req, res) => {
    try{
    const user = await depositCash(req.params.id, req.body.cash)
    res.status(200).json(user)
        }
        catch(e){
            console.log(e);
        }
})

app.patch('/users/:id', async(req, res) => {
    try{
    const user = await withdrawCash(req.params.id, req.body.cash)
    res.status(200).json(user)
        }
        catch(e){
            console.log(e);
        }
})


 const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

