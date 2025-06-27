import mongoose, {Schema} from "mongoose";

//Definir el esquema de los productos
const productSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  price: { type: Number, required: true },
  image: { type: String },
  tags: { type: [String], enum: ['work', 'lifestyle', 'motor', 'mobile'] },
}, {
  collection: 'productos'
})

productSchema.statics.list = function(filter, limit, skip, sort) {
  const query = Product.find(filter)
  query.limit(limit)
  query.skip(skip)
  query.sort(sort)
  return query.exec()
}


//Crear el modelo
const Product = mongoose.model('Product', productSchema)

export default Product