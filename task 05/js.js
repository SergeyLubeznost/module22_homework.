const input = document.querySelector(".input");
const sendMessage = document.querySelector(".message");
const geoLocation = document.querySelector(".location");
const output = document.querySelector(".output-wrapper");

const wsUri = "wss://echo-ws-service.herokuapp.com/";

const websocet = new WebSocket(wsUri);

sendMessage.addEventListener("click", () => {
    if (input.value) {
        let message = input.value;
        renderMessage(message, "user");
        websocet.send(message);

        websocet.onmessage = (response) => {
            renderMessage(response.data, "server");
        };

        input.value = "";
    }
});

geoLocation.addEventListener("click", () => {
    websocet.onmessage = null;
    getGeoLocation();
});

function renderMessage(message, source) {
    output.insertAdjacentHTML(
        "beforeend",
        `<p class="output-message ${source}">${message}</p>`
    );
}


function success(position) {
    websocet.send(position);
    let latitude = position.coords.latitude,
        longitude = position.coords.longitude,
        message = "Гео-локация";
    output.insertAdjacentHTML(
        "beforeend",
        `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" class="output-link user" target="_blank">${message}</a>`
    );
}

function error() {
    renderMessage("Информация о местоположении недоступна", "user");
}

function getGeoLocation() {
    if (!navigator.geolocation) {
        renderMessage("Информация о местоположении недоступна", "user");
    } else {
        renderMessage("Идёт определение местоположения, подождите...", "user");
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
