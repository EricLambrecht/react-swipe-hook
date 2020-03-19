import { render, fireEvent } from '@testing-library/react'
import { useSwipeCallback } from '../.tmp/useSwipeCallback'
import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'

interface Props {
  minDistance?: number
}

const TestComponent: React.FC<Props> = ({ minDistance = 20 }) => {
  const [testOutput, setTestOutput] = useState('no output')
  const [onTouchStart, onTouchEnd] = useSwipeCallback(
    minDistance,
    () => setTestOutput('swipe-up'),
    () => setTestOutput('swipe-right'),
    () => setTestOutput('swipe-down'),
    () => setTestOutput('swipe-left')
  )

  return (
    <>
      <div
        data-testid="swipe-area"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />
      <div data-testid="test-output">{testOutput}</div>
    </>
  )
}

describe('useSwipeCallback() Integration Test', () => {
  it('recognizes swipe down', async () => {
    const { getByTestId, getByText } = render(<TestComponent />)
    const swipeArea = getByTestId('swipe-area')

    fireEvent.touchStart(swipeArea, { touches: [{ clientX: 2, clientY: 0 }] })
    fireEvent.touchEnd(swipeArea, {
      changedTouches: [{ clientX: 4, clientY: 40 }],
    })
    expect(getByText('swipe-down')).toBeInTheDocument()
  })

  it('recognizes swipe up', async () => {
    const { getByTestId, getByText } = render(<TestComponent />)
    const swipeArea = getByTestId('swipe-area')

    fireEvent.touchStart(swipeArea, { touches: [{ clientX: 2, clientY: 40 }] })
    fireEvent.touchEnd(swipeArea, {
      changedTouches: [{ clientX: 4, clientY: 0 }],
    })
    expect(getByText('swipe-up')).toBeInTheDocument()
  })

  it('recognizes swipe-right', async () => {
    const { getByTestId, getByText } = render(<TestComponent />)
    const swipeArea = getByTestId('swipe-area')

    fireEvent.touchStart(swipeArea, { touches: [{ clientX: 2, clientY: 0 }] })
    fireEvent.touchEnd(swipeArea, {
      changedTouches: [{ clientX: 90, clientY: 40 }],
    })
    expect(getByText('swipe-right')).toBeInTheDocument()
  })

  it('recognizes swipe-left', async () => {
    const { getByTestId, getByText } = render(<TestComponent />)
    const swipeArea = getByTestId('swipe-area')

    fireEvent.touchStart(swipeArea, { touches: [{ clientX: 90, clientY: 40 }] })
    fireEvent.touchEnd(swipeArea, {
      changedTouches: [{ clientX: 2, clientY: 0 }],
    })
    expect(getByText('swipe-left')).toBeInTheDocument()
  })

  it('will not recognize swipe if distance was too short', async () => {
    const { getByTestId, getByText } = render(
      <TestComponent minDistance={200} />
    )
    const swipeArea = getByTestId('swipe-area')

    fireEvent.touchStart(swipeArea, { touches: [{ clientX: 2, clientY: 0 }] })
    fireEvent.touchEnd(swipeArea, {
      changedTouches: [{ clientX: 4, clientY: 40 }],
    })
    expect(getByText('no output')).toBeInTheDocument()
  })
})
