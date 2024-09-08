import { HttpError } from "./errors";

export async function sendDataRequest(data: object): Promise<void> {
  const response = await fetch("https://dummy-site.dev/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new HttpError(response.status, "Sending the request failed.", responseData);
  }

  return responseData;
}
