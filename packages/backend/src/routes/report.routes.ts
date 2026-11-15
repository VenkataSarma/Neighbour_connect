import { Router } from 'express';
import { body } from 'express-validator';
import {
  reportUser,
  reportActivity,
  getReports,
  resolveReport,
} from '../controllers/report.controller';
import { protect, restrictTo } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';

const router = Router();

router.use(protect);

router.post(
  '/user',
  validateRequest([
    body('userId').isMongoId().withMessage('Valid user ID is required'),
    body('reason').trim().notEmpty().withMessage('Reason is required'),
    body('description').optional().isString(),
  ]),
  reportUser
);

router.post(
  '/activity',
  validateRequest([
    body('activityId').isMongoId().withMessage('Valid activity ID is required'),
    body('reason').trim().notEmpty().withMessage('Reason is required'),
    body('description').optional().isString(),
  ]),
  reportActivity
);

// Admin routes
router.get('/', restrictTo('admin'), getReports);
router.put(
  '/:id/resolve',
  restrictTo('admin'),
  validateRequest([
    body('status').isIn(['reviewed', 'resolved', 'dismissed']).withMessage('Invalid status'),
    body('resolution').optional().isString(),
  ]),
  resolveReport
);

export default router;
