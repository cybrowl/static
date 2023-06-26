import { writable } from 'svelte/store';

export const nav_items = [
	{ name: 'Home', href: '', isSelected: false },
	{ name: 'Canisters', href: 'canisters', isSelected: false }
];

export const page_navigation = writable({
	navigationItems: nav_items
});

export function select_item(num) {
	if (num > nav_items.length) {
		console.warn('num out of range');
	}

	page_navigation.update(({ navigationItems }) => {
		navigationItems.forEach((navItem) => {
			navItem.isSelected = false;
		});
		navigationItems[num].isSelected = true;

		return {
			navigationItems: navigationItems
		};
	});
}
