
import express from 'express'
import {createProducts, getAllProducts, getSingleProduct, updateProduct, deleteProduct } from '../controller/productController'

const router = express();


router.post('/create', createProducts)
router.get('/getAll', getAllProducts)
router.get('/getOne/:id', getSingleProduct)
router.patch('/update/:id', updateProduct)
router.delete('/delete/:id', deleteProduct)


export default router