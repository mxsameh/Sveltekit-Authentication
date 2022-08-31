import type { Handle } from "@sveltejs/kit"

export const handle : Handle = async ({ event, resolve}) =>
{

  // if( event.url.pathname == '/')
  // {
  //   return new Response('ohhh')
  // }
  // console.log( event.url );

  // GET COOKIES FROM REQUEST HEADER

  // 1- if we found token cookie
  // 2- verify token
  // 3- add user data to locals

  // const cookieHeader = event.request.headers.get('cookie')
  // const cookies = cookie.parse(cookieHeader || '')
  // const token = cookies.token || ''


  // if(token) // if token is found in a cookie
  // {

  //   // Verify token
  //   isValid : Boolean = jwt.verify(token);
  //   // Get data from token
  //   const data = jwt.payload(token);
  //   // Add token data to locals
  //   event.locals.user = payload.name;
  // }
  const user =
  {
    username : 'mohamed'
  }
  event.locals.user = user


  return resolve(event)
}