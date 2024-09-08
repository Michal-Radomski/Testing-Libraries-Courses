export function showError(message: string): void {
  const errorContainerElement = document.getElementById("errors") as HTMLDivElement;
  const errorMessageElement = document.createElement("p") as HTMLParagraphElement;
  errorMessageElement.textContent = message;
  errorContainerElement!.innerHTML = "";
  errorContainerElement!.append(errorMessageElement);
}
