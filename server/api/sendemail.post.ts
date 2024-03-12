// config
const config = useRuntimeConfig();

// nodemailer
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const nodemailer = require('nodemailer');

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // transporter 설정
    const transporter =  nodemailer.createTransport({
        host: 'smtp.gmail.com',
        post: 465,
        secure: true, // 465 포트일 때 true, 아니면 false
        auth: {
            user: config.emailId,
            pass: config.emailPassword,
        }
    });

    // 이메일 전송
    await transporter.sendMail({
        from: '"파티원 구함" <partywonguham@gmail.com>',
        to: "partywonguham@gmail.com",
        subject: '[파티원 구함] 테스트 메일',
        html: `
            ${body.email}
        `
    });

    return true;
});