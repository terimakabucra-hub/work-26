import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition flex flex-col">
      <img
        src={news.image || "https://via.placeholder.com/800x400?text=News"}
        alt={news.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-red-600 uppercase">
          {news.category}
        </span>
        <h3 className="font-bold text-lg mt-1 mb-2 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
          {news.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            By {news.authorName || "Admin"} •{" "}
            {new Date(news.createdAt).toLocaleDateString()}
          </span>
          <Link
            to={`/news/${news._id}`}
            className="text-red-600 text-sm font-semibold hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
