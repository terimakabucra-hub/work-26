import { useState, useEffect } from 'react'

/**
 * useDebounce — delays updating a value until the user stops typing.
 * Example: typing "phone" fires only ONE search after 500ms of silence,
 * instead of one search per keystroke.
 */
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    // Cleanup: if the user types again before the delay ends,
    // cancel the previous timer (this is the side-effect cleanup).
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
