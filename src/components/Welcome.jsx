import { useEffect } from 'react'

function Welcome() {
  useEffect(() => {
    console.log('Component Loaded')
  }, [])

  return <h3>Welcome to React</h3>
}

export default Welcome
