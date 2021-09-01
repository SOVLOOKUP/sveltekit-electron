import tsup from 'tsup'
import fs from 'fs-extra'
import dotenv from 'dotenv'

dotenv.config()

const electronDirName = process.env.ELECTRON_DIR_NAME
const outputDir = process.env.OUTPUT_DIR

const tsupConfig = tsup.defineConfig({
	minify: true,
	minifyIdentifiers: true,
	minifySyntax: true,
	minifyWhitespace: true,
	format: ['cjs'],
	target: 'esnext',
	clean: true,
	entryPoints: [`${electronDirName}/src/**/*`],
	outDir: `${outputDir}/src`,
	external: ['electron'],
	watch: process.env.NODE_ENV === 'development' ? true : false,
})

	; (async () => {


		// clean output
		if (fs.existsSync(outputDir)) {
			fs.rmSync(outputDir, { recursive: true })
		}

		// compile electron to cjs
		await fs.copy(electronDirName, outputDir)
		await tsup.build(tsupConfig)
	})()
