import { Router } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  toggleCategory,
  seedCategories,
} from '../controllers/category.controller';
import { protect, restrictTo } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Admin routes
router.post('/', protect, restrictTo('admin'), createCategory);
router.put('/:id', protect, restrictTo('admin'), updateCategory);
router.patch('/:id/toggle', protect, restrictTo('admin'), toggleCategory);
router.post('/seed', seedCategories);

export default router;
