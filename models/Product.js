const {model, Schema} = require('mongoose')

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    description: String,
    stock: Number,
    photo: {
      type: String,
      default:
        'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2016/09/chicharronpreparado.jpg'
    },
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

module.exports = model('Product', productSchema)
