import Product from '../../models/Product.js'

export async function list(req, res, next) {
    try {
        const filterName = req.query.name

        const limit = req.query.limit
        const skip = req.query.skip

        const sort = req.query.sort

        const filter = {
            //owner: userId,
        }

        if (filterName) {
            filter.name = filterName
        }

        const products = await Product.list(filter, limit, skip, sort)

        res.json({ results: products })

    } catch (error) {
        next(error)
    }
}