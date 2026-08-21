import { useState } from 'react'

function UserObject() {
  const [user, setUser] = useState({
    name: 'Monib',
    age: 25,
  })

  const changeName = () => {
    // Requirement: use the spread operator to update the object
    setUser({ ...user, name: 'Monib Hossain' })
  }

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <button onClick={changeName}>Change Name</button>
    </div>
  )
}

export default UserObject
