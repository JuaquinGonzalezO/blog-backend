import { response, request } from "express";
import Post from "./post-model.js"
import { hash, verify } from "argon2";

export const createPost = async (req, res) => {
  try {
    const data = req.body;

    if(data.fechaCreacion) {
      const partes = data.fechaCreacion.split('/');
      data.fechaCreacion = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
    }
    const post = new Post({ ...data, status: true });
    await post.save();

   
    const postConCurso = await Post.findById(post._id)
      .populate('cursoId', 'nombre descripcion'); 

    return res.status(201).json({ success: true, post: postConCurso });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating post",
      error: error.message,
    });
  }
};
export const getPosts = async (req, res) => {
  try {
   const query = {status:true}
    const post = await Post.find(query).populate('cursoId', 'nombre descripcion');
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post no encontrado' });
    }
    return res.json({ success: true, post });
  } catch (error) {
    console.error('Error getting post', error);
    return res.status(500).json({ success: false, message: 'Error al obtener post', error: error.message });
  }
};
export const getSearchPostsByName = async (req, res) => {
  try {
    const { name } = req.query;
    const cleanName = name.trim(); 

    const posts = await Post.find({
      titulo: { $regex: cleanName, $options: 'i' }
    });

    res.status(200).json({
      success: true,
      posts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error al buscar posts por nombre',
      error: error.message
    });
  }
};


export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

 
    if (data.fechaCreacion && typeof data.fechaCreacion === 'string') {
      const [day, month, year] = data.fechaCreacion.split('/');
      if (day && month && year) {
        data.fechaCreacion = new Date(`${year}-${month}-${day}`);
      }
    }

    const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });

    return res.status(200).json({
      success: true,
      msg: "Post updated",
      post: updatedPost,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Error updating post",
      error: error.message,
    });
  }
};


export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      msg: "Post deleted successfully",
      post,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Error deleting post",
      error: error.message,
    });
  }
};
