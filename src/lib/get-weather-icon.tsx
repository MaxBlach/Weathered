import { WiDaySunny, WiCloud, WiRain, WiDayCloudy, WiDayRainMix } from "weather-icons-react";

export const getWeatherIcon = (condition: number) => {
    const color = "#3b82f6";
    switch (condition) {
        case 1000:
            return <WiDaySunny size={200} color={color} />
        case 1003:
            return <WiDayCloudy size={200} color={color} />
        case 1006:
            return <WiCloud size={200} color={color} />
        case 1995:
            return <WiRain size={200} color={color} />
        case 1183:
            return <WiDayRainMix size={200} color={color} />
    }
} 