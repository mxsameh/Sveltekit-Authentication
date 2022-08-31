<script>
	import '../styles/styles.css';
</script>

<slot />
<a href="/" class="home">home</a>

<style lang="scss">
	.home{
		color: lightcoral;
		text-decoration: underline;
		text-transform: uppercase;
		display: block;
		text-align: center;
		margin-top: 80px;
		font-size: 24px;
		&:hover{
			cursor: pointer;
			color: coral;
		}

	}

</style>
