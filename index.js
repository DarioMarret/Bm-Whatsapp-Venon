const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const { registartSession, start, Logoutt, ObtenerVersionWhatsapp, ReiniciarServicio, EstaConnectado } = require('./src/whatsapp/registartSession');



const app = express();
const port = process.env.PORT || 4000

var server = require('http').createServer();
var io = require('socket.io')(server);
// var server = require("http").Server(app);
// var io = require("socket.io")(server);

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.json({
    limit: '50mb',
    extended: true
}));

app.post("/api/send_whatsapp", (req, res) => {
    const { from, mensaje } = req.body
    try {
        let respuesta = start(from, mensaje)
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(500).send(error)
    }

})

app.get("/api/logout", async (req, res) => {
    try {
        let respuesta = await Logoutt()
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get("/api/connect_estado", async (req, res) => {
    try {
        let respuesta = await EstaConnectado()
        res.status(200).json(respuesta)

    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/api/restart_service", async (req, res) => {
    try {
        let respuesta = await ReiniciarServicio()
        res.status(200).json(respuesta)

    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/api/version_whatsapp", async (req, res) => {
    try {
        let respuesta = await ObtenerVersionWhatsapp()
        res.status(200).json(respuesta)

    } catch (error) {
        res.status(500).send(error)
    }
})

// io = new Server(server, {
//     path: '/whatsapp_a1/',
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//     },
// })

io.on('connection', async (socket) => {
    console.log(socket.rooms);
    socket.on('registartSession:', ({ Numero, user_navegador }) => {
        registartSession(Numero, socket, user_navegador)
    })

    // socket.on('ConfirmarSession:',({Numero, user_navegador}) => {
    //     ConfirmarSession(Numero, socket, user_navegador)
    // })

    socket.emit('conexion:', socket.id)
    console.log(`nueva conexion ${socket.id}`);
});

server.listen(port, () => {
    console.log(`Server on port ${port}`);
});

