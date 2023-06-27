<script>
	import { onMount } from 'svelte';
	import { get } from 'lodash';
	import { AssetManager } from 'agent-js-file-upload';
	// import { AssetManager } from '@dfinity/file-upload';

	import { PageNavigation, UploadButton, Image, VideoPlayer } from 'static-components';
	import { Jumper } from 'svelte-loading-spinners';

	import { actor_file_scaling_manager } from '$stores_ref/actors';
	import { nav_items, select_item } from '$stores_ref/page_navigation';

	import environment from 'environment';

	const env = environment();

	select_item(0);
	//NOTE: this is if you want to get a single canister defined in dfx
	// const canisterIds = env.canisterIds['file_storage'];
	// let file_storage_canister_id = canisterIds[env['DFX_NETWORK']];

	let asset_manager = {};
	let assets = [];
	let is_uploading = false;

	onMount(async () => {
		try {
			let can_records = await $actor_file_scaling_manager.actor.get_canister_records();
			console.log('can_records: ', can_records);

			let canister_id = await $actor_file_scaling_manager.actor.get_file_storage_canister_id();
			const host = env.isProd ? `https://${canister_id}.icp0.io/` : `http://127.0.0.1:8080`;

			asset_manager = new AssetManager({
				actor_config: {
					canister_id: canister_id,
					identity: null,
					host: host,
					is_prod: env.isProd
				}
			});
			const assets_ = await asset_manager.getAllAssets();

			console.log('assets_: ', assets_);

			assets = assets_;
		} catch (error) {
			console.log('err: ', error);
		}
	});

	async function handleFileSelection(event) {
		is_uploading = true;

		const file = event.detail;
		const file_name = get(file, 'name', '');
		const file_type = get(file, 'type', '');
		const file_array_buffer = file && new Uint8Array(await file.arrayBuffer());

		try {
			const { ok: asset_id } = await asset_manager.store(file_array_buffer, {
				filename: file_name,
				content_type: file_type
			});

			const assets_ = await asset_manager.getAllAssets();

			console.log('assets_: ', assets_);

			is_uploading = false;
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
		<PageNavigation navigationItems={nav_items}>
			{#if is_uploading}
				<Jumper size="60" color="#a6b98b" unit="px" duration="1s" />
			{:else}
				<UploadButton on:fileSelection={handleFileSelection} />
			{/if}
		</PageNavigation>
	</div>
	<div class="content_layout">
		{#each assets as asset}
			{#if asset.content_type.includes('image')}
				<Image {asset} />
			{/if}
			{#if asset.content_type.includes('video')}
				<VideoPlayer {asset} />
			{/if}
		{/each}
	</div>
</main>

<style lang="postcss">
	.grid_layout {
		@apply grid grid-cols-12 gap-y-2 relative mx-12 2xl:mx-60;
	}
	.navigation_main_layout {
		@apply row-start-1 row-end-auto col-start-1 col-end-13 sticky top-0 z-30 bg-backdrop;
	}
	.content_layout {
		@apply row-start-4 row-end-auto grid lg:grid-cols-3 md:grid-cols-2 col-start-1 col-end-13 gap-x-6 gap-y-12 mb-16;
	}
</style>
