import express from 'express'
import createError from 'http-errors'

const app = express()

app.use((req, res, next) => {
    console.log('Llega petición de tipo', req.method, 'a', req.url)
    next()
})

app.get('/', (req, res, next) => {
    res.send('Hola')
})

//catch 404 and sebd error
app.use((req, res, next) => {
    next(createError(404))
})

//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send('Ocurrio un error: ' + err.mesage)
})

export default app

