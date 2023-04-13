const btn = document.querySelector('button');
const coordTextField = document.querySelector('#status');
const timeTextField = document.querySelector('#timeZone');

const error = () => {
    coordTextField.textContent = 'Информация о местоположении недоступна';
}
const success = (position) => {
    console.log(position)
    const coords = position.coords;
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
            coordTextField.textContent = `Временная зона: ${data.timezone};`;
            timeTextField.textContent = `Местные дата и время: ${data.date_time_txt}`;
        })
        .catch(() => {
            coordTextField.textContent = `Ошибка запроса!`;
        });
}
btn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        coordTextField.innerText = 'Браузер не поддерживает геолокацию';
    } else {
        coordTextField.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
})