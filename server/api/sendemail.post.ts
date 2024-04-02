// config
const config = useRuntimeConfig();

// emailjs
import { SMTPClient } from "emailjs";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const client = new SMTPClient({
        user: config.public.emailId + "",
        password: config.public.emailPassword + "",
        host: 'smtp.gmail.com',
        port: 465,
        ssl: true,
    });

    if (body.action === "feedback") {
        try {
            await client.sendAsync({
                from: "파티원구함 partywonguham@gmail.com",
                to: "partywonguham@gmail.com",
                subject: "[파티원구함] 문의 내용",
                text: "",
                attachment: [
                    { data: `
                        <div style="width:100%; padding: 40px 28px; box-sizing: border-box; background-color: #FFF; font-size: 16px; font-weight: 400; line-height: 1.75; color: #333; font-family: 'Roboto', 'Noto Sans KR', '맑은고딕', Malgun Gothic, '돋움', Dotum, Helvetica, 'Apple SD Gothic Neo', Sans-serif;">
                            <div style="width: 100%; max-width: 480px; margin: 0 auto;">
                                <div style="width: 100%; font-size: 20px; font-weight: 700;">피드백 및 문의</div>
                                <table style="width: 100%; margin-top: 28px; font-size: 14px; border-top: 1px solid #333; border-collapse: collapse;">
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
                                <div style="width: 100%; margin-top: 40px; font-size: 14px; color: #666;">
                                    <div>파티원구함, © 2023 - ${new Date().getFullYear()}</div>
                                </div>
                            </div>
                        </div>
                    `, alternative: true },
                ]
            });
        } catch (err) {
            console.log(err);
        }
    } else if (body.action === "alert") {
        try {
            await client.sendAsync({
                from: "파티원구함 partywonguham@gmail.com",
                to: body.email,
                subject: "[파티원구함] 인원이 모두 모였어요",
                text: "",
                attachment: [
                    { data: `
                        <div style="width:100%; padding: 40px 28px; box-sizing: border-box; background-color: #FFF; font-size: 16px; font-weight: 400; line-height: 1.75; color: #333; font-family: 'Roboto', 'Noto Sans KR', '맑은고딕', Malgun Gothic, '돋움', Dotum, Helvetica, 'Apple SD Gothic Neo', Sans-serif;">
                            <div style="width: 100%; max-width: 340px; margin: 0 auto; text-align: center;">
                                <div style="width: 100%; font-size: 20px; font-weight: 700;">파티원님! 인원이 모두 모였어요</div>
                                <div style="margin-top: 20px; padding-right: 20px; box-sizing: border-box;">
                                    <img src="https://partywonguham.s3.ap-northeast-2.amazonaws.com/3d_calendar.png" alt="3D 캘린더" style="width: 200px;"/>
                                </div>
                                <div style="width: 100%; margin-top: 12px;">
                                    아래 버튼을 눌러 시간을 확인해 주세요.
                                </div>
                                <div style="width: 100%; margin-top: 16px;">
                                    <a href="https://partywon.vercel.app/p/${body.id}" target="_blank" style="display: block; width: 100%; padding: 12px 0; border-radius: 8px; background-color: #FF6E40; color: #FFF; text-decoration: none;">링크 바로가기</a>
                                </div>
                                <div style="font-size: 14px; margin-top: 40px;">
                                    <div>클릭이 안된다면? 아래 URL을 복사해 보세요.</div>
                                    <a href="https://partywon.vercel.app/p/${body.id}" target="_blank" style="color: #FF6E40;">https://partywon.vercel.app/p/${body.id}</a>
                                </div>
                                <div style="width: 100%; margin-top: 60px; font-size: 14px; color: #666;">
                                    <div>파티원구함, © 2023 - ${new Date().getFullYear()}</div>
                                </div>
                            </div>
                        </div>
                    `, alternative: true }
                ]
            });
        } catch (err) {
            console.log(err);
        }
    }
});