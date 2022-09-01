import { TOKEN_SECRET } from "$env/static/private";
import UsersTable, { type User } from "$lib/database/models/users";
import { comparePassword } from "$lib/utils/bcrypt";
import { createToken } from "$lib/utils/jwt";
import type { RequestHandler } from "@sveltejs/kit";

const table = new UsersTable()

export const POST : RequestHandler = async ({request}) =>
{
  // GET DATA FROM REQUEST
  const {username, password} = await request.json()

  // FIND USER IN DATABASE
  const user : User = await table.findUser(username)

  // IF USER DOESN'T EXIST OR PASSWORD IS INCORRECT
  const passwordVerified = comparePassword(password, user ? user.password as string : '')
  if(!user || !passwordVerified)
  {
    const responseData = {
      authenticated : false,
      token : ''
    }
    const responseJsonData = JSON.stringify(responseData)
    return new Response(responseJsonData)
  }

  // USER AUTHENTICATED
  delete user.password;

  // CREATE TOKEN
  const token = createToken(user, TOKEN_SECRET)

  const responseData = {
    authenticated : true,
    token
  }
  const responseJsonData = JSON.stringify(responseData)

  
  return new Response(responseJsonData)
}