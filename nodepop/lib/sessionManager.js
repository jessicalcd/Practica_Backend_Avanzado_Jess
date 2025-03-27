import session from 'express-session'

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2 

//midleware para gestionar sesiones
export const middleware = session({
    name: 'nodepop-session',
    secret: 'y`TPvm%L972=<:p(NdtE;"Q>/#Y&3a}r*RG',
    saveUninitialized: true,
    resave: false,
    cookie:{ maxAge: INACTIVITY_EXPIRATION_2_DAYS}
})

export function useSessionInViews(req, res, next) {
    res.locals.session = req.session
    next()
}