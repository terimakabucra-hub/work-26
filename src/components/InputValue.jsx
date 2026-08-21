import { useState } from 'react'

function InputValue() {
  const [inputValue, setInputValue] = useState('')
  const [displayValue, setDisplayValue] = useState('')

  const handleClick = () => {
    setDisplayValue(inputValue)
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={handleClick}>Show Value</button>
      {displayValue && <p>You typed: {displayValue}</p>}
    </div>
  )
}

export default InputValue
