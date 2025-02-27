// routes/authRoutes.js - Authentication routes
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  verifyEmail,
  refreshToken
} = require('../controllers/authController');

const { validateInput } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

// Register user validation
const registerValidation = [
  check('firstName', 'First name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
];

// Login validation
const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

// Update details validation
const updateDetailsValidation = [
  check('firstName', 'First name is required').optional().not().isEmpty(),
  check('lastName', 'Last name is required').optional().not().isEmpty(),
  check('email', 'Please include a valid email').optional().isEmail()
];

// Update password validation
const updatePasswordValidation = [
  check('currentPassword', 'Current password is required').not().isEmpty(),
  check('newPassword', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
];

// Reset password validation
const resetPasswordValidation = [
  check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
];

// Forgot password validation
const forgotPasswordValidation = [
  check('email', 'Please include a valid email').isEmail()
];

// Routes
router.post('/register', registerValidation, validateInput, register);
router.post('/login', loginValidation, validateInput, login);
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPasswordValidation, validateInput, forgotPassword);
router.put('/resetpassword/:resettoken', resetPasswordValidation, validateInput, resetPassword);
router.put('/updatedetails', protect, updateDetailsValidation, validateInput, updateDetails);
router.put('/updatepassword', protect, updatePasswordValidation, validateInput, updatePassword);
router.get('/verifyemail/:verificationtoken', verifyEmail);
router.post('/refresh-token', refreshToken);

module.exports = router;

// routes/userRoutes.js - User routes
const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserInvestments,
  getUserDashboard,
  updateAvatar
} = require('../controllers/userController');

const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const advancedResults = require('../middleware/advancedResults');
const User = require('../models/User');

// Apply protect middleware to all routes
router.use(protect);

// Routes with admin access
router.use(authorize('admin'));
router
  .route('/')
  .get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

// Routes for regular users
router.get('/:id/investments', authorize('admin'), getUserInvestments);
router.get('/dashboard', getUserDashboard);
router.put('/avatar', upload.single('avatar'), updateAvatar);

module.exports = router;

// routes/projectRoutes.js - Project routes
const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  projectImageUpload,
  addProjectUpdate,
  addToFavorites,
  removeFromFavorites
} = require('../controllers/projectController');

const { createInvestment, getProjectInvestments } = require('../controllers/investmentController');

const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const advancedResults = require('../middleware/advancedResults');
const Project = require('../models/Project');

// Re-route into investment router
router.use('/:projectId/investments', require('./investmentRoutes'));

// Public routes
router.get('/', advancedResults(Project, {
  path: 'owner',
  select: 'firstName lastName'
}), getProjects);
router.get('/:id', getProject);

// Protected routes
router.use(protect);
router.post('/', authorize('admin', 'manager'), createProject);
router.put('/:id', authorize('admin', 'manager'), updateProject);
router.delete('/:id', authorize('admin', 'manager'), deleteProject);
router.put('/:id/images', authorize('admin', 'manager'), upload.array('images', 10), projectImageUpload);
router.post('/:id/updates', authorize('admin', 'manager'), addProjectUpdate);
router.post('/:id/favorite', addToFavorites);
router.delete('/:id/favorite', removeFromFavorites);

// Project investments
router.post('/:projectId/investments', createInvestment);
router.get('/:projectId/investments', authorize('admin', 'manager'), getProjectInvestments);

module.exports = router;

// routes/investmentRoutes.js - Investment routes
const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getInvestments,
  getInvestment,
  getMyInvestments,
  getProjectInvestments,
  createInvestment,
  updateInvestment,
  cancelInvestment
} = require('../controllers/investmentController');

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Investment = require('../models/Investment');

// Apply protect middleware to all routes
router.use(protect);

// Routes for all authenticated users
router.get('/me', getMyInvestments);
router.get('/:id', getInvestment);
router.put('/:id/cancel', cancelInvestment);

// If projectId is included
router.route('/')
  .post(createInvestment);

// Admin only routes
router.use(authorize('admin'));
router.get('/', advancedResults(Investment, [
  { path: 'investor', select: 'firstName lastName email' },
  { path: 'project', select: 'title' }
]), getInvestments);
router.put('/:id', updateInvestment);

module.exports = router;

// routes/analyticsRoutes.js - Analytics routes
const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getProjectPerformance,
  getInvestmentStats,
  getUserActivity,
  getMarketTrends
} = require('../controllers/analyticsController');

const { protect, authorize } = require('../middleware/auth');

// Apply protect middleware to all routes
router.use(protect);

// Routes for admins and managers
router.use(authorize('admin', 'manager'));
router.get('/dashboard', getDashboardStats);
router.get('/projects/:id/performance', getProjectPerformance);
router.get('/investments/stats', getInvestmentStats);
router.get('/users/activity', getUserActivity);
router.get('/market/trends', getMarketTrends);

module.exports = router;

// routes/messageRoutes.js - Messaging routes
const express = require('express');
const router = express.Router();
const {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
  getConversations
} = require('../controllers/messageController');

const { protect } = require('../middleware/auth');

// Apply protect middleware to all routes
router.use(protect);

// Routes
router.get('/', getMessages);
router.get('/conversations', getConversations);
router.get('/:id', getMessage);
router.post('/', createMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

module.exports = router;

// routes/documentRoutes.js - Document routes
const express = require('express');
const router = express.Router();
const {
  getDocuments,
  getDocument,
  uploadDocument,
  deleteDocument,
  shareDocument
} = require('../controllers/documentController');

const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Apply protect middleware to all routes
router.use(protect);

// Routes
router.get('/', getDocuments);
router.get('/:id', getDocument);
router.post('/', upload.single('document'), uploadDocument);
router.delete('/:id', deleteDocument);
router.post('/:id/share', shareDocument);

module.exports = router;
