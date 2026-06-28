import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import {
  NewDashboard,
  WeatherRoutePending,
} from '../pages/newdashboard/newdashboard'
import {
  DEFAULT_WEATHER_CITY,
  WEATHER_CITY_KEYS,
  // WEATHER_LOCATIONS,
  // weatherQueryOptions,
} from '../pages/newdashboard/weather-query'

const weatherSearchSchema = z.object({
  city: z.enum(WEATHER_CITY_KEYS).optional().default(DEFAULT_WEATHER_CITY),
})

export const Route = createFileRoute('/weather')({
  validateSearch: weatherSearchSchema,
  loaderDeps: ({ search: { city } }) => ({ city }),
  // loader: ({ context, deps: { city } }) => {
  //   const location = WEATHER_LOCATIONS[city]

  //   return context.queryClient.ensureQueryData(
  //     weatherQueryOptions(location.latitude, location.longitude),
  //   )
  // },
  pendingComponent: WeatherRoutePending,
  pendingMs: Infinity,
  component: NewDashboard,
})
