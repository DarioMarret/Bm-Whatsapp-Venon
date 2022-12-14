const venom = require('venom-bot');

var conexion_ws;
const registartSession = (numero, socket) => {
    venom.create(
        numero,
        (base64Qr, asciiQR, attempts, urlCode) => {
            socket.emit('qr:', urlCode);
            console.log(urlCode)
        },
        (statusSession, session) => {
            console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
            console.log('Session name: ', session);
            if (statusSession == ' successChat') {
                socket.emit('ready:', 'Conexion exitosa');
            }
        },
        {
            multidevice: true,
            folderNameToken: 'tokens',
            mkdirFolderToken: '',
            headless: true,
            devtools: false,
            useChrome: true,
            debug: false,
            logQR: false,
            browserWS: '',
            browserArgs: [''],
            addBrowserArgs: [''],
            puppeteerOptions: {
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            },
            disableSpins: true,
            disableWelcome: false,
            updatesLog: true,
            autoClose: 60000,
            createPathFileToken: true,
            chromiumVersion: '818858',
            addProxy: [''],
            userProxy: '',
            userPass: ''
        },
    ).then((client) => {
        conexion_ws = client;
        socket.emit('ready:', 'Conexion exitosa');

    }).catch((erro) => {
        console.log(erro);
        socket.emit('auth_failure:', '** Error de autentificacion vuelve a generar el QRCODE **');
    });
}
async function start(from, mensaje) {
    return await conexion_ws.sendText(from, mensaje)
}
async function Logoutt() {
    return await conexion_ws.logout()
}

async function EstaConnectado() {
    return await conexion_ws.isConnected()
}

async function ReiniciarServicio() {
    return await conexion_ws.restartService()
}

async function ObtenerVersionWhatsapp() {
    return await conexion_ws.getWAVersion()
}


module.exports = {
    registartSession,
    start, Logoutt, EstaConnectado,
    ReiniciarServicio, ObtenerVersionWhatsapp
}



