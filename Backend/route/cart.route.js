import express from 'express';
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '../controller/cart.controller.js';

const router = express.Router();

router.get('/:userId', getCart);
router.post('/:userId', addToCart);
router.put('/:userId', updateCartItem);
router.delete('/:userId', removeCartItem);
router.delete('/:userId/clear', clearCart);

export default router; 