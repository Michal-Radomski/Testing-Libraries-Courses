import { sendDataRequest } from "../util/http";
import { validateNotEmpty } from "../util/validation";

export function savePost(postData: Post): Promise<void> {
  postData.created = new Date();
  return sendDataRequest(postData);
}

export function extractPostData(form: FormData): Post {
  const title = form.get("title") as string;
  const content = form.get("content") as string;

  validateNotEmpty(title, "A title must be provided.");
  validateNotEmpty(content, "Content must not be empty!");

  return { title, content };
}
