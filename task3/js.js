const size = document.querySelector('#screenSize');
const status = document.querySelector('#currentApi');
const mapLink = document.querySelector('#map-link');
const btn = document.querySelector('.btn');

const error = () => {
	status.textContent = 'Информация о местоположении недоступна';
}

const success = (position) => {
	console.log('position', position);
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;

    const width = window.screen.width;
	const height = window.screen.height;
	size.textContent = `Ширина экрана: ${width}, высота экрана: ${height}.`;

	status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
	mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	mapLink.textContent = 'Ссылка на карту';
}

btn.addEventListener('click', () => {
	mapLink.href = '';
	mapLink.textContent = '';

	if (!navigator.geolocation) {
		status.textContent = 'Geolocation API не поддерживается вашим браузером';
	} else {
		status.textContent = 'Определение местоположения…';
		navigator.geolocation.getCurrentPosition(success, error);
	}
});