import express from 'express';
import { submitContact, getContacts } from '../controller/contact.controller.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', getContacts); // admin only

export default router; 