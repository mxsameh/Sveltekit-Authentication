import { DB_HOST } from "$env/static/private";
import type { Action } from "@sveltejs/kit";

export const POST : Action = async ({ request }) =>
{
  // Get form data from the request
  const form = await request.formData() 
  const user = {
    name : form.get('name') as string,
    username : form.get('username') as string,
    password : form.get('password') as string,
    admin : false
  }

  // Add user to database
  const response = await fetch(`${DB_HOST}/users`,{
    method : 'POST',
    body : JSON.stringify(user),
    headers : {
      'Content-Type' : 'application/json'
    }
  })

  const data = await response.json()

  console.log( response.status );
  console.log( data );



}