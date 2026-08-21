import Counter from './components/Counter'
import ShowHideText from './components/ShowHideText'
import InputValue from './components/InputValue'
import FocusInput from './components/FocusInput'
import UserObject from './components/UserObject'
import Welcome from './components/Welcome'

function App() {
  return (
    <div className="app">
      <h1>Module 22 Assignment</h1>

      <section className="card">
        <h2>Task 1: useState Counter</h2>
        <Counter />
      </section>

      <section className="card">
        <h2>Task 2: Show/Hide Text</h2>
        <ShowHideText />
      </section>

      <section className="card">
        <h2>Task 3: Input Value</h2>
        <InputValue />
      </section>

      <section className="card">
        <h2>Task 4: useRef</h2>
        <FocusInput />
      </section>

      <section className="card">
        <h2>Task 5: Working with Object</h2>
        <UserObject />
      </section>

      <section className="card">
        <h2>Task 6: useEffect</h2>
        <Welcome />
      </section>
    </div>
  )
}

export default App
