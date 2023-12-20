import {jwtService} from "../../services/jwtService/jwtService";
import {Request, Response} from "express";

export const loggoutController = async (req: Request, res: Response) => {
    const token = req.cookies.token || undefined

    const userID = jwtService.verifyToken(token);

    if (userID === '') {
        return res.status(401).json({message: 'Unauthorized'})
    }

    return res.status(200).clearCookie('token');
}