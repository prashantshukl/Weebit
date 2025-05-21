import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
   const {token} = req.headers;
   if (!token) {
      return res.json({success: false, message: 'user not authorized'});
   }

   try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = decodedToken.id;
      next();
      
   } catch (error) {
      console.log(error);
      return res.json({success: false, message: error.message});
   }
}

export default userAuth;