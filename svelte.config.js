import sveltePreprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

const outputDir = "build"

/** @type {import("@sveltejs/kit").Config} */
const config = {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: adapter({
			pages: `${outputDir}/build`,
			assets: `${outputDir}/build`,
			fallback: undefined
		}),
		target: '#svelte'
	},
}

export default config