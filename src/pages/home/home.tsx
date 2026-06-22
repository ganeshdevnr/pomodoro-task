import './home.css'

import { Header } from '../../components/header/Header'
import Button from '../../components/button/Button'
import { useTimer } from '../../contexts/timer/useTimer'

export function HomePage() {
  const { formattedTime, isRunning, remainingSeconds, start, pause, reset } =
    useTimer()

  const header = {
    title: 'Focus Timer',
  }

  return (
    <>
      <main className="timer-shell">
        <section className="timer-card" aria-labelledby="timer-title">
          <Header {...header} />
          <div className="timer-display" role="timer" aria-live="polite">
            {formattedTime}
          </div>
          <div className="timer-controls" aria-label="Timer controls">
            <Button
              onClick={start}
              disabled={isRunning || remainingSeconds === 0}
            >
              Start
            </Button>

            <Button onClick={pause} disabled={!isRunning}>
              Pause
            </Button>
            <Button onClick={reset}>Reset</Button>
          </div>
        </section>
      </main>
    </>
  )
}
