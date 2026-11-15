import { Router } from 'express';
import { body } from 'express-validator';
import {
  sendConnectionRequest,
  acceptConnection,
  rejectConnection,
  removeConnection,
  getConnections,
  getPendingRequests,
  getSentRequests,
  checkConnectionStatus,
} from '../controllers/connection.controller';
import { protect } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';

const router = Router();

router.use(protect);

router.post(
  '/:userId',
  validateRequest([body('message').optional().isString()]),
  sendConnectionRequest
);

router.put('/:id/accept', acceptConnection);
router.put('/:id/reject', rejectConnection);
router.delete('/:id', removeConnection);

router.get('/', getConnections);
router.get('/pending', getPendingRequests);
router.get('/sent', getSentRequests);
router.get('/:userId/status', checkConnectionStatus);

export default router;
