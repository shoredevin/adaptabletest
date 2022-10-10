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

const authenticationMiddleware = async function (req, res, next) {
  const userCookie = req.cookies.app_user;
  const sessionCookie = req.cookies.app_session;
  if (userCookie == undefined || sessionCookie == undefined) { 
    console.log('auth state: ', 'false');
    res.locals.authenticated = false;
    return next();
  }
  const userDetails = await prisma.Users.findUnique({
    where: { username: userCookie }
  });
  const authenticatedState = 
    // req.cookies.app_user && 
    // req.cookies.app_session && 
    userCookie == userDetails.username && 
    sessionCookie == userDetails.sessionId 
    ? true : false;
  res.locals.authenticated = authenticatedState;
  console.log('auth state: ', authenticatedState);
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

/* post route for todo,
   can be deleted */ 
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


/* patch route for todo,
   can be deleted */
router.patch('/:id', asyncMiddleware(async (req, res) => {
  console.log(req.body)
  const { id } = req.params;
  const updated = await prisma.TodoItem.update({
    where: { id },
    data: req.body,
  });
  res.json(updated);
}));


/**
 * delete route for todo,
 * can be deleted 
 */
router.delete('/', asyncMiddleware(async (req, res) => {
  const id = req.body.id;
  const updated = await prisma.TodoItem.delete({
    where: { id }
  });
  res.json(updated);
}));

/**
 * To Do
 * This route (and all /dex routes)...
 * should be updated to use the user
 * in the cookie to determine the apprpriate
 * Prisma container
 */
router.get("/dex", authenticationMiddleware, asyncMiddleware(async (req, res) => {
  if(!res.locals.authenticated) { res.status('401').send({ res: "Unauthorized" }) }
  const uname = req.cookies.app_user;
  console.log(uname);
  try {
    const dex = await prisma[uname].findMany({
      orderBy: { 
        dexnum: 'asc',
        // name: 'asc',
      },
    });
    res.json(dex);
  } catch(err) {
    return res.status('404').json({ res: "Your pokedex was not found, please contact your administrator" });
  }
}));

/**
 * Is this still necessary?
 * It seems that without allowing different dex/user
 * this would not be required right now
 */
router.post("/dex", authenticationMiddleware, asyncMiddleware(async (req, res) => {
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
      dexnum:   dexnum,
      name:     name,
      type1:    type1,
      type2:    type2,
      caught:   caught,
      shiny:    shiny
    }
  });
  res.json(result);
}));

router.patch('/dex/:id', authenticationMiddleware, authenticationMiddleware, asyncMiddleware(async (req, res) => {
  if(!res.locals.authenticated) { return res.status('401').send({ res: "Unauthorized" }) }
  console.log(req.body);
  const { id } = req.params;
  const updated = await prisma.Pokedex.update({
    where: { id },
    data: req.body,
  });
  res.json(updated);
}));

/*
  - To Do - 
  this route should be deleted 
*/
router.delete('/dex', asyncMiddleware(async (req, res) => {
  const id = req.body.id;
  const updated = await prisma.Pokedex.delete({
    where: { id }
  });
  res.json(updated);
}));


router.get("/details", asyncMiddleware(async (req, res) => {
  const details = await prisma.PokemonDetails.findUnique({
    where: {
      name: req.query.name
    }
  });
  res.json(details);
}));

/* 
  - To Do -
  this route should not be accessible publicly 
*/
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

/**
 * experimental route - this should be deleted
 */
router.get('/details/test/:name', asyncMiddleware(async (req, res) => {
  const name = req.params.name;
  console.log(name);
  const data = await prisma[name].findMany({
    orderBy: { 
      dexnum: 'asc',
      // name: 'asc',
    },
  });
  res.json(data);
}))


module.exports = router;
