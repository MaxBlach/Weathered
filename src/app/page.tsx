'use client'

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { LinearChart } from '@/components/linear-chart';

const callApi = async (city: string, lang: string) => {
  const reponse = await fetch(`api/weather?city=${city}&lang=${lang}`).then(res => res.json());
  return reponse;
}

export default function Home() {
  const [city, setCity] = useState('');
  const [lang, setLang] = useState('fr');
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
          <Button className='relative' variant='search' size='icon' onClick={handleSearch}>
            <Image
              src={'/search-icon.svg'}
              alt="Picture of the author"
              width={28}
              height={28}
            />
          </Button>
        </div>
        {weather &&
          <div>
            <div className='flex flex-col justify-center items-center'>
              <Card className='m-8 bg-slate-50'>
                <CardHeader>
                  <CardTitle>{weather.city.name}</CardTitle>
                  <CardDescription>{weather.city.region}, {weather.city.country}</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col justify-center items-center'>
                  <p className='font-bold text-6xl'>{weather.now.temp_c}</p>
                  <Image
                    src={'https:' + weather.now.icon}
                    width={250}
                    height={250}
                    alt={weather.now.condition}
                  />
                  <p className='text-xl'>{weather.now.condition}</p>
                </CardContent>
              </Card>
            </div>
            <LinearChart forecast={weather.forecast[0]} />
          </div>
        }
      </div >
    </>
  );
}
