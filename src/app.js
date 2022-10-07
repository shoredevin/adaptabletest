const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
// const logger = require('morgan');

const app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/dex.html', async (req, res) => {
    res.send({ res: "not found" });
    // res.sendFile(path.join(__dirname, '/web/cool.css'));
})

app.use(express.static(path.join(__dirname, '../public')));

// Routes
const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

/*
    Add routing for login path here...
*/

const sessions = {}

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})
  
app.get('/cool', async (req, res) => {
    res.sendFile(path.join(__dirname, '/web/cool.html'));
    // res.sendFile(path.join(__dirname, '/web/cool.css'));
})

app.get('/dex', async (req, res) => {
    const sessionId = req.headers.cookie?.split('=')[1];
    console.log(sessionId);
    console.log('Cookies: ', req.cookies);
    console.log(req.cookies.app_user)
    if(!sessionId) {
        return res.status(401).sendFile(path.join(__dirname, '../public/index.html'));;
    }
    res.sendFile(path.join(__dirname, '../public/dex.html'));
})
  

module.exports = app;
