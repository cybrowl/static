<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import { PageNavigation } from 'static-components';

	onMount(async () => {});
</script>

<!-- Home -->
<svelte:head>
	<title>Static</title>
</svelte:head>

<main class="grid_layout">
	<div class="navigation_main_layout">
		<PageNavigation
			navigationItems={[
				{ name: 'Home', isSelected: false },
				{ name: 'Canisters', isSelected: false }
			]}
			on:home={() => {
				goto('/');
			}}
		/>
	</div>
</main>

<style lang="postcss">
	.grid_layout {
		@apply hidden lg:grid grid-cols-12 gap-y-2 relative mx-12 2xl:mx-60;
	}
	.navigation_main_layout {
		@apply row-start-1 row-end-auto col-start-1 col-end-13;
	}
</style>
