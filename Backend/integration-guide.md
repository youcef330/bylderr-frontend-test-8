# Bylderr Frontend-Backend Integration Guide

This guide provides instructions on how to integrate the Bylderr frontend with the backend API we've created.

## 1. Setup

### Installation

1. Add the necessary packages to your frontend project:

```bash
# Navigate to your frontend project directory
cd bylderr-frontend

# Install required dependencies
npm install axios jwt-decode react-router-dom
```

### File Organization

1. Create the following directory structure in your frontend project:

```
src/
├── services/         # API service files
├── context/          # Context API files
├── utils/            # Utility functions
├── components/       # React components
│   └── routing/      # Routing components
└── config/           # Configuration files
```

2. Copy the provided integration files into their respective directories:
   - API Service: `src/services/api.js`
   - Authentication Service: `src/services/auth.service.js`
   - Project Service: `src/services/project.service.js`
   - Investment Service: `src/services/investment.service.js`
   - Upload Service: `src/services/upload.service.js`
   - Auth Context: `src/context/AuthContext.js`
   - Project Context: `src/context/ProjectContext.js`
   - Token Utilities: `src/utils/token.js`
   - Protected Route: `src/components/routing/ProtectedRoute.js`
   - Configuration: `src/config/index.js`

## 2. Environment Configuration

Create a `.env` file in the root of your frontend project to store environment variables:

```
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Application Configuration
REACT_APP_NAME=Bylderr
```

For production, create a `.env.production` file:

```
# API Configuration
REACT_APP_API_URL=https://your-production-api-url.com/api

# Application Configuration
REACT_APP_NAME=Bylderr
```

## 3. Setting Up Authentication

### Wrap Your Application with AuthProvider

In your main `App.js` or `index.js` file, wrap your application with the `AuthProvider`:

```jsx
// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
```

### Implement Login and Registration Components

Create login and registration forms that use the authentication context:

```jsx
// src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
```

## 4. Setting Up Protected Routes

Create a routing configuration that uses the `ProtectedRoute` component:

```jsx
// src/AppRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './config';
import ProtectedRoute from './components/routing/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import ProjectsList from './pages/ProjectsList';
import ProjectDetails from './pages/ProjectDetails';

// Protected Pages
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import InvestmentsList from './pages/InvestmentsList';
import InvestmentDetails from './pages/InvestmentDetails';
import Documents from './pages/Documents';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UsersList from './pages/admin/UsersList';
import UserDetails from './pages/admin/UserDetails';
import ProjectsManagement from './pages/admin/ProjectsManagement';
import ProjectEdit from './pages/admin/ProjectEdit';
import ProjectCreate from './pages/admin/ProjectCreate';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.PUBLIC.HOME} element={<Home />} />
      <Route path={ROUTES.PUBLIC.LOGIN} element={<Login />} />
      <Route path={ROUTES.PUBLIC.REGISTER} element={<Register />} />
      <Route path={ROUTES.PUBLIC.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.PUBLIC.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={ROUTES.PUBLIC.VERIFY_EMAIL} element={<VerifyEmail />} />
      <Route path={ROUTES.PUBLIC.PROJECTS} element={<ProjectsList />} />
      <Route path={ROUTES.PUBLIC.PROJECT_DETAILS} element={<ProjectDetails />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.PROTECTED.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.PROTECTED.PROFILE} element={<Profile />} />
        <Route path={ROUTES.PROTECTED.INVESTMENTS} element={<InvestmentsList />} />
        <Route path={ROUTES.PROTECTED.INVESTMENT_DETAILS} element={<InvestmentDetails />} />
        <Route path={ROUTES.PROTECTED.DOCUMENTS} element={<Documents />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route path={ROUTES.ADMIN.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        <Route path={ROUTES.ADMIN.USERS} element={<UsersList />} />
        <Route path={ROUTES.ADMIN.USER_DETAILS} element={<UserDetails />} />
        <Route path={ROUTES.ADMIN.PROJECTS_MANAGEMENT} element={<ProjectsManagement />} />
        <Route path={ROUTES.ADMIN.PROJECT_EDIT} element={<ProjectEdit />} />
        <Route path={ROUTES.ADMIN.PROJECT_CREATE} element={<ProjectCreate />} />
      </Route>

      {/* Route not found - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
```

