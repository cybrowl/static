<script>
	import { onMount } from 'svelte';

	import { PageNavigation, JsonDisplay } from 'static-components';

	import { actor_file_scaling_manager } from '$stores_ref/actors';
	import { nav_items, select_item } from '$stores_ref/page_navigation';

	let can_records = [];

	select_item(1);

	onMount(async () => {
		try {
			can_records = await $actor_file_scaling_manager.actor.get_canister_records();
		} catch (error) {
			console.log('err: ', error);
		}
	});
</script>

<!-- Canisters -->
<svelte:head>
	<title>Canisters</title>
</svelte:head>

<main class="grid_layout">
	<div class="navigation_main_layout">
		<PageNavigation navigationItems={nav_items} />
		<div class="canisters_layout">
			<JsonDisplay data={can_records} />
		</div>
	</div>
</main>

<style lang="postcss">
	.grid_layout {
		@apply grid grid-cols-12 gap-y-2 relative mx-12 2xl:mx-60;
	}
	.navigation_main_layout {
		@apply row-start-1 row-end-auto col-start-1 col-end-13 sticky top-0 z-30 bg-backdrop;
	}
	.canisters_layout {
		@apply row-start-4 row-end-auto grid lg:grid-cols-3 md:grid-cols-2 col-start-1 col-end-13 gap-x-6 gap-y-12 mb-16;
	}
</style>
