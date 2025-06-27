import Product from '../models/Product.js'


export async function index (req, res, next) {
    try {
        const userId = req.session.userId
        const filterName = req.query.name

        const limit = req.query.limit
        const skip = req.query.skip

        const sort = req.query.sort

        const filter = {
            owner: userId,
        }

        if (filterName) {
            filter.name = filterName
        }
        
        res.locals.products = await Product.list(filter, limit, skip, sort)
 
        const now = new Date()
        res.locals.esPar = (now.getSeconds() % 2 ) === 0
        res.locals.segundoActual = now.getSeconds()

        res.locals.codigo = `<script>alert("${res.__('injected')}!!!"</script>`

        res.render('home')
    
    } catch (error) {
        next(error)
    }
}