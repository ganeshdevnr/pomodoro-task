import { queryOptions } from '@tanstack/react-query'

export const WEATHER_CITY_KEYS = [
  'coimbatore',
  'chennai',
  'mumbai',
  'hyderabad',
] as const

export type WeatherCity = (typeof WEATHER_CITY_KEYS)[number]

export const DEFAULT_WEATHER_CITY: WeatherCity = 'coimbatore'

export const WEATHER_LOCATIONS: Record<
  WeatherCity,
  {
    name: string
    latitude: number
    longitude: number
  }
> = {
  coimbatore: {
    name: 'Coimbatore',
    latitude: 11.0168,
    longitude: 76.9558,
  },
  chennai: {
    name: 'Chennai',
    latitude: 13.0827,
    longitude: 80.2707,
  },
  mumbai: {
    name: 'Mumbai',
    latitude: 19.076,
    longitude: 72.8777,
  },
  hyderabad: {
    name: 'Hyderabad',
    latitude: 17.385,
    longitude: 78.4867,
  },
}

export type WeatherResponse = {
  current: {
    temperature_2m: number
    wind_speed_10m: number
  }
  current_units: {
    temperature_2m: string
    wind_speed_10m: string
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
  }
  hourly_units: {
    temperature_2m: string
  }
}

export function weatherQueryOptions(latitude: number, longitude: number) {
  return queryOptions({
    queryKey: ['weather', latitude, longitude] as const,
    queryFn: async ({ signal }) => {
      const url = new URL('https://api.open-meteo.com/v1/forecast')
      url.searchParams.set('latitude', String(latitude))
      url.searchParams.set('longitude', String(longitude))
      url.searchParams.set('current', 'temperature_2m,wind_speed_10m')
      url.searchParams.set('hourly', 'temperature_2m')

      // wait for 10 seconds
      await new Promise((resolve) => setTimeout(resolve, 5 * 1000))

      const response = await fetch(url, { signal })

      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }

      return (await response.json()) as WeatherResponse
    },
  })
}
