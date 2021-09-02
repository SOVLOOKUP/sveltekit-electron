<p align="center">
  <img src="static/sveltekit-electron.svg" />
</p>

# Sveltekit-Electron

1. Double package.json, no devDependencies bundled
2. Auto code lint and format
3. Auto changelog
4. Auto git manage
5. Auto github action release
6. TypeScript + ES6

## Getting Start

You need install [`pnpm`](https://github.com/pnpm/pnpm) first:

`npm install pnpm -g`

| Action           | Command                                      |
| ---------------- | -------------------------------------------- |
| Clone            | · `pnpx degit SOVLOOKUP/sveltekit-electron ` |
| Install          | · `pnpm bootstrap`                           |
| Develop          | · `pnpm dev`                                 |
| Build            | · `pnpm build`                               |
| Commit + Release | · `pnpm ok`                                  |
| Commit           | · `pnpm commit`                              |
| Release          | · `pnpm release` or `pnpm prerelease`        |

## Auto Release

You need to add `github_token` to your repo secret.
