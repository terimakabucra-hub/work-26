import { useEffect, useState } from "react";
import API from "../api/axios";
import NewsCard from "../components/NewsCard";

const News = () => {
  const [news, setNews] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Sports",
    "Business",
    "Technology",
    "National",
    "Education",
    "Health",
    "Entertainment",
    "Travel",
    "General",
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await API.get("/news");
        setNews(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleFilter = (cat) => {
    setCategory(cat);
    if (cat === "All") {
      setFiltered(news);
    } else {
      setFiltered(news.filter((n) => n.category === cat));
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">Loading...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 border-l-4 border-red-600 pl-3">
        📰 All News
      </h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              category === cat
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No news found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <NewsCard key={item._id} news={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
