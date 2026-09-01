import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          🛍️ ProductCatalog
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="#products">Products</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
