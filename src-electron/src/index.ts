import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import serve from 'electron-serve';

const baseURL = serve({ directory: '../base' });
const port = process.env.PORT || 3000;
const dev = !app.isPackaged;

let mainWindow: BrowserWindow | null;

const baseWindowOptions: BrowserWindowConstructorOptions = {
	backgroundColor: 'whitesmoke',
	titleBarStyle: 'hidden',
	autoHideMenuBar: true,
	trafficLightPosition: {
		x: 17,
		y: 32,
	},
	minHeight: 450,
	minWidth: 500,
	webPreferences: {
		enableRemoteModule: true,
		contextIsolation: true,
		nodeIntegration: true,
		spellcheck: false,
		devTools: dev,
	},
	width: 800,
	height: 600,
};

function createWindow() {
	const mainWindow = new BrowserWindow(baseWindowOptions);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.on('close', () => {});

	return mainWindow;
}

function loadVite(port: string) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 1000);
	});
}

async function createMainWindow() {
	mainWindow = createWindow();

	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (dev) {
		loadVite(port.toString());
	} else {
		await baseURL(mainWindow);
	}
}

// app.on('activate', () => {
// 	if (!mainWindow) {
// 		createMainWindow();
// 	}
// });

app.once('ready', createMainWindow);
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
