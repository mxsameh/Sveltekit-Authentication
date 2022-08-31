import type { Handle } from "@sveltejs/kit"
import cookie from 'cookie'
import { decodeToken, verifyToken } from "../utils/jwt"
import { TOKEN_SECRET } from "$env/static/private"


export const handle : Handle = async ({ event, resolve}) =>
{
  // console.log( event.url.searchParams );

  // GET COOKIES FROM REQUEST HEADER
  const cookieHeader = event.request.headers.get('cookie') 
  const cookies = cookie.parse(cookieHeader || '')
  const token = cookies.token

  // VERIFY TOKEN AND ADD DATA TO LOCALS
  if(token)
  {
    const isValid = verifyToken(token, TOKEN_SECRET)
    const payload = decodeToken(token)
    event.locals.user = payload;
  }


  return resolve(event)
}