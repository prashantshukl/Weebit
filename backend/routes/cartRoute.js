import express from 'express';
import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js';
import userAuth from '../middlewares/auth.js';

const cartRouter = express.Router();

cartRouter.post('/get', userAuth, getUserCart);
cartRouter.post('/add', userAuth, addToCart);
cartRouter.post('/update',userAuth, updateCart);

export default cartRouter;