import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import useStore from "../store/useStore";

const Dashboard = () => {
  const { user, updateUser } = useStore();
  const navigate = useNavigate();

  const [myNews, setMyNews] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchMyNews();
    fetchProfile();
  }, [user, navigate]);

  const fetchMyNews = async () => {
    try {
      const { data } = await API.get("/news/my/news");
      setMyNews(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/users/profile");
      setName(data.name || "");
      setPhone(data.phone || "");
      setAddress(data.address || "");
      setBio(data.bio || "");
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const payload = { name, phone, address, bio };
      if (password) payload.password = password;
      const { data } = await API.put("/users/profile", payload);
      updateUser({ name: data.name });
      setMessage("Profile updated successfully!");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;
    try {
      await API.delete(`/news/${id}`);
      setMyNews(myNews.filter((n) => n._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 border-l-4 border-red-600 pl-3">
        👤 My Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Update Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Update Profile</h2>

          {message && (
            <p className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">
              {message}
            </p>
          )}
          {error && (
            <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </p>
          )}

          <form onSubmit={handleProfileUpdate} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="2"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                New Password (optional)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Leave blank to keep current"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition"
            >
              Update Profile
            </button>
          </form>
        </div>

        {/* My News Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              My Published News ({myNews.length})
            </h2>
            <Link
              to="/create-news"
              className="bg-yellow-400 text-black px-4 py-2 rounded text-sm font-semibold hover:bg-yellow-300 transition"
            >
              + Create News
            </Link>
          </div>

          {myNews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              You haven't published any news yet.
            </p>
          ) : (
            <div className="space-y-4">
              {myNews.map((news) => (
                <div
                  key={news._id}
                  className="border rounded-lg p-4 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex-grow">
                    <span className="text-xs font-semibold text-red-600 uppercase">
                      {news.category}
                    </span>
                    <h3 className="font-bold">{news.title}</h3>
                    <p className="text-xs text-gray-400">
                      {new Date(news.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/news/${news._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-news/${news._id}`}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(news._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
