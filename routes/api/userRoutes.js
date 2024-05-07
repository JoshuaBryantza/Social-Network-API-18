const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET a single user by ID and populate thought and friend data
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({_id : req.params.id}).populate('thoughts').populate('friends');
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    // BONUS: Remove associated thoughts when deleting a user
    if (deletedUser) {
      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
    }

    res.json({ message: 'User and associated thoughts deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
