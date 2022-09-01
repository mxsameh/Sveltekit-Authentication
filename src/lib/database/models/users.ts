import db from "../database";


class UsersTable{

  async users()
  {
    const conn = await db.connect()
    const sql = 'select * from users;'
    const query = await conn.query(sql)
    const users = query.rows

    conn.release()
    return users
  }


}

export default UsersTable