import { verificationCodeMongooseService } from "../services/mongooseService/verificationCodeService";
import { sendMail } from "../services/nodemailerService/nodemailerService";
import { Random } from "random-js";
import { verifyCodeHTMLTemplate } from "../services/nodemailerService/htmlTemplates/verifyCodeEmailTemplate";
const random = new Random();

export const sendCodeToEmail = async (email: string) => {

    const code: string = random.integer(1, 99999).toString();

    const codeData = {
        email,
        code
    }

    const verifyCodeHTML = verifyCodeHTMLTemplate.replace('REPLACECODE', code)

    try {
        await verificationCodeMongooseService.createCode(codeData);
        sendMail(email, verifyCodeHTML, 'Verify your account');
        return true

    } catch (err) {
        return false
    }

}
