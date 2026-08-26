const BASE_URL = 'https://fakestoreapi.com'

/** Fetch all products from the Fake Store API */
export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/products`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

/** Fetch all available product categories */
export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/products/categories`)
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  return response.json()
}
