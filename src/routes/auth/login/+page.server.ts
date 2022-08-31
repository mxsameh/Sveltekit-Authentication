/**
 * LOGIN PAGE ENDPOINT
 */

import { DB_HOST } from "$env/static/private";
import type { Action } from "@sveltejs/kit";
import cookie from 'cookie'


export const POST : Action = async ({ request, setHeaders, url }) =>
{

  // Get form data from request
  const form = await request.formData()
  const user ={
    username :  form.get('username') as string,
    password :  form.get('password') as string
  }

  // check if user is in database
  const response = await fetch(`${DB_HOST}/authenticate`,{
    method : 'Post',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(user)
  })
  .then(res => res.json())

  // console.log( response );

  // UNAUTHENTICATED
  if(!response.authenticated)
  {
    return{
      status:403,
      errors :{
        username : 'Incorrect username or password' 
      }
    }
  }

  // AUTHENTICATED
  setHeaders({
    'Set-Cookie' : cookie.serialize('token',response.token,{
      path : '/',
      httpOnly : true,
      sameSite : 'strict',
      maxAge : 60 * 60 * 24 * 30,
    })
  })

  // console.log( url.searchParams.get('redirectTo') );

  return{
    location : url.searchParams.get('redirectTo') || '/'
  }

}
