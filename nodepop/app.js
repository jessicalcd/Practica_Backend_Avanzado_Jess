import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import * as homController from './controllers/homeController.js'

const app = express()

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(logger('dev'))

app.get('/', homController.index)

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

