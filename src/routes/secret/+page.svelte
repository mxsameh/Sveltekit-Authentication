<!-- 
  SECRET PAGE
 -->
<script lang="ts">
	export let data: any;
	$: user = data.user;
</script>

<h1 class="page__title">secret route</h1>
<p class="page__text">welcome {user.name}</p>

<style lang="scss">
	.page {
		&__title {
			font-size: 40px;
			text-align: center;
			color: aquamarine;
			margin-top: 80px;
		}
		&__text {
			font-size: 20px;
			color: azure;
			margin-top: 24px;
			text-align: center;
		}
	}
</style>
