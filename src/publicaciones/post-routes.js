import { Router } from 'express';
import {
  createPost,
  getPosts,
  getSearchPostsByName,
  updatePost,
  deletePost
} from '../publicaciones/post-controller.js'; 

const router = Router();


router.post('/create', createPost);
router.get('/post', getPosts);
router.get('/search', getSearchPostsByName);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;