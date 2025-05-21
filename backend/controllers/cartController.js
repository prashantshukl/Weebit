import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
   try {

      const {userId, itemId, size} = req.body;

      const user = await userModel.findById(userId);
      let cartData = await user.cartData;

      if (cartData[itemId]) {
         if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
         } else {
            cartData[itemId][size] = 1;
         }
      } else {
         cartData[itemId] = {};
         cartData[itemId][size] = 1;
      }

      await userModel.findByIdAndUpdate(userId, {cartData});

      return res.json({success: true, message: 'Added To cart'});
      
   } catch (error) {
      console.log(error);
      
      return res.json({success: false, message: error.message});

   }
}

const updateCart = async (req, res) => {
   try {

      const {userId, itemId, size, quantity} = req.body;

      const user = await userModel.findById(userId);
      let cartData = await user.cartData;

      cartData[itemId][size] = quantity;

      await userModel.findByIdAndUpdate(userId, {cartData});

      return res.json({success: true, message: 'Updated cart'});

   } catch (error) {
      console.log(error);
      
      return res.json({success: false, message: error.message});
   }
}

const getUserCart = async (req, res) => {
   try {

      const {userId} = req.body;

      const user = await userModel.findById(userId);
      const cartData = await user.cartData;

      return res.json({success: true, cartData});
      
   } catch (error) {
      console.log(error);
      
      return res.json({success: false, message: error.message});
   }
}

export {addToCart, updateCart, getUserCart};
