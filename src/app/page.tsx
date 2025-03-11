'use client'

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { LinearChart } from '@/components/linear-chart';
import { getWeatherIcon } from '@/lib/get-weather-icon';
import { WiWindDeg } from "weather-icons-react";
const { DateTime } = require("luxon");

const callApi = async (city: string, lang: string) => {
  const reponse = await fetch(`api/weather?city=${city}&lang=${lang}`).then(res => res.json());
  return reponse;
}

export default function Home() {
  const [city, setCity] = useState('');
  const [lang, setLang] = useState('en');
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    const data = await callApi(city, lang);
    setWeather(data);
  }

  return (
    <>
      <div className='p-5'>
        <div className='flex items-center justify-center gap-2'>
          <Input value={city}
            onChange={e => setCity(e.target.value)}
            className='w-1/2 border-neutral-400'
          />
          <Button onClick={handleSearch}>Submit</Button>
        </div>
        {weather &&
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Image
                    src={'https:' + weather.now.icon}
                    width={150}
                    height={150}
                    alt={weather.now.condition}
                  />
                  <p className='text-xl'>{weather.now.temp_c} °C</p>
                  <div>
                    <p>Précipitations: {weather.now.precip_mm}%</p>
                    <p>Humidité: {weather.now.humidity}%</p>
                    <p className='flex items-center'>Vent: {weather.now.wind_kph} km/h | <WiWindDeg /> {weather.now.wind_dir}</p>
                  </div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <p className='font-bold'>Weather</p>
                  <p>{weather.city.name}, {weather.city.region}, {weather.city.country}</p>
                  <p>{DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}</p>
                  <p>{weather.now.condition}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LinearChart forecast={weather.forecast[0]} />
            </CardContent>
          </Card>
        }
      </div >
    </>
  );
}
