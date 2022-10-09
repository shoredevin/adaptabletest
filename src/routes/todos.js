/**
 * REST endpoint for /todos
 */

const { PrismaClient, PrismaClientKnownRequestError } = require('@prisma/client');
const sanitizeHtml = require('sanitize-html');
const express = require('express');
const router = express.Router();
// const  cookieSession = require('cookie-session')
const path = require('path');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

router.use(cookieParser());

const authenticationMiddleware = function (req, res, next) {
  console.log(req.cookies);
  next();
}
/* 
  Below is old to do list functionality
  if everything is working as expected
  this can be delete - 2022-10-09
*/ 
// // REMOVE TODO ITEMS BEGIN 
// const prepop = [
//   { id: "feedfacefeedfacefeedface", title: '<a href="http://adaptable.io/docs/starters/express-prisma-mongo-starter#idea-2-deploy-a-code-update">Deploy a code update</a> by removing the banner message', done: false },
//   { id: "beeffeedbeeffeedbeeffeed", title: '<a href="https://adaptable.io/docs/starters/express-prisma-mongo-starter#idea-3-start-building-your-app-by-adding-more-api-services">Customize this app</a> by adding an API service to delete To Do items', done: false },
// ];

// prepop.map((i) => prisma.TodoItem.create({ data: i })
//   .then(() => console.log(`Added pre-populated item with id ${i.id}`))
//   .catch((e) => {
//     if(!((e instanceof PrismaClientKnownRequestError)
//       && e.code === "P2002")) {
//       console.error(`Error creating prepopulated item ${i.id}: ${e.message}`);
//     } // else prepopulated entries are already present
//   }
// ));
// // REMOVE TODO ITEMS END

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

router.post("/", asyncMiddleware(async (req, res) => {
  const { title: titleIn, done } = req.body;
  const title = sanitizeHtml(titleIn, {
    allowedTags: [ 'a' ],
    allowedAttributes: {
      'a': [ 'href' ]
    },
  });

  const result = await prisma.TodoItem.create({
    data: {
      title,
      done,
    }
  });
  res.json(result);
}));

// router.get('/', asyncMiddleware(async (req, res) => {
//   const todos = await prisma.TodoItem.findMany();
//   res.json(todos);
// }));

// router.get('/', asyncMiddleware(async (req, res) => {
//   // const todos = await prisma.TodoItem.findMany();
//   res.sendFile(__dirname, '/secret.html');
// }));


//auth route
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userDetails = await prisma.Users.findUnique({
    where: { username: username }
  });
  if(userDetails === null || username != userDetails.username || password != userDetails.password) {
    return res.status('401').send({ res: 'Invalid username or password' })
  }
  const sessionId = uuidv4();
  res.cookie("app_user", username, {  maxAge: 900000, httpOnly: true });
  res.cookie("app_session", sessionId, {  maxAge: 900000, httpOnly: true });
  /* Send sessionID to the DB */
  const updated = await prisma.Users.update({
    where: { username: username },
    data: { sessionId: sessionId },
  });

  res.status('200').send({ res: 'success' });
});


router.patch('/:id', asyncMiddleware(async (req, res) => {
  console.log(req.body)
  const { id } = req.params;
  const updated = await prisma.TodoItem.update({
    where: { id },
    data: req.body,
  });
  res.json(updated);
}));

router.delete('/', asyncMiddleware(async (req, res) => {
  const id = req.body.id;
  const updated = await prisma.TodoItem.delete({
    where: { id }
  });
  res.json(updated);
}));

router.get("/dex", asyncMiddleware(async (req, res) => {
  const dex = await prisma.Pokedex.findMany({
    orderBy: { 
      dexnum: 'asc',
      // name: 'asc',
    },
  });
  res.json(dex);
}));

router.post("/dex", asyncMiddleware(async (req, res) => {
  console.log(req.body)
  const { dexnum: dexnumIn, name, caught: caughtIn, type1, type2, shiny: shinyIn } = req.body;
  const dexnum = parseInt(dexnumIn);
  const caught = (caughtIn === 'true')
  const shiny = (shinyIn === 'true')
  // const dexnum = sanitizeHtml(dexnumIn, {
  //   allowedTags: [ 'a' ],
  //   allowedAttributes: {
  //     'a': [ 'href' ]
  //   },
  // });
  const result = await prisma.Pokedex.create({
    data: {
      dexnum: dexnum,
      name: name,
      type1: type1,
      type2: type2,
      caught: caught,
      shiny: shiny
    }
  });
  res.json(result);
}));

router.patch('/dex/:id', authenticationMiddleware, asyncMiddleware(async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const updated = await prisma.Pokedex.update({
    where: { id },
    data: req.body,
  });
  res.json(updated);
}));


router.delete('/dex', asyncMiddleware(async (req, res) => {
  const id = req.body.id;
  const updated = await prisma.Pokedex.delete({
    where: { id }
  });
  res.json(updated);
}));


router.get("/details", asyncMiddleware(async (req, res) => {
  // console.log('here');
  // console.log(req.query.name)
  // res.json({ response: req.query.name })
  // if (req.params) {
  //   console.log(req.params);
  //   res.json({ res: "done" })
  //   return;
  // }
  const details = await prisma.PokemonDetails.findUnique({
    where: {
      name: req.query.name
    }
  });
  res.json(details);
}));

router.patch('/details/:name', asyncMiddleware(async (req, res) => {
  const { name } = req.params;
  // const json = [
  //   req.body
  // ]
  json = req.body;
  console.log(json);
  // const forms = req.body.forms;
  // console.log(forms);
  const updated = await prisma.PokemonDetails.update({
    where: { name },
    data: json,
  });
  res.json(updated);
}));


module.exports = router;
