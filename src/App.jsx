import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'

function App() {
  // Simple page switcher: 'home' | 'products'
  const [page, setPage] = useState('home')
  // Search text lives here so the Navbar search box works on every page
  const [searchText, setSearchText] = useState('')

  const goTo = (target) => setPage(target)

  return (
    <>
      <Navbar
        currentPage={page}
        onNavigate={goTo}
        searchText={searchText}
        onSearchChange={setSearchText}
      />
      {page === 'home' ? (
        <Home onExplore={() => goTo('products')} />
      ) : (
        <Products searchText={searchText} />
      )}
    </>
  )
}

export default App
