const pg = require('pg');

const config = {
  user: 'todos_db_9mjx_user',
  database: 'todos_db_9mjx',
  password: 'RrvcqXqnojiB0HebUZ6xRNzuixJVnGgI',
  host: 'dpg-ceub7aun6mpglqcd7rrg-a.oregon-postgres.render.com',
  port: 5432,
  ssl: true,
  idleTimeoutMillis: 30000
}

const client = new pg.Pool(config)

module.exports = client;
