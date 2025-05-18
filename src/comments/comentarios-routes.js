import { Router } from 'express';
import {
  createComment,
  getComments,
  getSearchCommentsByName,
  updateComment,
  deleteComment
} from '../comments/comentarios-controller.js'; 

const router = Router();

router.post('/create', createComment);
router.get('/', getComments);
router.get('/search', getSearchCommentsByName);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;