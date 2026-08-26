function Home({ onExplore }) {
  return (
    <div className="home">
      <h1>Welcome to Product Explorer 🛍️</h1>
      <p>
        Browse products fetched live from the Fake Store API. Filter by
        category, or use the debounced search box in the navbar to find
        exactly what you need.
      </p>
      <button className="cta-btn" onClick={onExplore}>
        Explore Products →
      </button>
    </div>
  )
}

export default Home
