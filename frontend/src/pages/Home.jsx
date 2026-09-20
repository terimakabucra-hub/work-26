import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import NewsCard from "../components/NewsCard";

const Home = () => {
  const [topNews, setTopNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topRes, allRes] = await Promise.all([
          API.get("/news/top"),
          API.get("/news"),
        ]);
        setTopNews(topRes.data);
        setAllNews(allRes.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sports = allNews.filter((n) => n.category === "Sports").slice(0, 3);
  const business = allNews.filter((n) => n.category === "Business").slice(0, 3);
  const tech = allNews.filter((n) => n.category === "Technology").slice(0, 3);
  const featured = topNews[0];

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">Loading...</div>
    );
  }

  return (
    <div>
      {/* Section 1: Hero */}
      <section className="bg-gradient-to-r from-red-700 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Daily News
          </h1>
          <p className="text-lg mb-6">
            Breaking news, latest stories and trusted updates — all in one place.
          </p>
          <Link
            to="/news"
            className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-300 transition"
          >
            Browse All News
          </Link>
        </div>
      </section>

      {/* Section 2: Top 6 News */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 border-l-4 border-red-600 pl-3">
          🔥 Top News
        </h2>

        {featured && (
          <Link
            to={`/news/${featured._id}`}
            className="block mb-8 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition md:flex"
          >
            <img
              src={featured.image || "https://via.placeholder.com/800x400?text=News"}
              alt={featured.title}
              className="w-full md:w-1/2 h-64 object-cover"
            />
            <div className="p-6">
              <span className="text-xs font-semibold text-red-600 uppercase">
                {featured.category}
              </span>
              <h3 className="text-2xl font-bold mt-2 mb-3">{featured.title}</h3>
              <p className="text-gray-600">
                {featured.description?.substring(0, 250)}...
              </p>
              <span className="text-xs text-gray-400 mt-3 block">
                By {featured.authorName || "Admin"} •{" "}
                {new Date(featured.createdAt).toLocaleDateString()}
              </span>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topNews.slice(1).map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      </section>

      {/* Section 3: Sports */}
      {sports.length > 0 && (
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 border-l-4 border-red-600 pl-3">
              ⚽ Sports
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sports.map((news) => (
                <NewsCard key={news._id} news={news} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 4: Business */}
      {business.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6 border-l-4 border-red-600 pl-3">
            💼 Business
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {business.map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        </section>
      )}

      {/* Section 5: Technology */}
      {tech.length > 0 && (
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 border-l-4 border-red-600 pl-3">
              💻 Technology
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tech.map((news) => (
                <NewsCard key={news._id} news={news} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
