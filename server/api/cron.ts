import { db } from "../utils/firebase";

export default defineEventHandler(async e => {
    try {
        const time = new Date().getTime() - (1000 * 3600 * 24 * 30);
        const posts = await db.collection("posts").where("end_date", "<=", time).get();
        const batch = db.batch();

        // 문서가 없으면 실행 종료
        if (posts.empty) {
            return "No matching documents.";
        }

        // 문서가 있으면 문서 삭제
        posts.forEach(post => {
            batch.delete(post.ref);
        });
        await batch.commit();

        return posts.docs;
    } catch (err) {
        return err;
    }
});