import { Router } from 'express';
import { body } from 'express-validator';
import {
  getConversations,
  getConversation,
  sendMessage,
  markAsRead,
  startDirectConversation,
  getOrCreateActivityConversation,
} from '../controllers/message.controller';
import { protect } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';

const router = Router();

router.use(protect);

router.get('/conversations', getConversations);
router.get('/conversations/:id', getConversation);
router.post(
  '/conversations/:id/messages',
  validateRequest([
    body('content').trim().notEmpty().withMessage('Message content is required'),
    body('type').optional().isIn(['text', 'image', 'system']).withMessage('Invalid message type'),
  ]),
  sendMessage
);
router.put('/conversations/:id/read', markAsRead);
router.post('/conversations/direct/:userId', startDirectConversation);
router.get('/conversations/activity/:activityId', getOrCreateActivityConversation);

export default router;
