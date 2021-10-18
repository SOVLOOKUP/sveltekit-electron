import sveltePreprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import dotenv from 'dotenv'
dotenv.config()
const outputDir = process.env.OUTPUT_DIR

/** @type {import("@sveltejs/kit").Config} */
const config = {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: adapter({ pages: outputDir, assets: outputDir }),
		target: '#svelte',
	},
}

export default config
