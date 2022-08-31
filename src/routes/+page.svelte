<!-- 
  HOME PAGE
 -->
<script>
</script>

<h1 class="page__title">Welcome to Sveltekit Authentication</h1>

<nav class="nav">
	<a class="nav__link" href="/">home</a>
	<a class="nav__link" href="/auth/register">register</a>
	<a class="nav__link" href="/auth/login">login</a>
	<a class="nav__link" href="/secret">secret route</a>
</nav>

<style lang="scss">
	.page__title {
		text-align: center;
		margin-top: 80px;
		color: aqua;
	}

	.nav {
		display: flex;
		gap: 32px;
		width: fit-content;
		margin: 40px auto 0;

		&__link {
			color: white;
			text-transform: capitalize;
			font-size: 20px;
			padding-bottom: 2px;
			&:hover {
				border-bottom: 1px solid gainsboro;
			}
		}
	}
</style>
