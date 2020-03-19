import { useCallback, useState, TouchEvent } from 'react'

type Callback = () => unknown

export const useSwipeCallback = (
  minDistance: number,
  onSwipeUp: Callback | null = null,
  onSwipeRight: Callback | null = null,
  onSwipeDown: Callback | null = null,
  onSwipeLeft: Callback | null = null
): [
  (event: TouchEvent<HTMLElement>) => void,
  (event: TouchEvent<HTMLElement>) => void
] => {
  const [touchStartCoordinates, setTouchStartCoordinates] = useState({
    x: 0,
    y: 0,
  })

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    const firstTouch = event.touches[0]
    setTouchStartCoordinates({ x: firstTouch.clientX, y: firstTouch.clientY })
  }

  const onTouchEnd = useCallback(
    (event: TouchEvent<HTMLElement>) => {
      const lastTouch = event.changedTouches[0]
      const xDistance = lastTouch.clientX - touchStartCoordinates.x
      const yDistance = lastTouch.clientY - touchStartCoordinates.y

      // if this was a vertical swipe (on purpose)
      if (Math.abs(xDistance) < Math.abs(yDistance)) {
        if (yDistance > minDistance) {
          if (onSwipeDown) onSwipeDown()
        } else if (yDistance < -minDistance) {
          if (onSwipeUp) onSwipeUp()
        }
      } else {
        if (xDistance > minDistance) {
          if (onSwipeRight) onSwipeRight()
        } else if (xDistance < -minDistance) {
          if (onSwipeLeft) onSwipeLeft()
        }
      }
    },
    [touchStartCoordinates, onSwipeDown, onSwipeUp, minDistance]
  )

  return [onTouchStart, onTouchEnd]
}
