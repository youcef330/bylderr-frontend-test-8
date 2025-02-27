# Bylderr Backend Deployment Guide

This document provides instructions for setting up and deploying the Bylderr platform backend.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- AWS Account for S3 storage
- Stripe Account for payment processing
- SendGrid or other email service

## Local Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/bylderr-backend.git
   cd bylderr-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/bylderr
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   JWT_REFRESH_EXPIRE=7d
   JWT_REFRESH_SECRET=your_refresh_token_secret_here
   CLIENT_URL=http://localhost:3000
   EMAIL_SERVICE=sendgrid
   EMAIL_USERNAME=apikey
   EMAIL_PASSWORD=your_sendgrid_api_key
   EMAIL_FROM=info@bylderr.com
   EMAIL_FROM_NAME=Bylderr
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_BUCKET_NAME=bylderr-uploads
   AWS_REGION=us-east-1
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   GEOCODER_PROVIDER=mapquest
   GEOCODER_API_KEY=your_mapquest_api_key
   FILE_UPLOAD_PATH=./uploads
   MAX_FILE_UPLOAD=5000000
   ```

4. Create the uploads directory:
   ```
   mkdir uploads
   ```

5. Start the development server:
   ```
   npm run dev
   ```

## Production Deployment

### Using Docker (Recommended)

1. Install Docker and Docker Compose on your server.

2. Clone the repository on your server:
   ```
   git clone https://github.com/yourusername/bylderr-backend.git
   cd bylderr-backend
   ```

3. Create a `.env` file with production configuration.

4. Build and start the Docker containers:
   ```
   docker-compose up -d
   ```

5. Access the API at `http://your-server-ip:5000`

### Manual Deployment

1. Install Node.js and MongoDB on your server.

2. Clone the repository:
   ```
   git clone https://github.com/yourusername/bylderr-backend.git
   cd bylderr-backend
   ```

3. Install dependencies:
   ```
   npm install --production
   ```

4. Set up environment variables for production.

5. Start the server:
   ```
   npm start
   ```

6. Use a process manager like PM2 to keep the server running:
   ```
   npm install -g pm2
   pm2 start server.js --name bylderr-backend
   ```

## Cloud Deployment (AWS)

### EC2 Instance Setup

1. Launch an EC2 instance (t2.micro or larger).

2. Install Node.js, MongoDB, and other dependencies.

3. Clone the repository and follow the manual deployment steps.

### Using Elastic Beanstalk

1. Create an Elastic Beanstalk application with Node.js platform.

2. Configure environment variables in the Elastic Beanstalk console.

3. Deploy the application using the EB CLI or AWS console.

## MongoDB Setup

### Local MongoDB

1. Install MongoDB:
   ```
   sudo apt-get install mongodb
   ```

2. Start the MongoDB service:
   ```
   sudo systemctl start mongodb
   ```

### MongoDB Atlas (Cloud)

1. Create a MongoDB Atlas account.

2. Create a new cluster.

3. Set up a database user and whitelist your IP.

4. Get the connection string and update your `.env` file.

## Setting Up AWS S3 for File Storage

1. Create an S3 bucket in your AWS account.

2. Configure CORS for the bucket to allow uploads from your frontend domain.

3. Create an IAM user with S3 access and get the access keys.

4. Update your `.env` file with the AWS credentials.

## Setting Up Stripe for Payments

1. Create a Stripe account.

2. Get your API keys from the Stripe dashboard.

3. Update your `.env` file with the Stripe secret key.

4. Set up webhook endpoints for payment event notifications.

## API Documentation

The API documentation is available at `/api-docs` once the server is running.

For local development, access it at `http://localhost:5000/api-docs`.

## Security Considerations

1. Ensure SSL is enabled for production deployments.

2. Set up a firewall and only allow necessary ports.

3. Regularly update dependencies for security patches.

4. Use a secure JWT secret in production.

5. Implement proper input validation and sanitization.

## Monitoring and Logging

1. Set up application monitoring using tools like New Relic or Datadog.

2. Configure centralized logging with ELK stack or a cloud logging service.

3. Set up alerts for errors and performance issues.

## Continuous Integration and Deployment

1. Set up CI/CD pipelines using GitHub Actions, Jenkins, or CircleCI.

2. Configure automated testing before deployment.

3. Implement blue-green deployment for zero-downtime updates.

## Troubleshooting

### Common Issues

1. **MongoDB Connection Errors**
   - Check if MongoDB is running
   - Verify connection string and authentication
   - Check network connectivity and firewall settings

2. **API Authentication Issues**
   - Validate JWT secret and token expiration
   - Check authentication middleware
   - Verify user credentials

3. **File Upload Errors**
   - Check upload directory permissions
   - Verify AWS S3 credentials and bucket configuration
   - Check file size limits

4. **Payment Processing Issues**
   - Verify Stripe API key
   - Check payment service implementation
   - Test with Stripe test mode

For additional support, contact the development team.
