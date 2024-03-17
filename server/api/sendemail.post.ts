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
        subject: '[파티원 구함] 문의 내용',
        html: `
            <div style="width:100%;">
                <div style="width: 100%; margin: 0 auto; padding: 40px 28px; box-sizing: border-box; background-color: #FFF; font-size: 16px; font-weight: 400; line-height: 1.75; color: #333; font-family: 'Roboto', 'Noto Sans KR', '맑은고딕', Malgun Gothic, '돋움', Dotum, Helvetica, 'Apple SD Gothic Neo', Sans-serif;">
                    <div style="width: 100%; max-width: 480px; margin: 0 auto; font-size: 20px; font-weight: 700; text-decoration: underline; text-underline-offset: 4px;">피드백 및 문의</div>
                    <table style="width: 100%; max-width: 480px; margin: 0 auto; margin-top: 28px; font-size: 14px; border-top: 1px solid #333; border-collapse: collapse;">
                        <tbody>
                            <tr style="border-bottom: 1px solid #CCC;">
                                <td style="width: 100px; padding: 20px 0; padding-left: 16px; font-weight: 700;">이메일 주소</td>
                                <td style="word-break: break-all; padding: 20px 16px;">${body.email}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #CCC;">
                                <td style="width: 100px; padding: 20px 0; padding-left: 16px; font-weight: 700;">문의 분류</td>
                                <td style="word-break: break-all; padding: 20px 16px;">${body.category}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #CCC;">
                                <td style="width: 100px; padding: 20px 0; padding-left: 16px; font-weight: 700;">문의 제목</td>
                                <td style="word-break: break-all; padding: 20px 16px;">${body.title}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #333;">
                                <td style="width: 100px; vertical-align: top; padding: 20px 0; padding-left: 16px; font-weight: 700;">문의 내용</td>
                                <td style="word-break: break-all; padding: 20px 16px;">${body.content}</td>
                            </tr>
                        <tbody>
                    </table>
                    <div style="width: 100%; max-width: 480px; margin: 0 auto; margin-top: 40px; font-size: 14px; color: #666;">
                        <div>파티원 구함, © 2023 - ${new Date().getFullYear()}</div>
                    </div>
                </div>
            </div>
        `
    });

    return true;
});