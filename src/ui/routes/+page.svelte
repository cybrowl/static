<script>
	import { onMount } from 'svelte';
	import { AssetManager } from 'agent-js-file-upload';

	import { PageNavigation, UploadButton, Image } from 'static-components';
	import { actor_file_storage } from '$stores_ref/actors';
	import environment from 'environment';

	const env = environment();

	const canisterIds = env.canisterIds['file_storage'];
	const file_storage_canister_id = canisterIds[env['DFX_NETWORK']];

	const host = env.isProd
		? `https://${file_storage_canister_id}.icp0.io/`
		: `http://127.0.0.1:8080`;

	const asset_manager = new AssetManager({
		actor_config: {
			canister_id: file_storage_canister_id,
			identity: null,
			host: host,
			is_prod: env.isProd
		}
	});

	onMount(async () => {
		try {
			let res = await $actor_file_storage.actor.version();
			console.log('res: ', res);

			const response = await asset_manager.getCanisterVersion();
			console.log('version: ', response);
		} catch (error) {}
	});

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
