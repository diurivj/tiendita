const express = require('express')
const {
  showProfile,
  updateProfile,
  addCredits,
  addCreditsForm
} = require('../controllers/profileController')
const catchErrors = require('../middlewares/catchErrors')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()
const uploadCloud = require('../config/cloudinary')
const Product = require('../models/Product')
const User = require('../models/User')

/* GET home page */
router.get('/', async (req, res, next) => {
  const products = await Product.find().populate({
    path: 'owner',
    populate: {path: 'profile'}
  })
  res.render('index', {products})
})

router.get('/product/:productId', async (req, res) => {
  const {productId} = req.params
  const product = await Product.findById(productId).populate({
    path: 'owner',
    populate: {path: 'profile'}
  })
  res.render('products/single', product)
})

router.get('/profile', isLoggedIn('/auth/login'), catchErrors(showProfile))
router.post(
  '/profile/edit',
  uploadCloud.single('photo'),
  catchErrors(updateProfile)
)

router.get('/credits/add', isLoggedIn('/auth/login'), addCreditsForm)
router.post('/credits/add', isLoggedIn('/auth/login'), catchErrors(addCredits))

router.get(
  '/buy/:productId',
  isLoggedIn('/auth/login'),
  catchErrors(async (req, res) => {
    const {productId} = req.params
    const product = await Product.findById(productId)
    console.log(product, productId)
    await product.update({stock: product.stock - 1})
    await User.findByIdAndUpdate(req.user.id, {
      $push: {products: productId},
      credits: req.user.credits - product.price
    })
    res.redirect('/')
  })
)

module.exports = router
