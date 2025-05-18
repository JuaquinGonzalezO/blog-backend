import { Schema, model } from "mongoose";

const PostSchema = Schema(
{
    titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  cursoId: {
    type: Schema.Types.ObjectId,
    ref: 'Curso'
  }
})

export default model('Post', PostSchema);