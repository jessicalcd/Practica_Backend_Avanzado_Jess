import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import createError from 'http-errors'

export async function loginJWT(req, res, next) {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username: username })

    if (!user || !(await user.comparePassword(password))) {
      next(createError(401, 'invalid credentials'))
      return
    }

    jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2d'
    }, (err, tokenJWT) => {
      if (err) {
        return next(err)
      }
      res.json({ tokenJWT })
    })

  } catch (error) {
    next(error)
  }
}