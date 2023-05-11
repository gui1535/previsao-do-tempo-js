const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const climaBox = document.querySelector('.clima-box');
const climaDetalhes = document.querySelector('.clima-detalhes');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'cebcd482eda57fa9a6714c1c2ba91885';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=pt`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                climaBox.style.display = 'none';
                climaDetalhes.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.clima-box img');
            const temperatura = document.querySelector('.clima-box .temperatura');
            const descricao = document.querySelector('.clima-box .descricao');
            const umidade = document.querySelector('.clima-detalhes .umidade span');
            const vento = document.querySelector('.clima-detalhes .vento span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            descricao.innerHTML = `${json.weather[0].description}`;
            umidade.innerHTML = `${json.main.humidity}%`;
            vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            climaBox.style.display = '';
            climaDetalhes.style.display = '';
            climaBox.classList.add('fadeIn');
            climaDetalhes.classList.add('fadeIn');
            container.style.height = '590px';


        });


});