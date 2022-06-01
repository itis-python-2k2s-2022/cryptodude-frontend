import request from "./api";

export async function getFAQuestions() {
  try {
    const response = await request.get("/faq");
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
