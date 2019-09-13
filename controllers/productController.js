const Product = require('../models/Product')

//TODO: CRUD

exports.getProducts = async (req, res) => {
  const products = await Product.find()
  res.render('products/all', {products})
}

exports.getProduct = async (req, res) => {
  const {productId} = req.params
  const product = await Product.findById(productId)
  res.render('products/single', product)
}

exports.addProduct = async (req, res) => {
  const {name, description, price, stock} = req.body
  const {url: photo} = req.file
  const {id: owner} = req.user

  await Product.create({
    name,
    description,
    stock,
    price,
    photo,
    owner
  })
  res.redirect('/products/all')
}

exports.addProductForm = (req, res) => {
  res.render('products/create')
}

exports.deleteProduct = async (req, res) => {
  const {productId} = req.params
  await Product.findByIdAndDelete(productId)
  res.redirect('/products/all')
}
exports.editProduct = async (req, res) => {
  const {name, description, price, stock} = req.body
  const {url: photo} = req.file
  const {productId} = req.params

  await Product.findByIdAndUpdate(productId, {
    name,
    description,
    price,
    stock,
    photo
  })
  res.redirect('/products/all')
}

exports.editProductForm = (req, res) => {
  res.render('products/edit')
}
