const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-white text-lg font-bold mb-2">📰 Daily News</h3>
          <p className="text-sm">
            Your trusted source for the latest news from around the country and
            the world. Stay informed, stay ahead.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <ul className="text-sm space-y-1">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/news" className="hover:text-white">All News</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <p className="text-sm">Email: info@dailynews.com</p>
          <p className="text-sm">Phone: +880 1234-567890</p>
          <p className="text-sm">Dhaka, Bangladesh</p>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Daily News. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
