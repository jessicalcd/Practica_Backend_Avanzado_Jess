import session from 'express-session'
import MongoStore from 'connect-mongo'

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2 

//midleware para gestionar sesiones
export const middleware = session({
    name: 'nodepop-session',
    secret: 'y`TPvm%L972=<:p(NdtE;"Q>/#Y&3a}r*RG',
    saveUninitialized: true,
    resave: false,
    cookie:{ maxAge: INACTIVITY_EXPIRATION_2_DAYS},
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/nodepop'
    })
})

export function useSessionInViews(req, res, next) {
    res.locals.session = req.session
    next()
}