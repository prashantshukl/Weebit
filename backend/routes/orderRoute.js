import express from 'express';
import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateOrderStatus, verifyStripe } from '../controllers/orderController.js';
import adminAuth from '../middlewares/adminAuth.js'
import userAuth from '../middlewares/auth.js'

const orderRouter = express.Router();

// Admin Routes
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);

//user Routes
orderRouter.post('/userorders', userAuth, userOrders);

// Payment Routes
orderRouter.post('/place', userAuth, placeOrder);
orderRouter.post('/razorpay', userAuth, placeOrderRazorpay);
orderRouter.post('/stripe', userAuth, placeOrderStripe);

// verify payment
orderRouter.post('/veriystripe', userAuth, verifyStripe)

export default orderRouter;

