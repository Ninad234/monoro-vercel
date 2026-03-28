import express from 'express';
import {signup, login, updateAddress} from '../controller/user.controller.js';
const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.put('/update-profile/:id',updateAddress)

export default router;