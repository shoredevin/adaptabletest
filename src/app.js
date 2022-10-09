const { PrismaClient, PrismaClientKnownRequestError } = require('@prisma/client');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
// const logger = require('morgan');

const prisma = new PrismaClient();

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


const authCheck = async function(req, res, next) {
    const userCookie = req.cookies.app_user;
    const sessionCookie = req.cookies.app_session;
    if (userCookie == undefined || sessionCookie == undefined) { 
        res.clearCookie('app_user');
        res.clearCookie('app_session');
        res.locals.authenticated = false;
        next();
        return;
    }
    const userDetails = await prisma.Users.findUnique({
        where: { username: userCookie }
    });
    const authenticatedState = 
        req.cookies.app_user && 
        req.cookies.app_session && 
        userCookie == userDetails.username && 
        sessionCookie == userDetails.sessionId 
        ? true : false;
    if (authenticatedState == false) { 
        res.clearCookie('app_user');
        res.clearCookie('app_session');
     }
    console.log('auth state: ', authenticatedState);
    res.locals.authenticated = authenticatedState;
    next();
}

app.use(express.static(path.join(__dirname, '../public')));

// Routes
const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

app.get('/', authCheck, async (req, res) => {
    console.log('/ authenticated state checker: ', res.locals.authenticated)
    if(res.locals.authenticated) { 
        return res.redirect('/dex') 
    }
    res.sendFile(path.join(__dirname, '../public/login.html'));
})
  
app.get('/cool', authCheck, async (req, res) => {
    console.log('/ authenticated state checker: ', res.locals.authenticated)
    res.sendFile(path.join(__dirname, '/web/cool.html'));
})

app.get('/dex', authCheck, async (req, res) => {
    console.log('/ authenticated state checker: ', res.locals.authenticated)
    if(!res.locals.authenticated) {
        return res.redirect('/');;
    }
    res.sendFile(path.join(__dirname, '../public/dex.html'));
})

//404 route
app.use((req, res, next) => {
    res.sendfile(path.join(__dirname, '../public/dex.html'))
});

module.exports = app;
