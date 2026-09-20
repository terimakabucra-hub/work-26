import express from "express";
import News from "../models/News.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// @route   GET /api/news  (All news)
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/news/top  (Top 6 latest news)
router.get("/top", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }).limit(6);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/news/my/news  (Logged in user's own news)
router.get("/my/news", protect, async (req, res) => {
  try {
    const news = await News.find({ author: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/news/:id  (Single news)
router.get("/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "News not found" });
  }
});

// @route   POST /api/news  (Create news - protected)
router.post("/", protect, async (req, res) => {
  try {
    const { title, category, description, image } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const news = await News.create({
      title,
      category,
      description,
      image,
      author: req.user._id,
      authorName: req.user.name,
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/news/:id  (Update own news - protected)
router.put("/:id", protect, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) return res.status(404).json({ message: "News not found" });

    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to edit this news" });
    }

    const { title, category, description, image } = req.body;
    news.title = title || news.title;
    news.category = category || news.category;
    news.description = description || news.description;
    news.image = image || news.image;

    const updatedNews = await news.save();
    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/news/:id  (Delete own news - protected)
router.delete("/:id", protect, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) return res.status(404).json({ message: "News not found" });

    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this news" });
    }

    await news.deleteOne();
    res.json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
