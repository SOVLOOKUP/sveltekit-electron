import tsup from 'tsup'
import fs from 'fs-extra'
import { execSync } from 'child_process'

(async () => {
    const electronDirName = "src-electron"
    const outputDir = "output"
    const tsupConfig = tsup.defineConfig({
        minify: true,
        minifyIdentifiers: true,
        minifySyntax: true,
        minifyWhitespace: true,
        format: ["cjs"],
        target: "esnext",
        clean: true,
        entryPoints: [`${electronDirName}/src/**/*`],
        outDir: `${outputDir}/src`,
        external: ["electron"]
    })

    // clean output
    if (fs.existsSync(outputDir)) {
        fs.rmdirSync(outputDir, { recursive: true })
    }

    // compile electron to cjs
    await fs.copy(electronDirName, outputDir)
    await tsup.build(tsupConfig)

    execSync("cross-env NODE_ENV=production npm run build:svelte && npm run build:electron")
})()




// ./ node_modules / tsup / dist / cli - node.js./ src - electron / src/**/ * --format=cjs--minify--minify - whitespace--minify - identifiers--minify - syntax--target = esnext--clean - d./ src - electron / output