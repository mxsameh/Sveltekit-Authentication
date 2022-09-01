import db from "../database";

export type User = {
  id? : number
  username : string
  password? : string
  name : string
  age : number
}
class UsersTable{

  // GET ALL USERS
  async users() : Promise <User[]>
  {
    const conn = await db.connect()
    const sql = 'select * from users;'
    const query = await conn.query(sql)
    const users = query.rows

    conn.release()
    return users
  }

  // CREATE A NEW USER
  async createUser(user : User) : Promise <User>
  {
    const conn = await db.connect()
    const sql = 'INSERT INTO users (username, password, name, age) VALUES ($1, $2, $3, $4) RETURNING *'
    const query = await conn.query(sql, [user.username, user.password, user.name, user.age])
    const createdUser = query.rows[0]

    conn.release()
    return createdUser
  }


  // FIND A USER BY USERNAME
  async findUser (username : string) : Promise <User>
  {
    const conn = await db.connect()
    const sql = 'SELECT * FROM users WHERE username = $1;'
    const query = await conn.query(sql,[username])
    const user = query.rows[0]

    conn.release()
    return user
  }


}

export default UsersTable