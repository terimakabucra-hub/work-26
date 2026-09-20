import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

const NewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await API.get(`/news/${id}`);
        setNews(data);
      } catch (err) {
        setError("News not found");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-red-600 mb-4">{error}</p>
        <Link to="/news" className="text-blue-600 hover:underline">
          ← Back to All News
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/news" className="text-red-600 hover:underline text-sm">
        ← Back to All News
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
        <img
          src={news.image || "https://via.placeholder.com/1200x600?text=News"}
          alt={news.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-8">
          <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full uppercase">
            {news.category}
          </span>
          <h1 className="text-3xl font-bold mt-4 mb-3">{news.title}</h1>
          <p className="text-sm text-gray-400 mb-6">
            By {news.authorName || "Admin"} • Published on{" "}
            {new Date(news.createdAt).toLocaleDateString()} at{" "}
            {new Date(news.createdAt).toLocaleTimeString()}
          </p>
          <p className="text-gray-700 leading-8 text-lg whitespace-pre-line">
            {news.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
