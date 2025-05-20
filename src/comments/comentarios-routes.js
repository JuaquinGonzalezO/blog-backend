import { Router } from 'express';
import {
  createComment,
  getComments,
  getSearchCommentsByName,
  deleteComment
} from '../comments/comentarios-controller.js'; 

const router = Router();

router.post('/create', createComment);
router.get('/', getComments);
router.get('/search', getSearchCommentsByName);
router.delete('/:id', deleteComment);

export default router;