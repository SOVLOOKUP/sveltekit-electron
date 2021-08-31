import sveltePreprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

/** @type {import("@sveltejs/kit").Config} */
const config = {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: adapter({
			pages: "output/build",
			assets: "output/build",
			fallback: undefined
		}),
		target: '#svelte'
	},
}
export default config