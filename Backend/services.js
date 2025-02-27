// services/emailService.js - Email service
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

/**
 * Send an email
 * @param {Object} options
 * @param {String} options.email - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.html - Email content in HTML format
 */
const sendEmail = async (options) => {
  let transporter;

  if (process.env.EMAIL_SERVICE === 'gmail') {
    // Gmail OAuth2 setup
    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN
    });

    const accessToken = await oauth2Client.getAccessToken();

    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_FROM,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token
      }
    });
  } else if (process.env.EMAIL_SERVICE === 'sendgrid') {
    // SendGrid setup
    transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  } else {
    // Generic SMTP setup
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Email message options
  const message = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  // Send email
  const info = await transporter.sendMail(message);

  console.log(`Email sent: ${info.messageId}`);
};

module.exports = sendEmail;

// services/paymentService.js - Payment processing service
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const ErrorResponse = require('../utils/errorResponse');

/**
 * Process a payment
 * @param {Object} options
 * @param {Number} options.amount - Amount to charge
 * @param {String} options.paymentMethod - Payment method type
 * @param {Object} options.paymentDetails - Payment details
 * @param {Object} options.user - User making the payment
 * @param {Object} options.project - Project being invested in
 * @returns {Object} Payment result with paymentId and fee
 */
exports.processPayment = async (options) => {
  const { amount, paymentMethod, paymentDetails, user, project } = options;

  // Calculate fee (2% for example)
  const fee = amount * 0.02;

  switch (paymentMethod) {
    case 'credit_card':
      // Process with Stripe
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round((amount + fee) * 100), // Stripe requires cents
          currency: 'usd',
          description: `Investment in ${project.title}`,
          payment_method: paymentDetails.paymentMethodId,
          confirm: true,
          customer: user.stripeCustomerId,
          metadata: {
            userId: user._id.toString(),
            projectId: project._id.toString(),
            investmentAmount: amount.toString()
          }
        });

        return {
          paymentId: paymentIntent.id,
          fee,
          status: paymentIntent.status === 'succeeded' ? 'succeeded' : 'pending'
        };
      } catch (error) {
        throw new ErrorResponse(`Payment failed: ${error.message}`, 400);
      }

    case 'bank_transfer':
      // Return pending status for bank transfers
      return {
        paymentId: `bank_${Date.now()}`,
        fee,
        status: 'pending'
      };

    case 'wire':
      // Return pending status for wire transfers
      return {
        paymentId: `wire_${Date.now()}`,
        fee,
        status: 'pending'
      };

    case 'crypto':
      // Handle crypto payments (simplified)
      return {
        paymentId: `crypto_${Date.now()}`,
        fee,
        status: 'pending'
      };

    default:
      throw new ErrorResponse('Unsupported payment method', 400);
  }
};

/**
 * Process a refund
 * @param {Object} options
 * @param {String} options.paymentId - Payment ID to refund
 * @param {Number} options.amount - Amount to refund
 * @returns {Object} Refund result
 */
exports.processRefund = async (options) => {
  const { paymentId, amount } = options;

  // Check if it's a Stripe payment
  if (paymentId.startsWith('pi_')) {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentId,
        amount: Math.round(amount * 100) // Stripe requires cents
      });

      return {
        refundId: refund.id,
        status: refund.status
      };
    } catch (error) {
      throw new ErrorResponse(`Refund failed: ${error.message}`, 400);
    }
  } else if (paymentId.startsWith('bank_') || paymentId.startsWith('wire_') || paymentId.startsWith('crypto_')) {
    // For non-Stripe payments, return a pending status
    return {
      refundId: `refund_${Date.now()}`,
      status: 'pending'
    };
  } else {
    throw new ErrorResponse('Invalid payment ID', 400);
  }
};

/**
 * Create or update a Stripe customer
 * @param {Object} user - User object
 * @returns {String} Stripe customer ID
 */
