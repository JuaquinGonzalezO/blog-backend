import Curso from "./cursos-model.js"

export const createCurso = async (req, res) => {
  try {
    const data = req.body;
    const curso = new Curso({ ...data });
    await curso.save();
    return res.status(201).json({ success: true, curso });
  } catch (error) {
    console.error('Error creating course', error);
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message,
    });
  }
};
export const getCursos = async (req, res) => {
  try {
     const { limite = 10, desde = 0 } = req.query;
    
            const [total, cursosRaw] = await Promise.all([
                Post.countDocuments(),
                Post.find()
                    .skip(Number(desde))
                    .limit(Number(limite))
            ]);

    return res.status(200).json({ success: true, total, posts: cursosRaw });
    } catch (error) {
        console.error("Error getting course", error);
        return res.status(500).json({ success: false, message: 'Error getting posts', error: error.message });
    }
    }