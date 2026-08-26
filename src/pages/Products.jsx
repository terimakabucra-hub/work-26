import { useState, useEffect, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import useDebounce from '../hooks/useDebounce'
import { fetchProducts, fetchCategories } from '../utils/api'

function Products({ searchText }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Debounce the search text so filtering runs only after the user
  // stops typing for 500ms — not on every single keystroke.
  const debouncedSearch = useDebounce(searchText, 500)

  // Fetch products + categories once when this page mounts (lifecycle)
  useEffect(() => {
    let isMounted = true // cleanup flag to avoid state updates after unmount

    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ])
        if (isMounted) {
          setProducts(productsData)
          setCategories(categoriesData)
        }
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadData()

    // Cleanup function: runs when the component unmounts
    return () => {
      isMounted = false
    }
  }, [])

  // useMemo: filtering logic is memoized so it only re-runs when
  // products, category, or the debounced search text actually changes.
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory
      const matchesSearch = product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [products, selectedCategory, debouncedSearch])

  if (loading) {
    return <div className="status-message">⏳ Loading products...</div>
  }

  if (error) {
    return (
      <div className="status-message error">
        ❌ Error: {error}. Please check your internet connection and try again.
      </div>
    )
  }

  return (
    <div className="products-page">
      <h2>Our Products ({filteredProducts.length})</h2>

      {/* Category filter buttons */}
      <div className="category-bar">
        <button
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {filteredProducts.length === 0 ? (
        <div className="status-message">No products found 😕</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Products
