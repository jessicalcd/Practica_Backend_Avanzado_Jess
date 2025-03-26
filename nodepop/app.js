import path from 'node:path'
import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import connectMongoose from './lib/connectMongoose.js'
import * as homController from './controllers/homeController.js'
import * as loginController from './controllers/loginController.js'

await connectMongoose()
console.log('Conecte to MongoBD')

const app = express()

app.set('views', 'views')
app.set('view engine', 'html')
app.engine('html', (await import('ejs')).__express)
 
app.locals.appName = 'Nodepop'

app.use(logger('dev'))
app.use(express.static(path.join(import.meta.dirname, 'public')))

/* Aplication routes */

app.get('/', homController.index)
app.get('/login', loginController.index)


//catch 404 and sebd error
app.use((req, res, next) => {
    next(createError(404))
})

//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.locals.message = err.message
    res.locals.error = process.env.NODEPOP_ENV === 'development' ? err : {}

    res.render('error')
})

export default app

