// importing Express
const express = require('express')
const fruits = require('./fruits.json')
const cors = require('cors');
// create our server by calling express
const app = express()
// above 1024
const port = 3000

//middleware - code that is executed between the reqeuest coming in and the request being send
app.use(cors())
app.use(express.json())
//

//create route
//[server].[method]('<>', callback)
// req(request)/res(response)
app.get('/home',(req, res)=>{
    res.send('Hello, Fruity!')
})

app.get('/fruits',(req,res) => {
    res.send(fruits)
})

// :<property> -> dynamic parameter
app.get('/fruits/:name', (req,res) =>{
    // getting the name from requiest and use that name to send the fruit back to the client 
    let name = req.params.name.toLowerCase();
    console.log(name)
    const resData = fruits.find(fruit =>  fruit.name.toLowerCase() == name)
    
    if(resData ==  undefined){
        res.status(404).send("The fruit doesn't exisst.")
    }else{
        res.send(resData)
    }
    // consider the case of wjem tje friots os fpimd / fruit is not found 
    // comdsider how to deal with capital letters and vs no capital letters vs no capital letters in it
    //
})

const ids = fruits.map(fruit => fruit.id)
let maxId = Math.max(...ids)

console.log("max id "+ maxId)

app.post('/fruits',(req,res) => {
    const fruitName = req.body
    console.log(fruitName)
    const fruitData = fruits.find(fruit =>  fruit.name.toLowerCase() == fruitName.name.toLowerCase())
    console.log(fruitData)
    if(fruitData !== undefined){
        res.status(409).send("The fruit already exist.")
    }else{
        req.body.id = maxId + 1
        console.log(fruitName)
        fruits.push(fruitName)
        res.status(201).send("Fruit is added")
    }
})

// Bind the server to a port
//
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

