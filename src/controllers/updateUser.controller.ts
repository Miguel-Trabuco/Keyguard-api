import { mongooseService } from "../services/mongooseService/userService";
import { jwtService } from "../services/jwtService/jwtService";
import { bcryptService } from "../services/bcryptService/bcryptService";
import { Request, Response } from "express";

export const updateUserController = async (req: Request, res: Response) => {
    const { email, username, newPassword, password, token}: {email: string, username: string, newPassword: string, password: string, token: string} = req.body;

    if (!email && !username && !newPassword) {
        return res.status(400).json({ message: "No data provided" });
    }

    const userID = await jwtService.verifyToken(token);

    if (!userID) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const userDoc = await mongooseService.findUser({userID});

    if (!userDoc) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isPasswordValid: boolean = await bcryptService.comparePassword(password, userDoc.passwordHash);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Wrong Password" });
    }
    
    switch (true) {
        case email !== undefined:
            await mongooseService.updateUser({userID}, {email});
        case username !== undefined:
            console.log('entrou no case')
            await mongooseService.updateUser({userID}, {username});
        case newPassword !== undefined:
            const hashedPassword = await bcryptService.hashPassword(newPassword);
            await mongooseService.updateUser({userID}, {hashedPassword});
        default:
            await mongooseService.updateUser({userID}, {updateAt: new Date()});
            return res.status(200).json({ message: "User updated" });
    }
}
