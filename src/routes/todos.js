/**
 * REST endpoint for /todos
 */

const { PrismaClient, PrismaClientKnownRequestError } = require('@prisma/client');
const sanitizeHtml = require('sanitize-html');
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient();

// REMOVE TODO ITEMS BEGIN 
const prepop = [
  { id: "feedfacefeedfacefeedface", title: '<a href="http://adaptable.io/docs/starters/express-prisma-mongo-starter#idea-2-deploy-a-code-update">Deploy a code update</a> by removing the banner message', done: false },
  { id: "beeffeedbeeffeedbeeffeed", title: '<a href="https://adaptable.io/docs/starters/express-prisma-mongo-starter#idea-3-start-building-your-app-by-adding-more-api-services">Customize this app</a> by adding an API service to delete To Do items', done: false },
];

prepop.map((i) => prisma.TodoItem.create({ data: i })
  .then(() => console.log(`Added pre-populated item with id ${i.id}`))
  .catch((e) => {
    if(!((e instanceof PrismaClientKnownRequestError)
      && e.code === "P2002")) {
      console.error(`Error creating prepopulated item ${i.id}: ${e.message}`);
    } // else prepopulated entries are already present
  }
));
// REMOVE TODO ITEMS END

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

router.get('/', asyncMiddleware(async (req, res) => {
  const todos = await prisma.TodoItem.findMany();
  res.json(todos);
}));

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
  const { dexnum: dexnumIn, name, caught: caughtIn } = req.body;
  const dexnum = parseInt(dexnumIn);
  const caught = (caughtIn === 'true')
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
      caught: caught
    }
  });
  res.json(result);
}));

router.delete('/dex', asyncMiddleware(async (req, res) => {
  const id = req.body.id;
  const updated = await prisma.Pokedex.delete({
    where: { id }
  });
  res.json(updated);
}));


module.exports = router;
