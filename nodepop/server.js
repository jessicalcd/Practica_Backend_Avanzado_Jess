import express from 'express'
import http from 'node:http'

const port = process.env.PORT || 3000
const app = express()

app.get('/', (req, res, next) => {
    res.send('Hola')
})

const server = http.createServer(app)

server.on('listening', () => {
    console.log(`Server started on http://localhost:${port}`)
})

server.listen(port)