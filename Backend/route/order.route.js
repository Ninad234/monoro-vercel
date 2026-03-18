import express from 'express';
import { createOrder, getUserOrders, getAllOrders } from '../controller/order.controller.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/user/:userId', getUserOrders);
router.get('/', getAllOrders); // Admin only

export default router; 