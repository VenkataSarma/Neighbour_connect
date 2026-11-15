import { Router } from 'express';
import { body } from 'express-validator';
import {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  cancelActivity,
  deleteActivity,
  getNearbyActivities,
  getTodayActivities,
  getMyActivities,
  getMyParticipations,
  searchActivities,
} from '../controllers/activity.controller';
import {
  joinActivity,
  leaveActivity,
  cancelRequest,
  approveParticipant,
  rejectParticipant,
  removeParticipant,
  getParticipants,
  getPendingRequests,
} from '../controllers/participation.controller';
import { protect } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { uploadSingle } from '../middleware/upload';

const router = Router();

router.use(protect);

// Activity routes
router.post(
  '/',
  uploadSingle('image'),
  validateRequest([
    body('title').trim().isLength({ min: 3, max: 100 }).withMessage('Title must be 3-100 characters'),
    body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be 10-1000 characters'),
    body('category').isMongoId().withMessage('Valid category ID is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
    body('startTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Start time must be in HH:MM format'),
    body('maxParticipants').isInt({ min: 2 }).withMessage('Minimum 2 participants required'),
    body('participationType').isIn(['open', 'approval', 'invite']).withMessage('Invalid participation type'),
  ]),
  createActivity
);

router.get('/', getActivities);
router.get('/nearby', getNearbyActivities);
router.get('/today', getTodayActivities);
router.get('/my', getMyActivities);
router.get('/participating', getMyParticipations);
router.get('/search', searchActivities);
router.get('/:id', getActivityById);

router.put(
  '/:id',
  uploadSingle('image'),
  validateRequest([
    body('title').optional().trim().isLength({ min: 3, max: 100 }),
    body('description').optional().trim().isLength({ min: 10, max: 1000 }),
    body('maxParticipants').optional().isInt({ min: 2 }),
  ]),
  updateActivity
);

router.post(
  '/:id/cancel',
  validateRequest([body('cancelReason').optional().isString()]),
  cancelActivity
);

router.delete('/:id', deleteActivity);

// Participation routes
router.post('/:id/join', joinActivity);
router.post('/:id/leave', leaveActivity);
router.post('/:id/cancel-request', cancelRequest);
router.get('/:id/participants', getParticipants);
router.get('/:id/pending-requests', getPendingRequests);
router.put('/:activityId/participants/:userId/approve', approveParticipant);
router.put('/:activityId/participants/:userId/reject', rejectParticipant);
router.delete('/:activityId/participants/:userId', removeParticipant);

export default router;
