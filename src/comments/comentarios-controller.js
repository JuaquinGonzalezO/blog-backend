import Comentario from "./comentarios-model.js"
import Post from "../publicaciones/post-model.js"

export const createComment = async (req, res) => {
  try {
    const data = req.body;
    if (data.fechaComentario) {
      const [day, month, year] = data.fechaComentario.split('/');
      data.fechaComentario = new Date(`${year}-${month}-${day}`);
    }
    const comment = new Comentario({ ...data });
    await comment.save();
    await comment.populate({
      path: 'publicacionId',
      populate: {
        path: 'cursoId',
        select: 'nombre descripcion'  
      }
    });
    return res.status(201).json({ success: true, comment });
  } catch (error) {
    console.error('Error creating comment', error);
    res.status(500).json({
      success: false,
      message: 'Error creating comment',
      error: error.message,
    });
  }
};
export const getComments = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;

        const [total, commentsRaw] = await Promise.all([
            Post.countDocuments(),
            Post.find()
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
        return res.status(200).json({ success: true, total, comments: commentsRaw });
    } catch (error) {
        console.error("Error getting comments", error);
        return res.status(500).json({ success: false, message: 'Error getting comments', error: error.message });
    }
};

export const getSearchCommentsByName = async (req, res) => {
  try {
    const { name } = req.query;
    const cleanName = name.trim();

    const comments = await Post.find({
      nombre: { $regex: cleanName, $options: 'i' } 
    });

    res.status(200).json({
      success: true,
      comments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error al buscar comentarios por nombre',
      error: error.message
    });
  }
};


export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.fechaCreacion && typeof data.fechaCreacion === 'string') {
      const [day, month, year] = data.fechaCreacion.split('/');
      if (day && month && year) {
        data.fechaCreacion = new Date(`${year}-${month}-${day}`);
      }
    }

    const updatedComment = await Post.findByIdAndUpdate(id, data, { new: true });

    return res.status(200).json({
      success: true,
      msg: "Comment updated",
      comment: updatedComment,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Error updating comment",
      error: error.message,
    });
  }
};


export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Post.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            msg: "Comment deleted successfully",
            comment,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error deleting comment",
            error: error.message,
        });
    }
};
