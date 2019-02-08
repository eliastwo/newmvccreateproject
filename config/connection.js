

const { Pool, Client } = require('pg');
var PGUSER = 'myroot';
var PGPSWD = 'myrot';
var PGDATABASE = 'test1';

const pool = new Pool({
  user: PGUSER,
  password: PGPSWD,
  port: 5432,
  database: PGDATABASE,
  schema: 'mySchema',
  max: 10,
  idleTimeoutMillis: 3000
});

module.exports = pool;