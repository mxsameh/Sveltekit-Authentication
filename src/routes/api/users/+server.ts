import UsersTable, { type User } from "$lib/database/models/users";
import type { RequestHandler } from "@sveltejs/kit";
import { hashPassword } from "$lib/utils/bcrypt";
import { createToken } from "$lib/utils/jwt";
import { TOKEN_SECRET } from "$env/static/private";

const table = new UsersTable()

/**
 *  GET ALL USERS 
 * 
 */
export const GET : RequestHandler = async () =>
{

  const users = await table.users()
  const data = JSON.stringify(users)

    const response = new Response(data,{
      status : 200,
      headers : {
        'Content-Type' : 'application/json'
      }
    })

    return response

}

/**
 * ADD A NEW USER
 * 
 */
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


/**
 * DELETE A USER FROM DATABASE 
 */
export const DELETE : RequestHandler = async ({ request }) =>
{
  let data;
  try{
    data = await request.json() 
  }catch(err)
  {
    // throw new Error('please send username')
    return new Response('please send username',{
      status : 400
    })
  }
  const username : string = data.username

  const deletedUser = await table.deleteUser(username)

  let response : Response;
  let responseBody;
  let responseData;

  if(!deletedUser)
  {
    responseData = {
      isDeleted : false,
      error: 'username is not found'
    }
    responseBody = JSON.stringify(responseData)

    response = new Response(responseBody,{
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    return response
  }

    responseData = {
      isDeleted : true,
      error: ''
    }
    responseBody = JSON.stringify(responseData)

  response = new Response(responseBody,{
    headers : {
      'Content-Type' : 'application/json'
    }
  })

  return response
}