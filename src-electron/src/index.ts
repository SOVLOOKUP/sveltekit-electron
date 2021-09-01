import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import serve from 'electron-serve'

const baseURL = serve({ directory: '../base' })
const port = process.env.PORT || 3000
const dev = !app.isPackaged

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

async function loadVite(port: string) {
	try {
		await mainWindow?.loadURL(`http://localhost:${port}`)
	} catch (error) {
		console.log('Error loading URL, retrying', error)
		setTimeout(() => {
			loadVite(port)
		}, 1000)
	}
}

async function createMainWindow() {
	mainWindow = createWindow()

	mainWindow.once('close', () => {
		mainWindow = null
	})

	if (dev) {
		await loadVite(port.toString())
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
