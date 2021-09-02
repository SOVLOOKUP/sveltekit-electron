import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import serve from 'electron-serve'

const dev = !app.isPackaged

const baseURL = serve({ directory: '../base' })
const port = process.env.PORT || 3000

let mainWindow: BrowserWindow | null

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
	mainWindow = createWindow()

	mainWindow.once('close', () => {
		mainWindow = null
	})

	if (dev) {
		mainWindow.webContents.openDevTools({ mode: 'detach' })
		await loadVite(mainWindow, port.toString())
	} else {
		await baseURL(mainWindow)
	}
}

// app.on('activate', () => {
// 	if (!mainWindow) {
// 		createMainWindow();
// 	}
// });

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
;(async () => {
	await app.whenReady()
	await createMainWindow()
})()
