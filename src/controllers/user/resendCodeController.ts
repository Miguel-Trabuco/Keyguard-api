import { verificationCodeMongooseService
 } from "../../services/mongooseService/verificationCodeService";
import { sendCodeToEmail } from "../../util/sendCodeToEmail";
import { jwtService } from "../../services/jwtService/jwtService";
import { Request, Response } from "express";

export const resendCodeController = async (req: Request, res: Response) => {
    const email = req.body.email;
    const token = req.cookies.token;

    const userID = jwtService.verifyToken(token);

    if (userID === '') {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const codeDocument = await verificationCodeMongooseService.findCode({ email });

    if (codeDocument) {
        const isDeleted = await verificationCodeMongooseService.deleteCode(email);

        if (!isDeleted) {
            return res.status(500).json({ message: "Internal server erro" });
        }

        const isSent = await sendCodeToEmail(email);

        if (!isSent) {
            return res.status(500).json({ message: "Internal server erro" });
        }

        return res.status(200);

    }

    return res.status(401).json({ message: "Email doesn't exist" });

}
