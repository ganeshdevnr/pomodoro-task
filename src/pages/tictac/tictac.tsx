import { create } from 'zustand'

type SquareValue = 'X' | 'O' | null

// const moveHistory = [
//   'Go to game start',
//   'Go to move #1',
//   'Go to move #2',
//   'Go to move #3',
//   'Go to move #4',
// ]

interface TicTacState {
  currentPlayer: SquareValue
  //   state: SquareValue[]
  click: (position: number) => void
  history: Array<SquareValue[]>
  gotoMove: (index: number) => void
  currentMove: number
}

const useTicTac = create<TicTacState>((set) => {
  return {
    history: [[null, null, null, null, null, null, null, null, null]],
    currentPlayer: 'X',
    // state: [null, null, null, null, null, null, null, null, null],
    click: (position: number) => {
      return set((state) => {
        // check if currentMove is less than history.length. if so, then truncate the history
        if (state.currentMove < state.history.length - 1) {
          const newHistory = state.history.slice(0, state.currentMove + 1)

          const _currentPlayer = newHistory.length % 2 === 0 ? 'O' : 'X'

          const _newState = newHistory[newHistory.length - 1].map(
            (value, index) => {
              return index === position - 1 ? _currentPlayer : value
            },
          )

          return {
            history: [...newHistory, [..._newState]],
            currentMove: newHistory.length,
            currentPlayer: _currentPlayer === 'X' ? 'O' : 'X',
          }
        }

        // calculate the new state
        const latestState = state.history[state.history.length - 1]

        const newState = latestState.map((value, index) => {
          return index === position - 1 ? state.currentPlayer : value
        })

        return {
          currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
          history: [...state.history, [...newState]],
          currentMove: state.history.length,
        }
      })
    },
    currentMove: 0, // default is 1
    gotoMove: (index: number) => {
      return set({
        currentMove: index,
        currentPlayer: index % 2 === 0 ? 'X' : 'O',
      })
    },
  }
})

export function TicTacComponent() {
  return (
    <main className="min-h-[calc(100svh-73px)] bg-slate-50 px-4 py-10 text-slate-700 sm:px-6 dark:bg-slate-950 dark:text-slate-300">
      <section
        className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start"
        aria-labelledby="tic-tac-title"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
          <GameStatus />
          <Board />
        </div>

        <MoveHistory />
      </section>
    </main>
  )
}

function GameStatus() {
  const nextPlayer = useTicTac((state) => state.currentPlayer)

  return (
    <header className="mb-6 text-center sm:text-left">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-rose-600 dark:text-rose-300">
        Tic Tac Toe
      </p>
      <h1
        id="tic-tac-title"
        className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-slate-50"
      >
        Static game board
      </h1>
      <p className="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-400">
        A presentational skeleton for the Zustand tutorial game. The board,
        status, and move history are ready for state wiring later.
      </p>

      <div className="mt-5 inline-flex rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
        Next player: {nextPlayer}
      </div>
    </header>
  )
}

function calculateWinner(squares: SquareValue[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

function Board() {
  const currentMove = useTicTac((state) => state.currentMove)
  const board = useTicTac((state) => state.history)[currentMove]

  const winner = calculateWinner(board)

  console.log(winner)

  console.log(board)

  return (
    <div
      className="mx-auto grid max-w-sm grid-cols-3 gap-3 sm:max-w-md sm:gap-4 lg:mx-0"
      aria-label="Tic Tac Toe board"
    >
      {board.map((value, index) => {
        return <Square key={index} value={value} position={index + 1} />
      })}
    </div>
  )
}

function Square({ value, position }: { value: SquareValue; position: number }) {
  const click = useTicTac((state) => state.click)

  return (
    <button
      onClick={() => click(position)}
      type="button"
      aria-label={`Square ${position}${value ? ` contains ${value}` : ' is empty'}`}
      className="aspect-square rounded-2xl border border-slate-200 bg-slate-50 text-5xl font-black text-slate-900 transition-colors hover:border-rose-300 hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 sm:text-6xl dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:hover:border-rose-500/60 dark:hover:bg-rose-500/10"
    >
      {/* Static placeholder value. Interactivity and state can replace this later. */}
      {value}
    </button>
  )
}

function MoveHistory() {
  const moveHistory = useTicTac((state) => state.history)

  const goToMove = useTicTac((state) => state.gotoMove)

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
      <h2 className="text-lg font-bold text-slate-950 dark:text-slate-50">
        Move history
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Placeholder controls styled for the future game timeline.
      </p>

      <ol className="mt-5 space-y-3">
        {moveHistory.map((move, index) => {
          return (
            <li>
              <button
                onClick={() => goToMove(index)}
                type="button"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-rose-500/60 dark:hover:bg-rose-500/10 dark:hover:text-rose-200"
              >
                <span className="mr-2 text-rose-600 dark:text-rose-300">
                  {String(index).padStart(2, '0')}
                </span>
                Go to move #{index}
              </button>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}
