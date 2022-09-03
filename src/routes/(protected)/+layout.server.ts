import { error, redirect, type ServerLoad } from "@sveltejs/kit";

export const load : ServerLoad = ({ request, locals, url }) =>
{
  // CHECK IF USER IS LOGGED IN
  const user = locals.user 

  // IF USER ISN'T LOGGED IN REDIRECT TO LOGIN PAGE
  if(!user)
  {
    const path = url.pathname

    throw redirect(302,`/auth/login?redirectTo=${path}`)
  }

  return {
    user
  }
}