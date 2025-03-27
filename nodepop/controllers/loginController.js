import User from '../models/User.js'

export function index(req, res, next) {
    res.locals.error = ''
    res.locals.username = ''
    res.render('login')
}

export async function postLogin(req, res, next) {
    try {
        const { username, password } = req.body
        const redir = req.query.redir

        //buscar el usuario en la base de datos
        const user = await User.findOne({ username: username })

        if (!user || !(await user.comparePassword(password))) {
            res.locals.error = 'Invalid credentials'
            res.locals.username = username
            res.render('login')
            return
        }

        req.session.userId = user.id

        res.redirect(redir ? redir : '/')

    } catch (error) {
        next(error)
    }
}

export function logout(req, res, next) {
    req.session.regenerate(err => {
        if (err) {
            next(err)
            return
        }
        res.redirect('/')
    })
}