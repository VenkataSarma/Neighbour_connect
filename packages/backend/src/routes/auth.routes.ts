import { Router } from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
  changePassword,
  getMe,
  deleteAccount,
} from '../controllers/auth.controller';
import { protect } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';

const router = Router();

// Public routes
router.post(
  '/register',
  validateRequest([
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('username')
      .isLength({ min: 3, max: 30 })
      .matches(/^[a-z0-9_]+$/)
      .withMessage('Username must be 3-30 characters, lowercase alphanumeric and underscores only'),
    body('city').optional().isString(),
    body('locality').optional().isString(),
  ]),
  register
);

router.post(
  '/login',
  validateRequest([
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ]),
  login
);

router.post(
  '/logout',
  validateRequest([body('refreshToken').notEmpty().withMessage('Refresh token is required')]),
  logout
);

router.post(
  '/refresh-token',
  validateRequest([body('refreshToken').notEmpty().withMessage('Refresh token is required')]),
  refreshToken
);

router.post(
  '/forgot-password',
  validateRequest([body('email').isEmail().withMessage('Please provide a valid email')]),
  forgotPassword
);

router.post(
  '/reset-password',
  validateRequest([
    body('token').notEmpty().withMessage('Reset token is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ]),
  resetPassword
);

router.post(
  '/verify-email',
  validateRequest([body('token').notEmpty().withMessage('Verification token is required')]),
  verifyEmail
);

// Protected routes
router.use(protect);

router.get('/me', getMe);

router.put(
  '/change-password',
  validateRequest([
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
  ]),
  changePassword
);

router.delete('/account', deleteAccount);

export default router;
