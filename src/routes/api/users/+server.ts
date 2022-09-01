import UsersTable from "$lib/database/models/users";
import type { RequestHandler } from "@sveltejs/kit";

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

