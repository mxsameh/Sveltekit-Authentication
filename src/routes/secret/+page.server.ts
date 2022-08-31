import { redirect, type ServerLoad } from "@sveltejs/kit";


export const load : ServerLoad = ({ locals }) =>
{
  // check if user is exist
  // console.log( locals );
  const user = locals.user
  // 
  if(!user)
  {
    throw redirect(302, '/auth/login')
  }

  return{
    user
  }

}