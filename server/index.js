const express = require('express')
const path=require('path');

require('dotenv').config();

console.log(`The best class in New Paltz is ${process.env.BEST_CLASS}`)

const usersController = require('./controllers/users');
const postsController = require('./controllers/posts');
const exerciseDataController = require('./controllers/workouts');
const profilesController = require('./controllers/profiles')


const app = express();
const port = process.env.PORT || 8100;

app



.use('/', express.static(path.join(__dirname, '../docs')))

.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

.use(express.json())
.use('/users', usersController)
.use('/posts', postsController)
.use('/workouts', exerciseDataController)
.use('/profiles', profilesController)

app
.get('*',(req,res) => res.sendFile(path.join(__dirname, '../docs/index.html')))

.use((err,req,res,next) =>{
    console.error(err);
    if(err.code < 400 || err.code > 600){
        err.code = 500;
    }
    res.status(err.code || 500).send(err);
})

.use((err, req, res, next)=>{
    // Besides for sending the error to the client. It is helpful to write it to the terminal/console.
    // More information can be serialized to the console than can be serialized to JSON for transfer over the wire.
    // Eventually you may want to add logic to prevent sensitive information from being sent to the client and to reformat the error message to make it more user friendly
    console.error(err);
    res.status(err.code || 500).send(err);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

