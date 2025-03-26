import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

//metodo del modelo
userSchema.statics.hashPassword = (clearPassword) => {
    return bcrypt.hash(clearPassword, 7)
}

//metodo de las instancias de usuario
userSchema.methods.comparePassword = function(clearPassword) {
    return bcrypt.compare(clearPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User