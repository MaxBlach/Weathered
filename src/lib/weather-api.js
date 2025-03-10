export const callApiWeather = async (city, language) => {
    return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=3&lang=${language}`).then(res => res.json())
}