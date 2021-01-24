const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// Submit post : ES6 Version (.then/.catch)
router.post('/', (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  })

  post.save()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

// Get all the posts : vES7 (async/await)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    res.json({ message: err })
  }
})

// Get specific post
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    res.json(post)
  } catch (err) {
    res.json({ message: err })
  }
})

// Delete a specific post
router.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({ _id: req.params.postId })
    res.json(removedPost)
  } catch (err) {
    res.json({ message: err })
  }
})

//  Update a post
router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    )
    res.json(updatedPost)
  } catch (err) {
    res.json({ message: err })
  }
})

// EXPORT
module.exports = router
