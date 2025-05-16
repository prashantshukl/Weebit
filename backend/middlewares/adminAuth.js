import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
   try {
      const {token} = req.headers;
      if (!token) {
         return res.json({success: false, message: 'not authorized login again'});
      }
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      
      if (decodedToken.id === 'admin') {
         next();
      } else {
         return res.json({success: false, message: 'not Admin'});
      }
   } catch (error) {
      return res.json({success: false, message: error.message});
   }
}

export default adminAuth;