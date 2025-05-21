import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';


// Global variables

const currency = 'usd';
const deliveryCharge = 100;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place order using COD
const placeOrder = async (req, res) => {
   try {

      const {userId, items, amount, address} = req.body;

      const orderData = {
         userId,
         items,
         amount,
         address,
         paymentMethod: 'COD',
         payment: false,
         date: Date.now()
      }

      const newOrder = new orderModel(orderData);
      await newOrder.save();

      await userModel.findByIdAndUpdate(userId, {cartData:{}});

      return res.json({success: true, message: 'Order Placed'});
      
   } catch (error) {
      return res.json({success: false, message: error.message});
   }
}

// place order using razorpay
const placeOrderRazorpay = async (req, res) => {
   
}

// place order using stripe
const placeOrderStripe = async (req, res) => {
   try {

      const {userId, items, amount, address} = req.body;
      const {origin} = req.headers;

      const orderData = {
         userId,
         items,
         amount,
         address,
         paymentMethod: 'Stripe',
         payment: false,
         date: Date.now()
      }

      const newOrder = new orderModel(orderData);
      await newOrder.save();

      const line_items = items.map((item) => ({
         price_data: {
            currency: currency,
            product_data: {
               name: item.name
            },
            unit_amount: item.price * 100
         },
         quantity: item.quantity
      }))

      line_items.push({
         price_data: {
            currency: currency,
            product_data: {
               name: 'Delivery charges'
            },
            unit_amount: deliveryCharge * 100
         },
         quantity: 1
      })

      const session = await stripe.checkout.sessions.create({
         success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
         cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
         line_items,
         mode: 'payment',
      })

      res.json({success: true, session_url: session.url});
      
   } catch (error) {
      console.log(error);
      return res.json({success: false, message: error.message});
   }
}

const verifyStripe = async (req, res) => {
   const {orderId, success, userId} = req.body;

   try {
      if (success === 'true') {
         await orderModel.findByIdAndUpdate(orderId, {payment: true});
         await userModel.findByIdAndUpdate(userId, {cartData: {}});
         return res.json({success: true});
      } else {
         await orderModel.findByIdAndDelete(orderId);
         return res.json({success: false})
      }
   } catch (error) {
      console.log(error);
      res.json({success: false, message: error.message});
   }
}

// get all order details on admin pannel
const allOrders = async (req, res) => {
   try {

      const orders = await orderModel.find({});
      return res.json({success: true, orders});
      
   } catch (error) {
      console.log(error);
      
      return res.json({success: false, message: error.message});
   }
}

// get user orders
const userOrders = async (req, res) => {
   try {

      const {userId} = req.body;

      const orders = await orderModel.find({userId});

      return res.json({success: true, orders})
      
   } catch (error) {
      console.log(error);
      
      return res.json({success: false, message: error.message});
   }
}

// update status for admin
const updateOrderStatus = async (req, res) => {
   try {
      const {orderId, status} = req.body;

      await orderModel.findByIdAndUpdate(orderId, {status});
      return res.json({success: true, message: 'Status Updated'});
   } catch (error) {
      return res.json({success: false, message: error.message});
   }
}

export {placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateOrderStatus, verifyStripe};

