import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching product details:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="details-container">
          <div className="skeleton skeleton-details-image"></div>
          <div className="details-info">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text short"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <p className="no-products">Product not found 😕</p>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="details-container">
        <div className="details-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="details-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="details-brand">Brand: {product.brand || 'Generic'}</p>
          <p className="details-price">${product.price}</p>
          <p className="details-description">{product.description}</p>
          <p className="details-rating">⭐ Rating: {product.rating} / 5</p>
          <Link to="/" className="back-btn">
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
