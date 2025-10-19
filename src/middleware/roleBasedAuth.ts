import jwt from 'jsonwebtoken';
import e, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { json } from 'stream/consumers';

dotenv.config();

export const checkRole = (requiredRoles:"admin" | "user" | "both") => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = authHeader.split(' ')[1];
       try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

           (req as any).user = decoded;

            if (typeof decoded === 'object' && decoded !== null && 'role' in decoded) {
                if (requiredRoles === 'both' ) {

                   if (decoded.role === 'admin' || decoded.role === 'user') {
                    next();
                    return;
                   }
                }else if (decoded.role === requiredRoles) {
                    next();
                    return;
                }
                return res.status(401).json({ message: 'Unauthorized' });
        
       } else{
        res.status(401).json({message:"Invalid Payload"})
        return;
       }
      
    }catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}


}

export const adminOnly = checkRole('admin');
export const userOnly = checkRole('user');
export const adminAndUser = checkRole('both');