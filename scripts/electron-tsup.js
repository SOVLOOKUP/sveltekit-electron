import tsup from 'tsup'
import fs from 'fs-extra'
;(async () => {
	const electronDirName = 'src-electron'
	const outputDir = 'build'
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

	// clean output
	if (fs.existsSync(outputDir)) {
		fs.rmSync(outputDir, { recursive: true })
	}

	// compile electron to cjs
	await fs.copy(electronDirName, outputDir)
	await tsup.build(tsupConfig)
})()
