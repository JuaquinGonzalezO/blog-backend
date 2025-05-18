import { Schema, model } from "mongoose";

const CursoSchema = Schema(
{
     nombre: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String
  }
});
export default model('Curso', CursoSchema);