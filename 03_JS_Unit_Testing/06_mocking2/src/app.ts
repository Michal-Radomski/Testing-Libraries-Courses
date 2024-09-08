import { extractPostData, savePost } from "./posts/posts";
import "./style.scss";

const formElement = document.querySelector("form") as HTMLFormElement;

export async function submitFormHandler(event: SubmitEvent): Promise<void> {
  event.preventDefault();

  const formData = new FormData(formElement);
  try {
    const postData = extractPostData(formData);
    await savePost(postData);
  } catch (error) {
    console.log("error:", error);
  }
}

formElement.addEventListener("submit", submitFormHandler);
