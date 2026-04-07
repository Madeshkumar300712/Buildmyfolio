const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const authMiddleware = require('../middleware/auth');

// Get my portfolio
router.get('/me', authMiddleware, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user._id });
    if (!portfolio) {
      portfolio = await Portfolio.create({ user: req.user._id });
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update portfolio (full or partial)
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { user: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Publish / unpublish
router.patch('/me/publish', authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id });
    portfolio.isPublished = !portfolio.isPublished;
    await portfolio.save();
    res.json({ isPublished: portfolio.isPublished, shareId: portfolio.shareId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public portfolio by shareId
router.get('/view/:shareId', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      shareId: req.params.shareId,
      isPublished: true
    });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    portfolio.views += 1;
    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete section item
router.delete('/me/:section/:itemId', authMiddleware, async (req, res) => {
  try {
    const { section, itemId } = req.params;
    const portfolio = await Portfolio.findOne({ user: req.user._id });
    portfolio[section] = portfolio[section].filter(
      item => item._id.toString() !== itemId
    );
    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;