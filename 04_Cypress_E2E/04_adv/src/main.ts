import "./style.scss";

const user = {
  location: {
    lat: 0,
    lng: 0,
    url: "",
  },
};

function getUserLocation(event: Event): void {
  const clickedBtn = event.target as HTMLButtonElement;
  const container = clickedBtn?.parentNode as ParentNode;
  if ("geolocation" in navigator) {
    clickedBtn.disabled = true;
    clickedBtn.innerHTML = '<span class="loader"></span>';
    navigator.geolocation.getCurrentPosition(
      function (position: GeolocationPosition) {
        user.location.lat = position.coords.latitude;
        user.location.lng = position.coords.longitude;
        user.location.url = `https://www.bing.com/maps?cp=${user.location.lat}~${user.location.lng}&lvl=15&style=r`;
        container.insertBefore(document.createTextNode("Location fetched!"), clickedBtn);
        container.querySelector("svg")?.classList.add("active");
        container.removeChild(clickedBtn);
        container.querySelector("button")!.disabled = false;
        container.querySelector("button")!.classList.add("active");
      },
      () => {
        displayInfoMessage("Your browser or permission settings do not allow location fetching.");
      }
    );
  } else {
    displayInfoMessage("Your browser or permission settings do not allow location fetching.");
  }
}

function shareLocation(event: Event): void {
  // Use clipboard API to copy the location to the clipboard
  event.preventDefault();
  const fd = new FormData(event.target as HTMLFormElement);
  const userName = fd.get("name") as string;

  if (userName.trim() === "" || user.location.lat === 0 || user.location.lng === 0) {
    (document.getElementById("error") as HTMLParagraphElement).textContent =
      "Please enter your name and get your location first!";
    return;
  }

  (document.getElementById("error") as HTMLParagraphElement).textContent = "";

  const storedUrl = localStorage.getItem(userName);
  if (storedUrl) {
    copyToClipboard(storedUrl, "Stored location URL copied to clipboard.");
    return;
  }

  user.location.url += `&sp=point.${user.location.lat}_${user.location.lng}_${encodeURI(userName)}`;

  localStorage.setItem(userName, user.location.url);
  copyToClipboard(user.location.url, "Location URL copied to clipboard.");
}

function copyToClipboard(data: string, infoText: string): void {
  if ("clipboard" in navigator) {
    navigator.clipboard.writeText(data).then(
      function (): void {
        displayInfoMessage(infoText);
      },
      function (): void {
        displayInfoMessage("Failed to copy location URL to clipboard.");
      }
    );
  }
}

let existingTimer: number;

function displayInfoMessage(message: string) {
  if (existingTimer) {
    clearTimeout(existingTimer);
  }
  const infoMsg = document.getElementById("info-message") as HTMLDivElement;
  (infoMsg.querySelector("p") as HTMLParagraphElement).textContent = message;
  infoMsg.classList.add("visible");
  existingTimer = setTimeout(() => {
    infoMsg.classList.remove("visible");
  }, 2000);
}

const getLocBtn = document.getElementById("get-location") as HTMLButtonElement;
const form = document.querySelector("form") as HTMLFormElement;

getLocBtn.addEventListener("click", getUserLocation);
form.addEventListener("submit", shareLocation);
