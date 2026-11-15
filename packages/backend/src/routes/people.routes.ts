import { Router } from 'express';
import {
  discoverPeople,
  searchPeople,
  blockUser,
  unblockUser,
  getBlockedUsers,
} from '../controllers/people.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.get('/discover', discoverPeople);
router.get('/search', searchPeople);
router.post('/block/:userId', blockUser);
router.delete('/block/:userId', unblockUser);
router.get('/blocked', getBlockedUsers);

export default router;
