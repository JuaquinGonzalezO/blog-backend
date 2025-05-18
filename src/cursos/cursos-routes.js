import { Router } from 'express';
import {
  createCurso,
  getCursos
} from '../cursos/cursos-controller.js'; 

const router = Router();


router.post('/create', createCurso);
router.get('/', getCursos);

export default router;