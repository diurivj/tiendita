const router = require('express').Router()
const uploadCloud = require('../config/cloudinary')
const catchErrors = require('../middlewares/catchErrors')

const {
  getProduct,
  getProducts,
  addProduct,
  addProductForm,
  editProduct,
  editProductForm,
  deleteProduct
} = require('../controllers/productController')

//TODO: Rutas:
/*
  mostrar los productos
  crear productos
  editar producto
  borrar producto
  === CRUD
*/

router.get('/create', addProductForm) // mostrar crear uno *
router.get('/all', catchErrors(getProducts)) // mostrar todo
router.post('/create', uploadCloud.single('photo'), catchErrors(addProduct)) //  crear un producto
router.get('/:productId', catchErrors(getProduct)) // mostrar uno
router.get('/edit/:productId', editProductForm) // mostrar editar un producto *
router.post(
  '/edit/:productId',
  uploadCloud.single('photo'),
  catchErrors(editProduct)
) //  editar un producto
router.get('/delete/:productId', catchErrors(deleteProduct)) // borrar un producto

module.exports = router
