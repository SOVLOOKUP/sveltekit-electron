import fs from 'fs-extra'
import dotenv from 'dotenv'
;(async () => {
	dotenv.config()
	const electronDirName = process.env.ELECTRON_DIR_NAME
	const outputDir = process.env.OUTPUT_DIR

	// compile electron to cjs
	if (!fs.existsSync(outputDir)) {
		await fs.copy(electronDirName, outputDir)
	}

	if (fs.existsSync('.git')) {
		await fs.copy('.git', `${outputDir}/.git`)
	} else {
		console.warn('Please use git init before release!')
	}
})()
