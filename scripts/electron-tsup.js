import tsup from 'tsup'
import fs from 'fs-extra'
import dotenv from 'dotenv'
;(async () => {
	dotenv.config()
	const electronDirName = process.env.ELECTRON_DIR_NAME
	const outputDir = process.env.OUTPUT_DIR

	const entryPoints = [`${electronDirName}/src/**/*`]
	const tsupConfig = tsup.defineConfig({
		minify: true,
		minifyIdentifiers: true,
		minifySyntax: true,
		minifyWhitespace: true,
		format: ['cjs'],
		target: 'esnext',
		clean: true,
		entryPoints: entryPoints,
		outDir: `${outputDir}/src`,
		external: ['electron'],
		watch: process.env.NODE_ENV === 'production' ? false : entryPoints,
	})

	// compile electron to cjs
	if (!fs.existsSync(outputDir)) {
		await fs.copy(electronDirName, outputDir)
	}

	if (fs.existsSync('.git')) {
		await fs.copy('.git', `${outputDir}/.git`)
	} else {
		console.warn('Please use git init before release!')
	}

	await tsup.build(tsupConfig)
})()
