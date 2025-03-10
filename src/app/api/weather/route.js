import { callApiWeather } from '@/lib/weather-api'

const parseCity = (city) => {
    return {
        name: city.name,
        region: city.region,
        country: city.country
    }
}
const parseWeather = (weather) => {
    const { location, current, forecast } = weather

    return {
        city: parseCity(location),
        now: {
            condition: current.condition.text,
            icon: current.condition.icon,
            temp_c: current.temp_c,
            wind_kph: current.wind_kph,
            wind_dir: current.wind_dir
        },
        forecast: forecast.forecastday.map(f => parseDayForecast(f))
    }
}

const parseHourForecast = (hour) => {
    return {
        time: hour.time,
        temp_c: hour.temp_c,
        condition: hour.condition.text,
        icon: hour.condition.icon,
        is_day: !!hour.is_day
    }
}

const parseDayForecast = (forecastday) => {
    return {
        date: forecastday.date,
        temp_forecastday: forecastday.day.avgtemp_c,
        condition_forecastday: forecastday.day.condition.text,
        icon_forecastday: forecastday.day.condition.icon,
        hours: forecastday.hour.map(h => parseHourForecast(h))
    }
}


export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');
    const language = searchParams.get('lang');
    const response = await callApiWeather(city, language);
    return Response.json(parseWeather(response));
} 