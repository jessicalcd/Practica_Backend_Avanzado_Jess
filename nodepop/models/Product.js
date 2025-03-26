import mongoose, {Schema} from "mongoose";

//Definir el esquema de los productos
const productSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    tags: { type: [String], enum: ['work', 'lifestyle', 'motor', 'mobile'] },
  }, {
    collection: 'productos'
  })

//Crear el modelo
const Product = mongoose.model('Product', productSchema)

export default Product