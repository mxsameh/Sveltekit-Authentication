/**
 * SECRET SERVER PAGE ENDPOINT
 */

import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = ({ locals }) => {

	// CHECK IF USER IS LOGGED IN
	const user = locals.user;

	// IF USER ISN'T LOGGED IN REDIRECT TO LOGIN PAGE
	if (!user) {
		throw redirect(302, '/auth/login?redirectTo=/secret');
	}

	return {
		user
	};
};
