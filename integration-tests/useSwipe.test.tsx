import { render, act, fireEvent } from '@testing-library/react'
import { useSwipeCallback } from '../.tmp/useSwipeCallback'
import React, { useState } from 'react'

const TestComponent: React.FC = () => {
  const [testOutput, setTestOutput] = useState('no output')
  const [onTouchStart, onTouchEnd] = useSwipeCallback(
    20,
    () => setTestOutput('swipe-down'),
    () => setTestOutput('swipe-up')
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
  it('recognizes swipe up', () => {
    const { getByTestId } = render(<TestComponent />)
    const swipeArea = getByTestId('swipe-area')
    const testOutput = getByTestId('test-output')

    fireEvent.touchStart(swipeArea, { touches: [{ x: 2, y: 0 }] })
    fireEvent.touchEnd(swipeArea, { changedTouches: [{ x: 4, y: 40 }] })
    expect(testOutput.textContent).toBe('swipe-up')
  })

  it('recognizes swipe-down', () => {
    const { getByTestId } = render(<TestComponent />)

    expect(false).toBe(true)
  })
})
