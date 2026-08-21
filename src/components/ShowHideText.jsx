import { useState } from 'react'

function ShowHideText() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>Show/Hide</button>
      {isVisible && <p>Hello React</p>}
    </div>
  )
}

export default ShowHideText
