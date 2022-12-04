import { apiInstance } from "./index.js";

const api = apiInstance();

async function news(keyword, success, fail) {
    await api.get(`/naver/news?keyword=${keyword}`).then(success).catch(fail);
}


export { news };
