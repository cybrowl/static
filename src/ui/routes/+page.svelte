<script>
	import { onMount } from 'svelte';

	import { PageNavigation, UploadButton, Image } from 'static-components';

	onMount(async () => {});

	let assets = [];
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
		>
			<UploadButton />
		</PageNavigation>
	</div>
	<div class="images_layout">
		{#each assets as asset}
			{#if asset.type === 'image'}
				<Image {asset} />
			{/if}
		{/each}
	</div>
</main>

<style lang="postcss">
	.grid_layout {
		@apply hidden lg:grid grid-cols-12 gap-y-2 relative mx-12 2xl:mx-60;
	}
	.navigation_main_layout {
		@apply row-start-1 row-end-auto col-start-1 col-end-13;
	}
	.images_layout {
		@apply row-start-4 row-end-auto hidden lg:grid grid-cols-3 col-start-1 col-end-13 gap-x-6 gap-y-12 mb-16;
	}
</style>
