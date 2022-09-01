/**
 * LOGIN PAGE ENDPOINT
 */

import type { Action } from '@sveltejs/kit';
import cookie from 'cookie';

export const POST: Action = async ({ request, setHeaders, url }) => {

	// Get form data from request
	const form = await request.formData();
	const user = {
		username: form.get('username') as string,
		password: form.get('password') as string
	};

	// check if user is in database
	const authentication = await fetch(`${url.origin}/api/authenticate`, {
		method: 'Post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
	.then((res) => res.json());


	// SET RESPONSE HEADERS
	setHeaders({
		'Set-Cookie': cookie.serialize('token', authentication.token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30
		})
	});

	// UNAUTHENTICATED
	if (!authentication.authenticated) {
		return {
			status: 403,
			errors: {
				username: 'Incorrect username or password'
			}
		};
	}

};
