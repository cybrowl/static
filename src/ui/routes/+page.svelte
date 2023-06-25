<script>
	import { onMount } from 'svelte';
	import { get } from 'lodash';
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

	let assets = [];

	onMount(async () => {
		try {
			let res = await $actor_file_storage.actor.version();

			const { ok: assets_ } = await asset_manager.listFiles();

			assets = assets_;
		} catch (error) {}
	});

	async function handleFileSelection(event) {
		const file = event.detail;
		const file_name = get(file, 'name', '');
		const file_type = get(file, 'type', '');
		const file_array_buffer = file && new Uint8Array(await file.arrayBuffer());

		try {
			const { ok: asset_id } = await asset_manager.store(file_array_buffer, {
				filename: file_name,
				content_type: file_type
			});

			const { ok: assets_ } = await asset_manager.listFiles();

			assets = assets_;
		} catch (error) {}
	}
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
			<UploadButton on:fileSelection={handleFileSelection} />
		</PageNavigation>
	</div>
	<div class="images_layout">
		{#each assets as asset}
			{#if asset.content_type.includes('image')}
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
