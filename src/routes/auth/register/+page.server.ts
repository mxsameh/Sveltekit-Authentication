/**
 * REGISTRATION SERVER PAGE ENDPOINT
 */

import { COLOR, DB_HOST, TOKEN_SECRET } from '$env/static/private';
import type { Action } from '@sveltejs/kit';
import { createToken } from '../../../utils/jwt'
import cookie from 'cookie'

export const POST: Action = async ({ request, setHeaders }) => {

	const form = await request.formData();

	// GET USER FROM REQUEST'S FORM
	const user = {
		name: form.get('name') as string,
		username: form.get('username') as string,
		password: form.get('password') as string,
		admin: false
	};

	// ADD USER TO DATABASE
	const response = await fetch(`${DB_HOST}/users`, {
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

	const userData = await response.json();

	// CREATE TOKEN
	const token = createToken(userData, TOKEN_SECRET)

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
