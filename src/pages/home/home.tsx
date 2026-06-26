import { Header } from '../../components/header/Header'
import Button from '../../components/button/Button'
import { useTimer } from '../../contexts/timer/useTimer'

export function HomePage() {
  const { isRunning, remainingSeconds, start, pause, reset } = useTimer()

  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}`

  const header = {
    title: 'Focus Timer',
  }

  return (
    <main className="grid min-h-[calc(100svh-73px)] place-items-center bg-slate-50 px-4 py-10 text-slate-700 sm:px-6 dark:bg-slate-950 dark:text-slate-300">
      <section
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30"
        aria-labelledby="timer-title"
      >
        <Header {...header} />
        <div
          className="my-8 font-mono text-7xl font-extrabold leading-none text-rose-600 sm:text-8xl dark:text-rose-300"
          role="timer"
          aria-live="polite"
        >
          {formattedTime}
        </div>
        <div
          className="flex flex-wrap justify-center gap-3"
          aria-label="Timer controls"
        >
          <Button onClick={start} disabled={isRunning || remainingSeconds === 0}>
            Start
          </Button>

          <Button onClick={pause} disabled={!isRunning}>
            Pause
          </Button>
          <Button onClick={reset}>Reset</Button>
        </div>
      </section>
    </main>
  )
}
