import { writable } from 'svelte/store';

export const modal_visible = writable({
	preview_asset: false
});

export const modal_mode = writable({
	project_create: false,
	project: {}
});

function change_visibility(name) {
	modal_visible.update((options) => {
		return {
			...options,
			[name]: !options[name]
		};
	});
}

function set_visibility_false(name) {
	modal_visible.update((options) => {
		return {
			...options,
			[name]: false
		};
	});
}

export default {
	change_visibility,
	set_visibility_false
};
