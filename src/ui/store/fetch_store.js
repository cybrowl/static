import { writable } from 'svelte/store';

export const assets_store = writable({ isFetching: false, assets: [] });
export const assets_store_fetching = function () {
	assets_store.update(({ assets }) => {
		return {
			isFetching: true,
			assets: assets
		};
	});
};
