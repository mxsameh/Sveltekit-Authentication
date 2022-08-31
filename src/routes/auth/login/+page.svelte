<!-- 
  LOGIN SVELTE PAGE
 -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';


	let error: string;

	// LOGIN FUNCTION
	const login = async (e: any) => {

		// GET FORM ELEMENT
		const formEl = e.target as HTMLFormElement;

		// Verify user
		const response = await fetch(formEl.action, {
			method: 'POST',
			body: new FormData(formEl),
			headers: { accept: 'application/json' }
		})
		// .then(res => res.json())

		// INVALID USERNAME OR PASSWORD
		if (!response.ok) {
			error = 'Incorrect username or password';
			return
		} 

		// REDIRECT USER AFTER A VALIDATION
		const path = $page.url.searchParams.get('redirectTo') || '/';
		goto(path);

		// RESET FORM
		formEl.reset();

	};

</script>

<h1 class="page__title">Login</h1>

<form class="form" on:submit|preventDefault={login}>
	<!-- Username -->
	<label class="form__label" for="username">username</label>
	<input
		class="form__input"
		name="username"
		type="text"
		placeholder="Enter your username"
		autocomplete="off"
		required
	/>

	<!-- Password -->
	<label class="form__label" for="password">password</label>
	<input
		class="form__input"
		name="password"
		type="password"
		placeholder="Enter your password"
		required
	/>

	{#if error}
		<p class="form__error">{error}</p>
	{/if}

	<button class="form__btn">login</button>
</form>

<style lang="scss">
	.page__title {
		font-size: 40px;
		text-align: center;
		color: aquamarine;
		margin-top: 80px;
	}

	.form {
		margin: 40px auto 0;
		max-width: 500px;

		&__label {
			font-size: 20px;
			display: block;
			text-transform: capitalize;
			&:last-of-type {
				margin-top: 24px;
			}
		}
		&__input {
			padding: 14px 12px;
			width: 100%;
			margin-top: 16px;
			border-radius: 8px;
			font-size: 16px;
		}
		&__btn {
			font-size: 20px;
			background-color: lightblue;
			padding: 12px;
			width: 100%;
			text-transform: capitalize;
			display: block;
			border-radius: 16px;
			margin: 40px auto 0;

			&:hover {
				background-color: aquamarine;
				cursor: pointer;
			}
		}
		&__error {
			margin-top: 16px;
			font-size: 16px;
			color: red;
		}
	}
</style>
