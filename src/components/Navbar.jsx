function Navbar({ currentPage, onNavigate, searchText, onSearchChange }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => onNavigate('home')}>
        🛒 ProductExplorer
      </div>

      <ul className="nav-links">
        <li>
          <button
            className={currentPage === 'home' ? 'active' : ''}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={currentPage === 'products' ? 'active' : ''}
            onClick={() => onNavigate('products')}
          >
            Products
          </button>
        </li>
      </ul>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => {
            onSearchChange(e.target.value)
            // Typing in search automatically takes the user to Products page
            if (currentPage !== 'products') onNavigate('products')
          }}
        />
      </div>
    </nav>
  )
}

export default Navbar
