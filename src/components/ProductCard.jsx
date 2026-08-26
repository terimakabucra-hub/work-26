function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} loading="lazy" />
      <h3>{product.title}</h3>
      <span className="price">${product.price}</span>
      <span className="category">{product.category}</span>
    </div>
  )
}

export default ProductCard
