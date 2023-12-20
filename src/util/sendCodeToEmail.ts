import { verificationCodeMongooseService } from "../services/mongooseService/verificationCodeService";
import { sendMail } from "../services/nodemailerService/nodemailerService";
import { Random } from "random-js";
const random = new Random();

export const sendCodeToEmail = async (email: string) => {

    const code = random.integer(1, 99999);

    const codeData = {
        email,
        code
    }

    const html: string = `<p>code: ${code}</p>`

    try {
        await verificationCodeMongooseService.createCode(codeData);
        sendMail(email, html, 'Verify your account');
        return true

    } catch (err) {
        return false
    }

}
