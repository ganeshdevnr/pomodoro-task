import { Suspense, useTransition } from 'react'
import {
  useSuspenseQuery,
  QueryErrorResetBoundary,
} from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import {
  WEATHER_CITY_KEYS,
  WEATHER_LOCATIONS,
  type WeatherCity,
  weatherQueryOptions,
} from './weather-query'

const hourlyForecastLimit = 8

export function NewDashboard() {
  const { city } = useSearch({ from: '/weather' })
  const navigate = useNavigate({ from: '/weather' })
  const [isPending, startTransition] = useTransition()
  const location = WEATHER_LOCATIONS[city]

  function handleCityChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextCity = event.target.value as WeatherCity

    startTransition(() => {
      void navigate({
        search: { city: nextCity },
      })
    })
  }

  return (
    <main className="min-h-[calc(100svh-73px)] bg-sky-50 px-4 py-8 text-slate-950 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
              Live weather
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {location.name} dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">
              Current conditions and the next few hourly temperature readings
              from Open-Meteo.
            </p>
          </div>

          <div className="min-w-56">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              City
              <select
                aria-busy={isPending}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 shadow-sm outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                value={city}
                onChange={handleCityChange}
              >
                {WEATHER_CITY_KEYS.map((cityKey) => (
                  <option key={cityKey} value={cityKey}>
                    {WEATHER_LOCATIONS[cityKey].name}
                  </option>
                ))}
              </select>
            </label>
            {isPending ? (
              <p className="mt-2 text-sm text-sky-700 dark:text-sky-300">
                Updating weather...
              </p>
            ) : null}
          </div>
        </div>

        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => <WeatherErrorFallback {...props} />}
            >
              <Suspense fallback={<WeatherSkeleton />}>
                <WeatherPanel
                  latitude={location.latitude}
                  longitude={location.longitude}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools />
    </main>
  )
}

function WeatherPanel({
  latitude,
  longitude,
}: {
  latitude: number
  longitude: number
}) {
  const { data } = useSuspenseQuery(weatherQueryOptions(latitude, longitude))
  const forecast = data.hourly.time
    .map((time, index) => ({
      time,
      temperature: data.hourly.temperature_2m[index],
    }))
    .slice(0, hourlyForecastLimit)

  return (
    <section className="overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-px bg-sky-100 dark:bg-slate-800 lg:grid-cols-[1.1fr_1.6fr]">
        <div className="bg-white p-6 sm:p-8 dark:bg-slate-900">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                Current weather
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {latitude.toFixed(4)}, {longitude.toFixed(4)}
              </p>
            </div>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-800 dark:bg-sky-950 dark:text-sky-200">
              Open-Meteo
            </span>
          </div>

          <div className="mt-8">
            <p className="text-6xl font-bold tracking-tighter text-slate-950 dark:text-white">
              {Math.round(data.current.temperature_2m)}
              <span className="text-3xl">
                {data.current_units.temperature_2m}
              </span>
            </p>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Wind speed {data.current.wind_speed_10m}{' '}
              {data.current_units.wind_speed_10m}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            Hourly forecast
          </h2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {forecast.map((hour) => (
              <li
                key={hour.time}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
              >
                <time
                  className="text-sm font-medium text-slate-500 dark:text-slate-400"
                  dateTime={hour.time}
                >
                  {formatForecastTime(hour.time)}
                </time>
                <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">
                  {Math.round(hour.temperature)}
                  <span className="text-base text-slate-500 dark:text-slate-400">
                    {' '}
                    {data.hourly_units.temperature_2m}
                  </span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function WeatherSkeleton() {
  return (
    <section
      aria-label="Loading weather dashboard"
      aria-busy="true"
      className="overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="grid gap-px bg-sky-100 dark:bg-slate-800 lg:grid-cols-[1.1fr_1.6fr]">
        <div className="bg-white p-6 sm:p-8 dark:bg-slate-900">
          <div className="h-5 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-3 h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-10 h-16 w-44 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-5 h-5 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="bg-white p-6 sm:p-8 dark:bg-slate-900">
          <div className="h-5 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: hourlyForecastLimit }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-950"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function WeatherRoutePending() {
  return (
    <main className="min-h-[calc(100svh-73px)] bg-sky-50 px-4 py-8 text-slate-950 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <div className="h-4 w-36 animate-pulse rounded bg-sky-200 dark:bg-slate-800" />
          <div className="mt-4 h-10 w-72 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <WeatherSkeleton />
      </div>
    </main>
  )
}

function WeatherErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <section
      role="alert"
      className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-950 dark:border-red-900 dark:bg-red-950 dark:text-red-50"
    >
      <h2 className="text-lg font-semibold">Weather data unavailable</h2>
      <p className="mt-2 text-sm text-red-800 dark:text-red-200">
        {error instanceof Error
          ? error.message
          : 'Something went wrong while loading the forecast.'}
      </p>
      <button
        className="mt-5 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 dark:bg-red-300 dark:text-red-950 dark:hover:bg-red-200 dark:focus:ring-red-300 dark:focus:ring-offset-red-950"
        type="button"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </section>
  )
}

function formatForecastTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    weekday: 'short',
  }).format(new Date(value))
}
