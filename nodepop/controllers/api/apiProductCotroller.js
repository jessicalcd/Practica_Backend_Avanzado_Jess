import Product from '../../models/Product.js'

export async function list(req, res, next) {
    try {
        const filterName = req.query.name

        const limit = req.query.limit
        const skip = req.query.skip

        const sort = req.query.sort

        const fields = req.query.fields

        const withCount = req.query.count === 'true'

        const filter = {
            //owner: userId,
        }

        if (filterName) {
            filter.name = filterName
        }

        const products = await Product.list(filter, limit, skip, sort, fields)
        const result = { results: products }

        if (withCount) {
            const count = await Product.countDocuments(filter)
            result.count = count
        }

        res.json(result)

    } catch (error) {
        next(error)
    }
}