## 5. Using Project Context

Add the `ProjectProvider` to your application:

```jsx
// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProjectProvider>
          <AppRoutes />
        </ProjectProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
```

Use the project context in your components:

```jsx
// src/pages/ProjectsList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { ROUTES } from '../config';

const ProjectsList = () => {
  const { projects, loading, error, pagination, fetchProjects } = useProjects();
  const [filters, setFilters] = useState({
    sector: '',
    status: '',
    sort: 'createdAt',
    page: 1,
    limit: 10
  });

  useEffect(() => {
    fetchProjects(filters);
  }, [fetchProjects, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage
    }));
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="projects-container">
      <h1>Investment Projects</h1>
      
      {/* Filters */}
      <div className="filters">
        {/* Filter components */}
      </div>
      
      {/* Projects List */}
      <div className="projects-list">
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.shortDescription}</p>
              <div className="project-details">
                <span>Sector: {project.sector}</span>
                <span>Funding: {(project.fundingRaised / project.fundingGoal * 100).toFixed(1)}%</span>
                <span>Risk: {project.risk}</span>
              </div>
              <Link to={`/projects/${project._id}`} className="view-button">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
      
      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={filters.page <= 1}
          onClick={() => handlePageChange(filters.page - 1)}
        >
          Previous
        </button>
        <span>
          Page {filters.page} of {pagination.totalPages}
        </span>
        <button
          disabled={filters.page >= pagination.totalPages}
          onClick={() => handlePageChange(filters.page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectsList;
```

## 6. Making Investment

Implement investment functionality:

```jsx
// src/pages/InvestmentForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInvestment } from '../services/investment.service';
import { ROUTES } from '../config';

const InvestmentForm = ({ projectId, minInvestment }) => {
  const [amount, setAmount] = useState(minInvestment);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const investmentData = {
        amount: parseFloat(amount),
        paymentMethod,
        paymentDetails: {
          // Payment details would be collected here
          paymentMethodId: 'test_payment_method_id'
        }
      };

      const response = await createInvestment(projectId, investmentData);

      if (response.success) {
        navigate(ROUTES.PROTECTED.INVESTMENTS);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('An error occurred while processing your investment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="investment-form-container">
      <h2>Make an Investment</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Investment Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={minInvestment}
            step="0.01"
            required
          />
          <small>Minimum investment: ${minInvestment}</small>
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="wire">Wire Transfer</option>
            <option value="crypto">Cryptocurrency</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Invest Now'}
        </button>
      </form>
    </div>
  );
};

export default InvestmentForm;
```

## 7. File Uploads

Create a document upload component:

```jsx
// src/components/DocumentUpload.js
import React, { useState } from 'react';
import { uploadDocument } from '../services/upload.service';
import { API_CONFIG } from '../config';

const DocumentUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    // Validate file size
    if (selectedFile && selectedFile.size > API_CONFIG.fileUpload.maxSize) {
      setError(`File size exceeds the maximum limit of ${API_CONFIG.fileUpload.maxSize / (1024 * 1024)}MB`);
      return;
    }
    
    // Validate file type
    if (selectedFile && !API_CONFIG.fileUpload.allowedDocumentTypes.includes(selectedFile.type)) {
      setError('File type not supported');
      return;
    }
    
    setFile(selectedFile);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('description', description);

      const response = await uploadDocument(formData);

      if (response.success) {
        setFile(null);
        setDescription('');
        if (onUploadSuccess) {
          onUploadSuccess(response.document);
        }
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('An error occurred while uploading the document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="document-upload-container">
      <h3>Upload Document</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="document">Select File</label>
          <input
            type="file"
            id="document"
            onChange={handleFileChange}
            accept={API_CONFIG.fileUpload.allowedDocumentTypes.join(',')}
          />
          <small>
            Max size: {API_CONFIG.fileUpload.maxSize / (1024 * 1024)}MB | 
            Supported formats: PDF, DOC, DOCX, XLS, XLSX, CSV, ZIP, RAR
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter document description"
          />
        </div>
        <button type="submit" disabled={loading || !file}>
          {loading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>
    </div>
  );
};

export default DocumentUpload;
```

