import { Schema, model } from "mongoose";

const ComentarioSchema = Schema(
{
    nombreUsuario: {
    type: String,
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
  fechaComentario: {
    type: Date,
    default: Date.now
  },
  state: {
    type: Boolean,
    default: true
  },
  publicacionId: { type: Schema.Types.ObjectId, ref: 'Post' }
});

export default model('Comentario', ComentarioSchema);