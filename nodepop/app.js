import path from 'node:path'
import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import connectMongoose from './lib/connectMongoose.js'
import * as homeController from './controllers/homeController.js'
import * as loginController from './controllers/loginController.js'
import * as productsController from './controllers/productsController.js'
import * as localeController from './controllers/localeCotroller.js'
import * as apiProductController from './controllers/api/apiProductCotroller.js'
import * as sessionManager from './lib/sessionManager.js'
import upload from './lib/uploadConfigure.js'
import i18n from './lib/i18nConfigure.js'
import cookieParser from 'cookie-parser'
import swaggerMiddleware from './lib/swaggerMiddleware.js'

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

/** API routes */
app.get('/api/products', apiProductController.list)
app.get('/api/products/:productId', apiProductController.getOne)
app.post('/api/products', upload.single('image'), apiProductController.newProduct)
app.put('/api/products/:productId', upload.single('image'), apiProductController.update)
app.delete('/api/products/:productId', apiProductController.deleteProduct)

/* web Aplication routes */
app.use(cookieParser())
app.use(sessionManager.middleware)
app.use(sessionManager.useSessionInViews)
app.use(i18n.init)
app.get('/change-locale/:locale', localeController.changeLocale)
app.get('/', homeController.index)
app.get('/login', loginController.index)
app.post('/login', loginController.postLogin)
app.get('/logout', loginController.logout)
app.get('/products/new', sessionManager.guard, productsController.index)
app.post('/products/new', sessionManager.guard, upload.single('image'), productsController.postNew)
app.get('/products/delete/:productId', sessionManager.guard, productsController.deleteProduct)
app.use('/api-doc', swaggerMiddleware)

//catch 404 and sebd error
app.use((req, res, next) => {
    next(createError(404))
})

//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)

    if (req.url.startsWith('/api/')) {
        res.json({ error: err.message })
        return
    }

    res.locals.message = err.message
    res.locals.error = process.env.NODEPOP_ENV === 'development' ? err : {}

    res.render('error')
})

export default app

