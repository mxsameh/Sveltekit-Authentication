import UsersTable, { type User } from "$lib/database/models/users";
import type { RequestHandler } from "@sveltejs/kit";
import { hashPassword } from "$lib/utils/bcrypt";
import { createToken } from "$lib/utils/jwt";
import { TOKEN_SECRET } from "$env/static/private";

const table = new UsersTable()

export const GET : RequestHandler = async ({ setHeaders }) =>
{

  const users = await table.users()
  const data = JSON.stringify(users)

  // setHeaders({
  //   'Content-Type' : 'application/json'
  // })

  const response = new Response(data,{
    status : 200,
    headers : {
      'Content-Type' : 'application/json'
    }
  })

  return response
}

export const POST : RequestHandler = async ({ request }) =>
{
  // GET USER FROM REQUEST
  const user : User = await request.json()

  // HASHING USER PASSWORD
  user.password = hashPassword(user.password as string)

  // ADD USER TO DATABASE
  let createdUser = await table.createUser(user)
  delete createdUser.password

	// CREATE TOKEN
	const token = createToken(createdUser, TOKEN_SECRET)

  // RETURN TOKEN
  const data = JSON.stringify(token)
  const response = new Response(data);

  return response
}

