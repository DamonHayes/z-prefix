const express = require('express');
const app = express();
const port = 8081;

const knex = require('knex')(require('./knexfile.js')["development"])

const cors = require('cors')
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("application is up and running")
})

app.listen(port, () =>{
    console.log(`Your Knex and Express applications are running succesfully at port: ${port}`)
})

//----------------------------------GETS------------------------------------

app.get('/items', (req, res) => {
    knex('item')
        .select('*')
        .then(data => res.json(data))
})

app.get('/items/:id', (req, res)=>{
    let getId = req.params.id
    knex('item')
    .select('*')
    .where({'id': parseInt(getId)})
    .then(items => {
        res.json(items)
    })
})

app.get('/items/user/:id', (req, res)=>{
    let getId = req.params.id
    knex('item')
    .select('*')
    .where({'user_id': parseInt(getId)})
    .then(items => {
        res.json(items)
    })
})

app.get('/users', (req, res) => {
    knex('user')
        .select('*')
        .then(data => res.json(data))
})

app.get('/users/:id', (req, res)=>{
    let getId = req.params.id
    knex('user')
    .select('*')
    .where({'id': parseInt(getId)})
    .then(users => {
        res.json(users)
    })
})

//----------------------------------POST------------------------------------

app.post('/users', (req, res)  =>{
    const {first_name, last_name, user_name, password} = req.body

    knex('user')
        .insert({first_name, last_name, user_name, password})
        .then( function() {
            res.json({succeess: true, message: 'ok'})
        })
})

app.post('/items', (req, res)  =>{
    const {user_id, item_name, description, quantity} = req.body

    knex('item')
        .insert({user_id, item_name, description, quantity})
        .then( function() {
            res.json({succeess: true, message: 'ok'})
        })
})


//----------------------------------PATCH------------------------------------

app.patch('/users/:id', (req, res) => {
    let getId = req.params.id;
    const {first_name, last_name, user_name, password} = req.body

    knex('user')
        .where({"id" : getId})
        .update({first_name, last_name, user_name, password})
        .then(() => res.json({success: true, message: 'ok'}))
        .catch(err => res.json(err))
})

app.patch('/items/:id', (req, res) => {
    let getId = req.params.id;
    const {user_id, item_name, description, quantity} = req.body

    knex('item')
        .where({"id" : getId})
        .update({user_id, item_name, description, quantity})
        .then(() => res.json({success: true, message: 'ok'}))
        .catch(err => res.json(err))
})

//----------------------------------DELETES------------------------------------

app.delete('/users/:id', (req, res) => {
    let getId = req.params.id
    knex('user')
        .where({"id" : getId})
        .del()
        .then(function(){
            res.json({succeess: true, message: 'ok'})
        })
})

app.delete('/items/:id', (req, res) => {
    let getId = req.params.id
    knex('item')
        .where({"id" : getId})
        .del()
        .then(function(){
            res.json({succeess: true, message: 'ok'})
        })
})