import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET;

class JWTService {

    SECRET!: string;

    createToken(userID: string) {
        const token = jwt.sign(userID , this.SECRET);
        return token;
    }

    verifyToken(token: string) {

        try {
            const payload = jwt.verify(token, this.SECRET);
            const userID: string = payload as string;
            return userID
        } catch (error) {
            return '';
        }

        
        
    }

    constructor() {
        if (SECRET) {
            this.SECRET = SECRET;
        }
    }
}

export const jwtService = new JWTService();
