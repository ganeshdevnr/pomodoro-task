import { createFileRoute } from '@tanstack/react-router'
import { TicTacComponent } from '../pages/tictac/tictac'

export const Route = createFileRoute('/tic-tac')({
  component: TicTacComponent,
})
