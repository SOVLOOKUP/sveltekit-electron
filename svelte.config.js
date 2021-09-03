import sveltePreprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

/** @type {import("@sveltejs/kit").Config} */
const config = {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: adapter(),
		target: '#svelte',
	},
}

export default config
