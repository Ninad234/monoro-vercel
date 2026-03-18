import express from 'express';
import { getproducts, getProductById, addProduct, updateProduct, deleteProduct } from '../controller/product.controller.js';

const router = express.Router();

router.get('/',getproducts);
router.get('/:id', getProductById);
router.post('/', addProduct); // Admin only
router.put('/:id', updateProduct); // Admin only
router.delete('/:id', deleteProduct); // Admin only

export default router;