const express = require('express');
const router = express.Router();

const User = require('../model/user');

// DB Setup
const mongoose = require('mongoose')
const dbURL = 'mongodb://locusnine:locusnine01@ds135726.mlab.com:35726/locusnine'
var database;

mongoose.set('useFindAndModify', false);
mongoose.connect(dbURL, {
    useNewUrlParser: true
}, (err, db) => {
    if (err) {
        console.error('Error while connecting Database')
    } else {
        console.log('Connected')
        database = db;
    }
});

router.get('/hello', function (req, res) {
    res.send('hello');
});

router.post('/users', (req, res) => {

   
    let userData = req.body;
    console.log('userData', userData);
    let user = new User(userData);
    user.save((error, savedUser) => {
        if (error) {
            res.status(403).send('Unable to update User');
        } else {
            res.status(200).send(savedUser);
        }
    });
});


router.put('/users', (req, res) => {

   
    let userData = req.body;
    console.log('userData', userData);
    if(!userData.email){
        res.send('BadRequest').status(400);
    }

    let user = new User(userData);
    User.findOneAndUpdate({email: user.email },userData,(err)=>{
        if(err){
            res.send('BadRequest').status(400);
        }
    });
    res.status(201).send({});
});

router.get('/users', (req, res) => {
    let users = [];
    database.collection('users').find({}).toArray((err, result) => {
        if (err) {
            res.send([]);
        } else {
            res.send(result);
        }
    });
});

router.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log('deleteUserID: ' + id);
    
    User.deleteOne({ _id: id }, (err) => { 
        if (err) { 
            res.sendStatus(500);
        }
    });

    res.send({}).status(200);
});


module.exports = router