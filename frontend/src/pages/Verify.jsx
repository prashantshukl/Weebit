import React, { useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';

const Verify = () => {

   const [searchParams, setSearchParams] = useSearchParams();

   const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext);

   const success = searchParams.get('success');
   const orderId = searchParams.get('orderId');

   const verifyPayment = async () => {
      try {

         const response = await axios.post(backendUrl+ '/api/order/verifystripe', {success, orderId}, {headers: {token}});
         if (response.data.success) {
            setCartItems({});
            navigate('/orders');
         } else {
            navigate('/cart');
         }
         
      } catch (error) {
         console.log(error);
         toast.error(error.message);
      }
   }

   useEffect(()=>{
      verifyPayment();
   },[token]);
  return (
    <div>
      
    </div>
  )
}

export default Verify