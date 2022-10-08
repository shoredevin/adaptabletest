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

const myLogger = function (req, res, next) {
    if(req.path != null && req.path.includes('.html')) {
        return res.sendFile(path.join(__dirname, '../public/index.html'));
        // return res.status('403').send({ res: "no page for you" });
    }
    next();
}
app.use(myLogger)


const auth = function(req, res, next) {
    const authenticatedState = req.cookies.app_user && req.cookies.app_session ? true : false;
    console.log('auth state: ', authenticatedState);
    res.locals.authenticated = authenticatedState;
    next();
}
// app.use(auth);

// app.get('/dex.html', async (req, res) => {
//     res.send({ res: "not found" });
// })

app.use(express.static(path.join(__dirname, '../public')));

// Routes
const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

/*
    Add routing for login path here...
*/

const sessions = {}

app.get('/', auth, async (req, res) => {
    console.log('/ authenticated state checker: ', res.locals.authenticated)
    if(res.locals.authenticated) { res.sendFile(path.join(__dirname, '../public/dex.html')) }
    res.sendFile(path.join(__dirname, '../public/index.html'));
})
  
app.get('/cool', async (req, res) => {
    res.sendFile(path.join(__dirname, '/web/cool.html'));
})

app.get('/dex', async (req, res) => {
    const sessionId = req.headers.cookie?.split('=')[1];
    const cookies = req.cookies;
    console.log(cookies);
    console.log(req.cookies.app_user ? "true" : "false");
    console.log(req.cookies.app_session ? "true" : "false"); 
    if(!sessionId) {
        return res.status(401).sendFile(path.join(__dirname, '../public/index.html'));;
    }
    res.sendFile(path.join(__dirname, '../public/dex.html'));
})
  

module.exports = app;
