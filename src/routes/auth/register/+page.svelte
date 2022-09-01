<!-- 
  REGEISTER SVELTE PAGE
 -->
<script lang="ts">
import { goto } from "$app/navigation";



	let error: string;

	// REGISTER FUNCTION
	const register = async (e: SubmitEvent) => {

		// GET FORM ELEMENT
		const form = e.target as HTMLFormElement;

		// CREATE USER
		const response = await fetch(form.action, {
			method: form.method,
			body: new FormData(form)
		});

		// FAILED TO CREATE USER
		if(!response.ok)
		{
			error = 'Username isn\'t available'
			return
		}

		// REDIRECT TO HOME PAGE IF CREATED SUCCESSFULLY
		goto('/')

	};

</script>

<h1 class="page__title">Regiter</h1>

<form class="form" on:submit|preventDefault={register} method="POST">
	<!-- Name -->
	<label class="form__label" for="name">Name</label>
	<input
		class="form__input"
		name="name"
		type="text"
		placeholder="Enter your name"
		autocomplete="off"
		required
	/>

	<!-- AGE -->
	<label class="form__label" for="age">AGE</label>
	<input
		class="form__input"
		name="age"
		type="text"
		placeholder="Enter your age"
		autocomplete="off"
		required
	/>

	<!-- Username -->
	<label class="form__label" for="username">username</label>
	<input
		class="form__input"
		name="username"
		type="text"
		placeholder="Enter username"
		autocomplete="off"
		required
	/>

	<!-- Password -->
	<label class="form__label" for="password">password</label>
	<input
		class="form__input"
		name="password"
		type="password"
		placeholder="Enter password"
		required
	/>

	{#if error}
		<p class="formm__error">{error}</p>
	{/if}

	<button class="form__btn">register</button>
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
			&:not(:first-child) {
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
	}
</style>
