export function showError(message: string): void {
  const errorContainerElement = document.getElementById("errors");
  const errorMessageElement = document.createElement("p");
  errorMessageElement.textContent = message;
  errorContainerElement!.innerHTML = "";
  errorContainerElement!.append(errorMessageElement);
}
