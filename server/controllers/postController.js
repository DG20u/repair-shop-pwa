const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener posts' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      content: req.body.content,
      author: req.user.userId
    });

    await post.save();
    await post.populate('author', 'username');
    
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear post' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    post.content = req.body.content;
    await post.save();
    await post.populate('author', 'username');

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await post.deleteOne();
    res.json({ message: 'Post eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar post' });
  }
};