/**
 * REST endpoint for /todos
 */

// const { PrismaClient, PrismaClientKnownRequestError } = require('@prisma/client');
// const sanitizeHtml = require('sanitize-html');
const express = require('express');
const router = express.Router();
// const  cookieSession = require('cookie-session')
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const { v4: uuidv4 } = require('uuid');
// const { Router } = require('express');
// const { triggerAsyncId } = require('async_hooks');

// const prisma = new PrismaClient();

// router.use(cookieParser());

router.get("/", async (req, res) => {
  res.json({ res: "great success" })

});

module.exports = router;
