import { NODE_ENV, DB_TEST_DATABASE, DB_DEV_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from '$env/static/private'
import { Pool } from 'pg'


const db = new Pool({
  user : DB_USER,
  database : NODE_ENV == 'test'? DB_TEST_DATABASE : DB_DEV_DATABASE,
  password : DB_PASSWORD,
  port : parseInt(DB_PORT),
  host : DB_HOST,
})

export default db;
