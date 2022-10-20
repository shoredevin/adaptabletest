const express = require('express');
const router = express.Router();
const { Pool, Client } = require('pg');

const credentials = {
  user:       "test2-main-db-0c1958f0d431bbd8c",
  host:       "user-prod-us-east-2-1.cluster-cfi5vnucvv3w.us-east-2.rds.amazonaws.com",
  database:   "test2-main-db-0c1958f0d431bbd8c",
  password:   "9tKhtQzvwvQpNxREgv5UBYzamnpvZZ",
  port:       "5432",
};

router.get("/", async (req, res) => {
    const pool = new Pool(credentials);
    const results = await getPosts(pool);
    res.json(results.rows)
    await pool.end();

});

async function getPosts(pool) {
  const text = `
      SELECT
          *
      FROM public.pokemon AS p
  `;
  return pool.query(text);
}

module.exports = router;