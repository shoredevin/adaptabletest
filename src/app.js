const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');



const app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

/*
    Add routing for login path here...
*/

app.get('/dex', async (req, res) => {
    //if authenticated send here
    res.sendFile(path.join(__dirname, '../public/dex.html'));
    //else send to login page
})
  

module.exports = app;
