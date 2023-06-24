module.exports = {
	content: ['./src/ui/**/*.{html,js,cjs,svelte}', './src/**/*.html', './src/**/*.svelte'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ['Roboto', 'sans-serif']
			},
			colors: {
				backdrop: '#1B1A22',
				'black-a': '#212029',
				'dark-grey': '#32313D',
				'smoky-grey': '#454352',
				grey: '#5A5866',
				'castle-grey': '#706E7A',
				'stone-grey': '#85838F',
				'fog-grey': '#9B99A3',
				'mist-grey': '#B1B0B8',
				'moon-grey': '#C6C4CC',
				'light-grey': '#E2E1E6',
				'light-green': '#cad2c5',
				'leaf-green': '#84a98c',
				'grass-green': '#354f52'
			},
			screens: {
				'3xl': '2222px'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
