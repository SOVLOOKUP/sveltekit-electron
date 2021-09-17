import dotenv from 'dotenv'
import { path, fs } from 'zx'

dotenv.config()
const electronDirName = process.env.ELECTRON_DIR_NAME
const outputDir = process.env.OUTPUT_DIR

if (fs.existsSync(outputDir)) {
	await fs.rm(outputDir, { recursive: true, force: true })
}

await fs.copy(electronDirName, outputDir)
await fs.rm(path.join(outputDir, 'build'), { recursive: true, force: true })

if (fs.existsSync('.git')) {
	await fs.copy('.git', `${outputDir}/.git`)
} else {
	console.warn('Please use git init before release!')
}
