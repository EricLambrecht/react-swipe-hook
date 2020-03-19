# react-swipe-hook
A hook for running callbacks on swipe

## Api

### Params
1. `minimumDistance`
2. `onSwipeUp`
3. `onSwipeRight`
4. `onSwipeDown`
5. `onSwipeLeft`

### Returns

Array of `onTouchStart` and `onTouchEnd` event handlers.

## Example usage

```jsx harmony
const ExampleComp = () => {
  const [output, setOutput] = useState('no output')
  const [onTouchStart, onTouchEnd] = useSwipeCallback(
    40, //the minimum swipe distance
    () => setOutput('The user swiped up!'),
    () => setOutput('The user swiped right!'),
    () => setOutput('The user swiped down!'),
    () => setOutput('The user swiped left!')
  )

  return (
    <>
      <div
        data-testid="swipe-area"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />
      <div data-testid="test-output">{output}</div>
    </>
  )
}
```
