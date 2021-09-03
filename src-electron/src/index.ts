import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import serve from 'electron-serve'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

// log setting
log.transports.file.level = 'debug'
autoUpdater.logger = log
// in dev mode
const dev = !app.isPackaged
// base app
const baseURL = serve({ directory: '../base' })

const baseWindowOptions: BrowserWindowConstructorOptions = {
	backgroundColor: 'whitesmoke',
	titleBarStyle: 'hidden',
	autoHideMenuBar: true,
}

function createWindow() {
	const mainWindow = new BrowserWindow(baseWindowOptions)

	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
		mainWindow.focus()
	})

	mainWindow.on('close', () => {})

	return mainWindow
}

async function loadVite(window: BrowserWindow, port: string) {
	const devURL = `http://localhost:${port}`
	const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), ms))

	const loadURL = async () => {
		try {
			await window.loadURL(devURL)
			console.log('Reached devURL')
		} catch (error) {
			console.log('URL cannot be reached , Retrying')
			await wait(1000)
			await loadURL()
		}
	}

	await loadURL()
}

async function createMainWindow() {
	let mainWindow = createWindow()

	if (dev) {
		mainWindow.webContents.openDevTools({ mode: 'detach' })
		await loadVite(mainWindow, process.env.PORT || '3000')
	} else {
		await baseURL(mainWindow)
	}
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
;(async () => {
	// sandbox mode
	app.enableSandbox()

	// detect update
	autoUpdater.checkForUpdatesAndNotify()

	await app.whenReady()
	await createMainWindow()
})()
