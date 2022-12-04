import { apiInstance } from "@/api/index";

const http = apiInstance();

function sidoList(success, fail) {
    http.get(`home/sidoName`).then(success).catch(fail);
}
function gugunList(params, success, fail) {
    http.get(`home/gugunName?sidoName=${params.sido}`).then(success).catch(fail);
}

async function like(likeInfo, success, fail) {
    await http.post(`home/like`, JSON.stringify(likeInfo)).then(success).catch(fail);
}

async function unlike(no, success, fail) {
    await http.delete(`home/like/${no}`).then(success).catch(fail);
}
async function selectAllByAptName(aptInfo, success, fail) {
    await http.post(`home/search`, JSON.stringify(aptInfo)).then(success).catch(fail);
}
export { sidoList, gugunList, like, unlike, selectAllByAptName };