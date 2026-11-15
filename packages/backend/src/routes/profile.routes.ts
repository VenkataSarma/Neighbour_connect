import { Router } from 'express';
import { body } from 'express-validator';
import {
  getProfile,
  updateProfile,
  updateProfilePhoto,
  completeOnboardingStep,
  updateAvailability,
  updatePrivacySettings,
  updateLocation,
  getUserActivities,
  getUserConnections,
} from '../controllers/profile.controller';
import { protect } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { uploadSingle } from '../middleware/upload';

const router = Router();

router.use(protect);

// Get any user's profile
router.get('/:userId', getProfile);

// Update own profile
router.put('/me', updateProfile);

// Update profile photo
router.put('/me/photo', uploadSingle('profilePhoto'), updateProfilePhoto);

// Complete onboarding step
router.put(
  '/me/onboarding/:step',
  validateRequest([
    body('step').isInt({ min: 1, max: 10 }).withMessage('Step must be between 1 and 10'),
    body('data').isObject().withMessage('Step data is required'),
  ]),
  completeOnboardingStep
);

// Update availability
router.put('/me/availability', updateAvailability);

// Update privacy settings
router.put('/me/privacy', updatePrivacySettings);

// Update location
router.put(
  '/me/location',
  validateRequest([
    body('coordinates').isArray({ min: 2, max: 2 }).withMessage('Coordinates must be [longitude, latitude]'),
    body('locality').optional().isString(),
    body('city').optional().isString(),
  ]),
  updateLocation
);

// Get user's activities
router.get('/:userId/activities', getUserActivities);

// Get user's connections
router.get('/:userId/connections', getUserConnections);

export default router;
