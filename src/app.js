const { PrismaClient, PrismaClientKnownRequestError } = require('@prisma/client');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const { v4: uuidv4 } = require('uuid');
// const logger = require('morgan');

const prisma = new PrismaClient();

const app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const myLogger = function (req, res, next) {
    // if(req.path != null && (req.path.includes('.html') || req.path.includes('.css') || req.path.includes('.js'))) {
    if(req.path != null && req.path.includes('.html')) {
        return res.sendfile(path.join(__dirname, '../public/404.html'))
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
        // res.clearCookie('app_admin');
        res.locals.authenticated = false;
        return next();
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
        // res.clearCookie('app_admin');
    }
    console.log('auth state: ', authenticatedState);
    res.locals.authenticated = authenticatedState;
    res.locals.adminAccess = userDetails.adminAccess;
    next();
}

app.use(express.static(path.join(__dirname, '../public')));

// Routes
const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

/**
 * Experimental route with SQL calls
 * delete after testing
 */
const todoSQL_Router = require('./routes/todoSQL');
app.use('/todosql', todoSQL_Router);

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

app.get('/admin', authCheck, async (req, res) => {
    console.log('/ authenticated state checker: ', res.locals.authenticated)
    if(!res.locals.authenticated || !res.locals.adminAccess) {
        return res.redirect('/');;
    }
    res.sendFile(path.join(__dirname, '../public/admin.html'));
})

//404 route
app.use((req, res, next) => {
    res.sendfile(path.join(__dirname, '../public/404.html'))
});

module.exports = app;
