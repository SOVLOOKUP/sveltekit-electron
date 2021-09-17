<p align="center">
  <img src="static/sveltekit-electron.svg" />
</p>

# Sveltekit-Electron

1. Double package.json, no devDependencies bundled
2. Auto github action release
3. Auto update use `electron-updater`
4. Auto code lint and format use `prettier`
5. Auto changelog use `gitmoji-changelog`
6. Auto git manage use `gitmoji` and `release-it`
7. TypeScript support use `esbuild`

## Getting Start

You need to install [`yarn`](https://github.com/yarnpkg/yarn) first:

`npm install yarn -g`

| Action           | Command                                     |
| ---------------- | ------------------------------------------- |
| Clone            | · `npx degit SOVLOOKUP/sveltekit-electron ` |
| Install          | · `yarn boot`                               |
| Develop          | · `yarn dev`                                |
| Build            | · `yarn build`                              |
| Package          | · `yarn package`                            |
| Commit + Release | · `yarn ok`                                 |
| Commit           | · `yarn commit`                             |
| Release          | · `yarn release` or `yarn prerelease`       |

## Auto Release

You need to add `github_token` to your repo secret.
