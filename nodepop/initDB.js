import 'dotenv/config'

import readline from 'node:readline/promises'
import connectMongoose from './lib/connectMongoose.js'
import Product from './models/Product.js'
import User from './models/User.js'

const connection = await connectMongoose()
console.log('Connected to MongoDB', connection.name)

const answer = await ask('Are yuo sure you want to delete datebase collections? (n)' )
if (answer.toLowerCase() !== 'y') {
    console.log('Operation aborted.')
    process.exit()
}

await initUsers()
await initProducts()

await connection.close()

async function initProducts() {
    //delete all product
    const result = await Product.deleteMany()
    console.log(`delete ${result.deletedCount} products.`)

    const [admin, user] = await Promise.all([
        User.findOne({ email: 'admin@example.com'}),
        User.findOne({ email: 'user1@example.com'}),
    ])

    //create product
    const insertResult = await Product.insertMany([
        { name: 'Lampara LED', owner: admin._id, price: 40, tags: ['work'] },
        { name: 'Zapatillas Nike Air Max', owner: admin._id, price: 100, tags: ['lifestyle'] },
        { name: 'Bicicleta Trek Marlin', owner: user._id, price: 650, tags: ['lifestyle', 'motor'] },
        { name: 'iPhone 13 Pro Max', owner: admin._id, price: 1100, tags: ['mobile'] },
    ])
    console.log(`Inserted ${insertResult.length} products.`)
}

async function initUsers() {
    //delete all user
    const result = await User.deleteMany()
    console.log(`delete ${result.deletedCount} users.`)

    //create user
    const insertResult = await User.insertMany([
        { email: 'admin@example.com', password: await User.hashPassword('1234') },
        { email: 'user1@example.com', password: await User.hashPassword('1234') },

    ])
    console.log(`Inserted ${insertResult.length} users.`)
}

async function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const result = await rl.question(question)
    rl.close()
    return result
}