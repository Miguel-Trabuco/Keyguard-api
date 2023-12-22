import { verificationCodeMongooseService } from "../services/mongooseService/verificationCodeService";
import { mailerSend, setFrom } from "../services/mailerSendService/mailerSendService";
import { Recipient, EmailParams } from "mailersend";
import { verifyCodeHTMLTemplate } from "../services/nodemailerService/htmlTemplates/verifyCodeEmailTemplate";
import { Random } from "random-js";
const random = new Random();

export const sendCodeToEmail = async (email: string) => {

    const code: string = random.integer(1, 99999).toString();

    const codeData = {
        email,
        code
    }

    try {
        await verificationCodeMongooseService.createCode(codeData);

    } catch (err) {
        return false
    }

    const recipient = [ new Recipient (email) ];

    const verifyCodeHTML = verifyCodeHTMLTemplate.replace('REPLACECODE', code);

    const emailParams = new EmailParams()
        .setFrom(setFrom)
        .setTo(recipient)
        .setSubject("Verify your email")
        .setHtml(verifyCodeHTML);

    try {
        await mailerSend.email.send(emailParams);
        return true

    } catch(err) {
        console.log(err)
        return false
    }

}