exports.createOrUpdateCustomer = async (user) => {
  try {
    if (user.stripeCustomerId) {
      // Update existing customer
      const customer = await stripe.customers.update(
        user.stripeCustomerId,
        {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`
        }
      );

      return customer.id;
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        metadata: {
          userId: user._id.toString()
        }
      });

      return customer.id;
    }
  } catch (error) {
    throw new ErrorResponse(`Stripe customer creation failed: ${error.message}`, 400);
  }
};

// services/storageService.js - File storage service
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

/**
 * Upload a file to cloud storage
 * @param {Object} options
 * @param {String} options.filePath - Local file path
 * @param {String} options.folder - S3 folder to store in
 * @param {String} options.contentType - File MIME type
 * @returns {String} URL of the uploaded file
 */
exports.uploadFile = async (options) => {
  const { filePath, folder, contentType } = options;

  // Generate a unique file name
  const fileName = `${folder}/${uuidv4()}${path.extname(filePath)}`;

  // Read file from disk
  const fileContent = fs.readFileSync(filePath);

  // Set up S3 upload parameters
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ContentType: contentType,
    ACL: 'public-read'
  };

  // Upload file to S3
  try {
    const data = await s3.upload(params).promise();
    return data.Location; // Return the URL of the uploaded file
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Delete a file from cloud storage
 * @param {String} fileUrl - Full URL of the file to delete
 * @returns {Boolean} Success status
 */
exports.deleteFile = async (fileUrl) => {
  // Extract key from URL
  const key = fileUrl.split('/').slice(3).join('/');

  // Set up S3 delete parameters
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key
  };

  // Delete file from S3
  try {
    await s3.deleteObject(params).promise();
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

/**
 * Generate a pre-signed URL for direct uploads
 * @param {Object} options
 * @param {String} options.fileName - File name
 * @param {String} options.folder - S3 folder
 * @param {String} options.contentType - File MIME type
 * @param {Number} options.expiresIn - Expiration time in seconds
 * @returns {String} Pre-signed URL
 */
exports.getSignedUrl = async (options) => {
  const { fileName, folder, contentType, expiresIn = 60 * 15 } = options; // Default 15 min

  const key = `${folder}/${uuidv4()}-${fileName}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
    Expires: expiresIn,
    ACL: 'public-read'
  };

  try {
    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    return {
      signedUrl,
      fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`
    };
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
};

// services/analyticsService.js - Analytics service
const Project = require('../models/Project');
const Investment = require('../models/Investment');
const User = require('../models/User');

/**
 * Get dashboard analytics for admin/manager
 * @returns {Object} Dashboard statistics
 */
exports.getDashboardStats = async () => {
  // Get total projects count by status
  const projectStats = await Project.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalFundingGoal: { $sum: '$fundingGoal' },
        totalFundingRaised: { $sum: '$fundingRaised' }
      }
    }
  ]);

  // Get total investments count by status
  const investmentStats = await Investment.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$amount' }
      }
    }
  ]);

  // Get user registration stats by month
  const currentYear = new Date().getFullYear();
  const userStats = await User.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  // Get recent investments
  const recentInvestments = await Investment.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate({
      path: 'investor',
      select: 'firstName lastName email'
    })
    .populate({
      path: 'project',
      select: 'title'
    });

  // Format project stats
  const formattedProjectStats = projectStats.reduce((acc, stat) => {
    acc[stat._id] = {
      count: stat.count,
      totalFundingGoal: stat.totalFundingGoal,
      totalFundingRaised: stat.totalFundingRaised
    };
    return acc;
  }, {});

  // Format investment stats
  const formattedInvestmentStats = investmentStats.reduce((acc, stat) => {
    acc[stat._id] = {
      count: stat.count,
      totalAmount: stat.totalAmount
    };
    return acc;
  }, {});

  // Format user stats (fill in missing months)
  const formattedUserStats = Array(12).fill(0);
  userStats.forEach(stat => {
    formattedUserStats[stat._id - 1] = stat.count;
  });

  return {
    projects: formattedProjectStats,
    investments: formattedInvestmentStats,
    users: formattedUserStats,
    recentActivity: recentInvestments
  };
};

/**
 * Get performance metrics for a specific project
 * @param {String} projectId - Project ID
 * @returns {Object} Project performance metrics
 */
exports.getProjectPerformance = async (projectId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error('Project not found');
  }

  // Get investments by day
  const investmentsByDay = await Investment.aggregate([
    {
      $match: {
        project: project._id,
        status: 'completed'
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        },
        count: { $sum: 1 },
        totalAmount: { $sum: '$amount' }
      }
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
        '_id.day': 1
      }
    }
  ]);

  // Get investor demographics
  const investorDemographics = await Investment.aggregate([
    {
      $match: {
        project: project._id,
        status: 'completed'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'investor',
        foreignField: '_id',
        as: 'investorDetails'
      }
    },
    {
      $unwind: '$investorDetails'
    },
    {
      $group: {
        _id: {
          accreditedStatus: '$investorDetails.investorProfile.accreditedStatus'
        },
        count: { $sum: 1 },
        totalAmount: { $sum: '$amount' }
      }
    }
  ]);

  // Calculate time to funding percentage
  const startDate = project.createdAt;
  const currentDate = new Date();
  const deadline = project.fundingDeadline;
  
  const totalTimeframe = deadline - startDate;
  const timeElapsed = currentDate - startDate;
  const timePercentage = Math.min(Math.round((timeElapsed / totalTimeframe) * 100), 100);
  
  const fundingPercentage = Math.round((project.fundingRaised / project.fundingGoal) * 100);

  // Format investment by day data
  const formattedInvestmentsByDay = investmentsByDay.map(day => {
    return {
      date: `${day._id.year}-${day._id.month.toString().padStart(2, '0')}-${day._id.day.toString().padStart(2, '0')}`,
      count: day.count,
      amount: day.totalAmount
    };
  });

  return {
    project: {
      title: project.title,
      fundingGoal: project.fundingGoal,
      fundingRaised: project.fundingRaised,
      fundingPercentage,
      daysRemaining: project.daysRemaining,
      status: project.status
    },
    fundingProgress: {
      timePercentage,
      fundingPercentage
    },
    investmentsByDay: formattedInvestmentsByDay,
    investorDemographics: investorDemographics.map(demo => ({
      accreditedStatus: demo._id.accreditedStatus || 'unknown',
      count: demo.count,
      amount: demo.totalAmount
    }))
  };
};
