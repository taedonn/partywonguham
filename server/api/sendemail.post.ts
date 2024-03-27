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
                        <div style="width:100%;">
                            <div style="width: 100%; margin: 0 auto; padding: 2.5rem 1.75rem; box-sizing: border-box; background-color: #FFF; font-size: 1rem; font-weight: 400; line-height: 1.75; color: #333; font-family: 'Roboto', 'Noto Sans KR', '맑은고딕', Malgun Gothic, '돋움', Dotum, Helvetica, 'Apple SD Gothic Neo', Sans-serif;">
                                <div style="width: 100%; max-width: 30rem; margin: 0 auto; font-size: 1.25rem; font-weight: 700; text-decoration: underline; text-underline-offset: 0.25rem;">피드백 및 문의</div>
                                <table style="width: 100%; max-width: 30rem; margin: 0 auto; margin-top: 1.75rem; font-size: 0.875rem; border-top: 1px solid #333; border-collapse: collapse;">
                                    <tbody>
                                        <tr style="border-bottom: 1px solid #CCC;">
                                            <td style="width: 6.25rem; padding: 1.25rem 0; padding-left: 1rem; font-weight: 700;">이메일 주소</td>
                                            <td style="word-break: break-all; padding: 1.25rem 1rem;">${body.email}</td>
                                        </tr>
                                        <tr style="border-bottom: 1px solid #CCC;">
                                            <td style="width: 6.25rem; padding: 1.25rem 0; padding-left: 1rem; font-weight: 700;">문의 분류</td>
                                            <td style="word-break: break-all; padding: 1.25rem 1rem;">${body.category}</td>
                                        </tr>
                                        <tr style="border-bottom: 1px solid #CCC;">
                                            <td style="width: 6.25rem; padding: 1.25rem 0; padding-left: 1rem; font-weight: 700;">문의 제목</td>
                                            <td style="word-break: break-all; padding: 1.25rem 1rem;">${body.title}</td>
                                        </tr>
                                        <tr style="border-bottom: 1px solid #333;">
                                            <td style="width: 6.25rem; vertical-align: top; padding: 1.25rem 0; padding-left: 1rem; font-weight: 700;">문의 내용</td>
                                            <td style="word-break: break-all; padding: 1.25rem 1rem;">${body.content}</td>
                                        </tr>
                                    <tbody>
                                </table>
                                <div style="width: 100%; max-width: 30rem; margin: 0 auto; margin-top: 2.5rem; font-size: 0.875rem; color: #666;">
                                    <div>파티원구함, © 2023 - ${new Date().getFullYear()}</div>
                                </div>
                            </div>
                        </div>
                    `, alternative: true },
                ]
            })
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
                        <div style="width:100%;">
                            <div style="width: 100%; margin: 0 auto; padding: 2.5rem 1.75rem; box-sizing: border-box; background-color: #FFF; font-size: 1rem; font-weight: 400; text-align: center; line-height: 1.75; color: #333; font-family: 'Roboto', 'Noto Sans KR', '맑은고딕', Malgun Gothic, '돋움', Dotum, Helvetica, 'Apple SD Gothic Neo', Sans-serif;">
                                <div style="width: 100%; max-width: 30rem; margin: 0 auto; font-size: 1.25rem; font-weight: 700;">파티원님! 인원이 모두 모였어요</div>
                                <div style="width: 100%; max-width: 18.75rem; margin: 0 auto; margin-top: 0.75rem; padding-right: 2.25rem;">
                                    <img src="https://partywonguham.s3.ap-northeast-2.amazonaws.com/3d_calendar.png" alt="3D 캘린더" style="width: 100%;"/>
                                </div>
                                <div style="width: 100%; max-width: 30rem; margin: 0 auto; margin-top: 0.25rem; font-size: 1rem;">
                                    아래 버튼을 눌러 시간을 확인해 주세요.
                                </div>
                                <div style="width: 100%; max-width: 20rem; margin: 0 auto;">
                                    <a href="https://partywon.vercel.app/p/${body.id}" target="_blank" style="display: inline-block; width: 100%; padding: 0.625rem 5.5rem; margin: 0 auto; margin-top: 1.25rem; text-align: center; border-radius: 0.5rem; background-color: #FF6E40; color: #FFF; text-decoration: none;">링크 바로가기</a>
                                </div>
                                <div style="font-size: 0.875rem; margin-top: 2.5rem;">
                                    <div>클릭이 안된다면? 아래 URL을 복사해 보세요.</div>
                                    <a href="https://partywon.vercel.app/p/${body.id}" target="_blank" style="color: #FF6E40;">https://partywon.vercel.app/p/${body.id}</a>
                                </div>
                                <div style="width: 100%; max-width: 30rem; margin: 0 auto; margin-top: 3.75rem; font-size: 0.875rem; color: #666;">
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