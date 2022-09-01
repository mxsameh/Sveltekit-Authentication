/**
 * REGISTRATION SERVER PAGE ENDPOINT
 */

import type { Action } from '@sveltejs/kit';
import cookie from 'cookie'

export const POST: Action = async ({ request, setHeaders, url }) => {

	const form = await request.formData();

	// GET USER FROM REQUEST'S FORM
	const user = {
		username: form.get('username') as string,
		password: form.get('password') as string,
		name: form.get('name') as string,
		age : parseInt(form.get('age') as string) as number
		// admin: false
	};

	// ADD USER TO DATABASE
	const response = await fetch(`${url.origin}/api/users`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	
	// FAILED TO CREATE USER IN DATABASE
	if(!response.ok)
	{
		return{
			status : 400,
			errors : {
				error : 'failed to create user' 
			}
		}
	}

	const token = await response.json();

	// SET HEADER COOKIE
	setHeaders({
		'Set-Cookie' : cookie.serialize('token',token,{
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30
		})
	})

};
