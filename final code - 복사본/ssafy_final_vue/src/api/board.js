import { apiInstance } from "@/api/index";

const http = apiInstance();

async function boardWrite(board, success, fail) {
    await http.post('/board', board).then(success).catch(fail);
}
async function commentWrite(comment, success, fail) {
    await http.post('/board/comment', comment).then(success).catch(fail);
}
async function commnetList(bno, success, fail) {
    await http.get(`/board/comment?bno=${bno}`).then(success).catch(fail);
}
export { boardWrite, commentWrite, commnetList };
