import path from 'node:path'
import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import connectMongoose from './lib/connectMongoose.js'
import * as homeController from './controllers/homeController.js'
import * as loginController from './controllers/loginController.js'
import * as sessionManager from './lib/sessionManager.js'


await connectMongoose()
console.log('Conecte to MongoBD')

const app = express()

app.set('views', 'views')
app.set('view engine', 'html')
app.engine('html', (await import('ejs')).__express)
 
app.locals.appName = 'Nodepop'

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false })) 
app.use(express.static(path.join(import.meta.dirname, 'public')))

/* Aplication routes */

app.use(sessionManager.middleware)
app.use(sessionManager.useSessionInViews)
app.get('/', homeController.index)
app.get('/login', loginController.index)
app.post('/login', loginController.postLogin)
app.get('/logout', loginController.logout)


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