## 8. Dashboard Integration

Create a dashboard component that integrates with the backend:

```jsx
// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyInvestments } from '../services/investment.service';
import { ROUTES } from '../config';

const Dashboard = () => {
  const { user } = useAuth();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      setLoading(true);
      try {
        const response = await getMyInvestments();
        if (response.success) {
          setInvestments(response.investments);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to fetch investments');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Investor Dashboard</h1>
      
      <div className="welcome-section">
        <h2>Welcome, {user.firstName}!</h2>
        <p>Here's an overview of your investments and activities.</p>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>My Investments</h3>
          {loading ? (
            <p>Loading investments...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : investments.length === 0 ? (
            <div className="empty-state">
              <p>You haven't made any investments yet.</p>
              <Link to={ROUTES.PUBLIC.PROJECTS} className="button">
                Explore Projects
              </Link>
            </div>
          ) : (
            <div className="investments-list">
              {investments.slice(0, 3).map((investment) => (
                <div key={investment._id} className="investment-item">
                  <h4>{investment.project.title}</h4>
                  <div className="investment-details">
                    <p>Amount: ${investment.amount.toFixed(2)}</p>
                    <p>Status: {investment.status}</p>
                    <p>Date: {new Date(investment.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Link to={`/investments/${investment._id}`}>View Details</Link>
                </div>
              ))}
              {investments.length > 3 && (
                <Link to={ROUTES.PROTECTED.INVESTMENTS} className="view-all-link">
                  View All Investments
                </Link>
              )}
            </div>
          )}
        </div>
        
        {/* Add more dashboard cards as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
```

## 9. Testing the Integration

1. Start the backend server:
   ```bash
   cd bylderr-backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd bylderr-frontend
   npm start
   ```

3. Test the following functionality:
   - User registration and login
   - Project browsing and details viewing
   - Making investments
   - Dashboard functionality
   - File uploads and document management
   - Admin functionality (if you have admin access)

## 10. Deployment Considerations

### Frontend Deployment

1. Build the frontend for production:
   ```bash
   npm run build
   ```

2. Deploy the built files to a static hosting service like Netlify, Vercel, or AWS S3.

### Environment Variables

Ensure environment variables are properly set for each environment:

1. Development: `.env.development`
2. Production: `.env.production`

### CORS Configuration

Make sure the backend CORS settings allow requests from your frontend domain:

```javascript
// In the backend app.js
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

### Security Best Practices

1. Always use HTTPS in production
2. Implement proper input validation on both frontend and backend
3. Store sensitive information in secure environment variables
4. Use HTTP-only cookies for additional security
5. Implement rate limiting for API endpoints

## 11. Troubleshooting

### Common Issues and Solutions

1. **CORS errors**:
   - Ensure the backend CORS configuration allows your frontend domain
   - Check that the request includes proper headers

2. **Authentication issues**:
   - Verify JWT token is being sent correctly in the Authorization header
   - Check token expiration and refresh token logic

3. **API connection errors**:
   - Confirm API URL is correct in your environment variables
   - Ensure backend server is running and accessible

4. **File upload issues**:
   - Check file size limits
   - Verify supported file types
   - Ensure multipart/form-data content type is being used

## 12. Additional Resources

1. [React Documentation](https://reactjs.org/docs/getting-started.html)
2. [React Router Documentation](https://reactrouter.com/docs/en/v6)
3. [Axios Documentation](https://axios-http.com/docs/intro)
4. [JWT.io](https://jwt.io/) - For understanding JWT tokens
5. [Express.js Documentation](https://expressjs.com/)
6. [MongoDB Documentation](https://docs.mongodb.com/)
