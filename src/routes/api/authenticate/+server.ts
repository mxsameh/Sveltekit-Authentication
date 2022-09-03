/**
 * USER AUTHENTICATION API
 * DESCRIPTION:
 * username and password of the user that is trying to login are sent
 * in the resqust body and then we check if the user is in the db
 * and if user is found we check if the password is matching or not
 * if everything is ok (user is found and password is correct) then
 * return a token in the response
 */
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

  // CHECK IF THE USER PASSWORD IS MATCHING
  const passwordVerified = comparePassword(password, user ? user.password as string : '')

  // IF USER DOESN'T EXIST OR PASSWORD IS INCORRECT
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

  // RESPONSE DATA
  const responseData = {
    authenticated : true,
    token
  }
  const responseJsonData = JSON.stringify(responseData)

  
  return new Response(responseJsonData)
}