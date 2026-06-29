import { useStore } from './useStore'

export function Store() {
  const bears = useStore((state) => state.bears)

  const updateBears = useStore((state) => state.updateBears)

  return (
    <>
      <div>Store {String(bears)}</div>
      <br />

      <button onClick={() => updateBears(10)}>update bears</button>
    </>
  )
}
