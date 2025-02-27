# BYLDERR-INVESTOR-FRONTEND

## Project Overview

 BYLDERR-INVESTOR-FRONTEND is a React-based application designed to offer a seamless and intuitive experience for users investing in real estate. The platform enables users to make investments, manage their investments, view potential investments, track portfolio performance, and handle financial transactions such as adding and withdrawling funds. It leverages a scalable folder structure, Tailwind CSS for styling, Redux for state management, and API calls for dynamic data integration.

---

## Table of Contents

1. [Folder Structure](#folder-structure) 
2. [Key Features](#key-features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
5. [Scripts](#scripts)
6. [Folder Details](#folder-details)
7. [API Integration](#api-integration)
8. [Styling with Tailwind CSS](#styling-with-tailwind-css)
9. [Future Enhancement](#future-enhancements)

---

## Folder Structure
```
.
├── App.jsx                     # Main application component
├── assets/                     # Static assets (images, logos)
├── components/                 # Reusable UI components by domain
├── index.css                   # Global CSS (Tailwind entry point)
├── main.jsx                    # Application entry point
├── mockData/                   # Mock data for testing/development
├── routes/                     # App routing components (Protected/Public)
├── screens/                    # Page-level screens
├── slices/                     # Redux slices for state management
├── store.jsx                   # Redux store configuration
└── utils/                      # Utility functions and shared logic
```
---

## Key Features

- Modular Architecture: Clear separation of components, screens, and utilities for maintainability.
- State Management: Centralized state handling using Redux slices. (for signup users so far)
- Tailwind CSS: Rapid UI development with a utility-first CSS framework.
- API Integration: Real-time data updates with API calls in key components.
- Mock Data: Support for development and testing without live APIs.
- Routing & Access Control: Public and protected routes for secure user navigation.

---

## Technologies Used

- Frontend Framework: React (Functional Components)
- Styling: Tailwind CSS
- State Management: Redux & Redux Toolkit
- Routing: React Router
- Utilities: Debounce, Sanitization, and Currency Formatting Utilities
- Build Tooling: Vite
- API Calls: Axios or Fetch (used in various slices/components)

---

## Getting Started

### Prerequisites

- Node.js (>=14)
- npm or yarn

### Installation

1. Clone the repository:
   git clone <repository_url>
   cd <repository_directory>

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev, 
   npm run dev -- --host

4. Open the application in your browser at:
   Local: http://localhost:3000

---

## Scripts

- `npm run dev`: Start the development server with hot reloading.
- `npm run build`: Create an optimized production build.
- `npm run lint`: Check for code formatting and quality issues.

---

## Folder Details

### assets/
Contains images and brand assets.

### components/
Reusable and domain-specific components. Organized into subdirectories like:

- AccountComponents: Manage user account details.
- AddFunds: Components for handling fund deposits and related steps.
- DashboardComponents: Widgets and cards for displaying portfolio, watchlist, and activity data.
- HelpSection: FAQ, educational materials, and resources for users.
- Layout: Shared layout components (header, sidebar, footer).
- ListingsComponents: Tools for viewing, filtering, and interacting with property listings.
- PaymentPayout: Components for managing payment and distribution settings.
- ProfileComponents: User profile components, goal tracking, and owned listings.
- SettingsComponents: Account settings, notifications, and security.
- SignupInvestor: Forms and steps for investor onboarding.
- TaxComponents: Tools for tax documentation and summaries.

### mockData/
Mock datasets for testing without a live backend.

### routes/
Defines routing behavior. `ProtectedRoute.jsx` and `PublicRoute.jsx` handle route access control based on authentication status.

### screens/
Top-level screens that map directly to application routes (e.g., `Dashboard.jsx`, `Settings.jsx`, `Profile.jsx`).

### slices/
Redux slices managing state logic. For example:
- `authSlice.jsx` for authentication state
- `signupSlice.jsx` for user signup flow

### utils/
Reusables like:
- `DebounceButton.jsx` for throttling user input
- `formatToUSD.jsx` for currency formatting
- `sanitizeInput.jsx` for input cleaning

---

## **API Integration**

This project incorporates dynamic API calls to manage data across various features. The API is integrated using **Axios** for consistent and efficient communication with the backend.

### **Architecture Overview**
- **API Folder**: All API-related logic is centralized in the `src/api/` folder for modularity and maintainability.
- **Axios Instance**: A shared Axios instance is configured in `axiosInstance.js` to handle:
  - Base URLs from environment variables.
  - Authentication headers.
  - Error interceptors for consistent error handling.
- **Environment Variables**: Sensitive data like API keys and endpoints are securely stored in `.env` files.

### **Folder Structure**

```
src/
├── api/
│   ├── axiosInstance.js       # Centralized Axios instance
│   ├── dashboardApi.js        # Dashboard metrics APIs
│   ├── depositApi.js          # Deposit-related APIs
│   ├── investmentApi.js       # Investment-related APIs
│   ├── listingsApi.js         # Property listings APIs
│   ├── paymentPayoutApi.js    # Payment and payout APIs
│   ├── profileApi.js          # User profile APIs
│   ├── settingsApi.js         # User settings APIs
│   ├── signupApi.js           # Signup APIs
│   └── taxCenterApi.js        # Tax-related APIs
```

### **Endpoints Overview**

| **Feature**            | **Endpoint**                      | **HTTP Method** | **Description**                                                               | **Parameters**                         | **Expected Return**                            |
|------------------------|-----------------------------------|-----------------|-------------------------------------------------------------------------------|----------------------------------------|------------------------------------------------|
| **Authentication**     | `/login`                          | `POST`          | Authenticates a user with username and password.                              | `username`, `password`                 | [View Expected Return](#login) |
|                        | `/user`                           | `GET`           | Retrieves authenticated user's data and settings.                             | None                                   | [View Expected Return](#login) |
|                        | `/signup`                         | `POST`          | Submits user data for signing up                                              | `payload` (array/object)               | [View Expected Return](#sign-up) |
| **Account Card**       | `/dashboard`                      | `GET`           | Retrieves user portfolio data (returns, dividends, appreciation).             | None                                   | [View Expected Return](#account-card) |
|                        | `/portfolio-chart`                | `GET`           | Fetches data for portfolio visualization chart.                               | None                                   | [View Expected Return](#portfolio-chart) |
| **Activity**           | `/activity`                       | `GET`           | Fetches user's activity and investment history.                               | None                                   | [View Expected Return](#activity) |
| **Developers**         | `/developers/add`                 | `POST`          | Adds a developer to the user's followed list.                                 | `devId`                                | [View Expected Return](#add-developer) |
|                        | `/developers/remove`              | `DELETE`        | Removes a developer from the user's followed list.                            | `devId`                                | [View Expected Return](#remove-developer) |
|                        | `/developers`                     | `GET`           | Retrieves the list of followed developers.                                    | None                                   | [View Expected Return](#developer) |
| **Holdings**           | `/holdings`                       | `GET`           | Retrieves user's investment holdings.                                         | None                                   | [View Expected Return](#holdings-1) |
| **Investment**         | `/investment-mix`                 | `GET`           | Retrieves user's investment distribution across property types.               | None                                   | [View Expected Return](#investment-mix) |
| **Watchlist**          | `/watchlist`                      | `GET`           | Retrieves user's watchlist of properties.                                     | None                                   | [View Expected Return](#watchlist-1) |
|                        | `/watchlist/add`                  | `POST`          | Adds a property to the watchlist.                                             | `propertyId`                           | [View Expected Return](#add-watchlist) |
|                        | `/watchlist/remove`               | `DELETE`        | Removes a property from the watchlist.                                        | `propertyId`                           | [View Expected Return](#remove-watchlist) |
| **Add Funds**          | `/deposit-options`                | `GET`           | Retrieves available deposit options for online and wire transfers.            | None                                   | [View Expected Return](#deposit-options) |
|                        | `/add-funds`                      | `POST`          | Adds funds to user's account via selected deposit method and amount.          | `payload` (object)                     | [View Expected Return](#add-funds) |
| **Listings**           | `/listings`                       | `GET`           | Retrieves property listings based on specified filters (location, price, etc.)| `filters` (object)                     | [View Expected Return](#listings-1) |
|                        | `/listings/{propertyId}`          | `GET`           | Retrieves specific property details by ID.                                    | `propertyId`                           | [View Expected Return](#listing) |
|                        | `/documents/download/:fileName`   | `GET`           | Downloads specified document.                                                 | `fileName`                             | [View Expected Return](#document-download) |
|                        | `/listings/{propertyId}/save`     | `POST`          | Saves a property to user's saved list.                                        | `propertyId`                           | [View Expected Return](#save-listing) |
|                        | `/listings/{propertyId}/unsave`   | `DELETE`        | Removes a property from user's saved list.                                    | `propertyId`                           | [View Expected Return](#unsave-listing) |
| **Make Investments**   | `/buyInvestments`                   | `POST`          | Submits an investment transaction with property details.                      | `investmentData` (object)              | [View Expected Return](#buy-investment) |
|                        | `/sellInvestments`                | `POST`          | Submits a request to sell investment shares.                                  | `saleData` (object)                    | [View Expected Return](#sell-investment) |
| **Profile**            | `/user/profile`                   | `GET`           | Retrieves user profile information.                                           | None                                   | [View Expected Return](#profile-1) |
| **Tax Center**         | `/tax-data`                       | `GET`           | Retrieves user tax-related data.                                              | None                                   | [View Expected Return]() |
|                        | `/tax-data/user-info`             | `POST`          | Saves user tax information.                                                   | `userInfo` (object)                    | [View Expected Return]() |
|                        | `/tax-data/upload/{type}`         | `POST`          | Uploads tax-related documents.                                                | `type`, `files`                        | [View Expected Return]() |
|                        | `/tax-data/delete/{type}/{documentId}` | `DELETE`   | Removes specific document by type and ID.                                     | `type`, `documentId`                   | [View Expected Return]() |
| **Payments**           | `/payments/save-scheduled-preferences` | `POST`     | Saves user scheduled payment preferences.                                     | `preferences` (object)                 | [View Expected Return](#payments) |
|                        | `/payments/advanced-settings`     | `POST`          | Saves all advanced payment settings.                                          | `settings` (object)                    | [View Expected Return](#advanced-settings) |
|                        | `/payments/request-withdrawal`    | `POST`          | Requests a withdrawal of funds.                                               | `{ amount, bank }` (object)            | [View Expected Return](#request-withdrawal) |
|                        | `/payments/distribution-history`  | `GET`           | Fetches distribution history of payments.                                     | None                                   | [View Expected Return](#distribution-history) |
|                        | `/payments/payoutSettings`        | `GET`           | Retrieves user payout settings.                                               | None                                   | [View Expected Return](#payout-settings) |
|                        | `/payments/banks`                 | `POST`          | Adds a new bank to user's account.                                            | `bank` (object)                        | [View Expected Return](#add-bank) |
|                        | `/payments/banks/{id}`            | `PUT`           | Edits an existing bank's details.                                             | `id`, `bank`                           | [View Expected Return](#edit-bank) |
|                        | `/payments/banks/{id}`            | `DELETE`        | Deletes a bank from user's account.                                           | `id`                                   | [View Expected Return](#delete-bank) |
|                        | `/payments/banks/{id}/set-primary`| `POST`          | Sets a bank as the primary bank.                                              | `id`                                   | [View Expected Return](#set-primary-bank) |
| **Contact & Security** | `/contactDetails`                 | `GET`           | Fetches user's contact details.                                               | None                                   | [View Expected Return](#contact-details) |
|                        | `/contactDetails`                 | `PUT`           | Updates user's contact details.                                               | `details` (object)                     | [View Expected Return](#update-contact-details) |
|                        | `/update-password`                | `POST`          | Updates user's password.                                                      | `oldPassword`, `newPassword`           | [View Expected Return](#update-password) |
|                        | `/deactivate-account`             | `POST`          | Deactivates user's account.                                                   | `password`                             | [View Expected Return](#deactivate-account) |
|                        | `/userDetails`                    | `GET`           | Retrieves user's identity details.                                            | None                                   | [View Expected Return](#user-details) |
| **Notifications**      | `/notifications-history`          | `GET`           | Fetches history of user notifications.                                        | None                                   | [View Expected Return](#notification-history) |
|                        | `/notifications`                  | `GET`           | Retrieves user's notification preferences.                                    | None                                   | [View Expected Return](#notification-preferences) |
|                        | `/save-notifications`             | `POST`          | Saves user notification preferences.                                          | `notifications` (array/object)         | [View Expected Return](#save-notification) |
|                        | `/standard-notifications`         | `GET`           | Retrieves user's standard notification preferences.                           | None                                   | [View Expected Return](#standard-notification) |
|                        | `/save-standard-notifications`    | `POST`          | Saves user standard notification preferences.                                 | `notifications` (array/object)         | [View Expected Return](#save-standard-notification) |
| **Investment Preferences** | `/investment-preferences`     | `GET`           | Retrieves user's investment preferences.                                      | None                                   | [View Expected Return](#investment-preferences) |
|                        | `/save-investment-preferences`    | `POST`          | Saves user updated investor preferences.                                      | `preferences` (array/object)           | [View Expected Return](#save-investment-preferences) |
| **User Activity**      | `/login-activity`                 | `GET`           | Fetches user's login activity                                                 | None                                   | [View Expected Return](login-activity) |
---


### **API-Dependent Components**
Below are the key components utilizing API calls:

| **Component**        | **Purpose**                                           | **Notes**                                             |
|-----------------------|------------------------------------------------------|-------------------------------------------------------|
| [`AuthContext`](/contexts/AuthContext.jsx)        | Athenticates the user                                | Integrates [`/login`] and [`/user`]                       |
| [`ReviewSubmit`](/src/components/SignupInvestor/ReviewSubmit.jsx)        | Submits all the user's information for account creation.| Integrates [`/signup`]                       |
| [`AccountCard`](/src/components/DashBoardComponents/AccountCard.jsx)         | Displays user's portfolio statistics.                  | Integrates `/dashboard` and `/portfolio-chart`.       |
| [`ActivityTable`](/src/components/DashBoardComponents/ActivityTable.jsx)    | Displays the user's activity and investment activity. | Integrates `/activity`.                               |
| [`DeveloperItem`](/src/components/DashBoardComponents/DeveloperItem.jsx)       | Displays the developers and allows the user to like or dislike    | Integrated `/developers/add` and `/developers/remove`.|
| [`MyDevelopers`](/src/components/DashBoardComponents/MyDevelopers.jsx)       | Displays the user's liked developers.                  | Integrated `/developers`.|
| [`HoldingTable`](/src/components/DashBoardComponents/HoldingTable.jsx)       | Displays the user's holdings.                  | Integrated `/holdings`.|
| [`InvestmentMix`](/src/components/DashBoardComponents/InvestmentMix.jsx)       | Displays the user's investment distribution across property types.                  | Integrated `/investment-mix`.|
| [`Watchlist`](/src/components/DashBoardComponents/Watchlist.jsx)             | Displays the user's watched properties | Integrates `/watchlist` |
| [`WatchlistItems`](/src/components/DashBoardComponents/WatchlistItems.jsx)     | Displays the watched properties and allows the user to like or dislike | Integrates `/watchlist/add` and `/watchlist/remove` |
| [`DepositForm`](/src/components/AddFunds/DepositForm.jsx)             | Allows the user to select where they withdrawl funds from and the amount | Integrates `/deposit-options` |
| [`Stage2`](/src/components/AddFunds/Stage2.jsx)             | Studmits the depposite of the requested funds to outr platform | Integrates `/add-funds` |
| [`ListingsScreen`](/src/screens/ListingsScreen.jsx)             | Displays properties by filter | Integrates `/listings` |
| [`Listing`](/src/screens/Listing.jsx)             | Displays the selected property | Integrates `/listings/{propertyId}` |
| [`DocumentItem`](/src/components/ListingsComponents/Listing/DocumentItem.jsx)             | Displays the document the user can download for the property | Integrates [`/documents/download/:fileName`](/src/api/listingsApi.js) |
| [`SavePropertyButton`](/src/components/ListingsComponents/Listing/SavePropertyButton.jsx)             | Allows the user to save or unsave properties  | Integrates [`/listings/{propertyId}/save`](/src/api/listingsApi.js) and [`/listings/{propertyId}/unsave`](/src/api/listingsApi.js) |
| [`InvestmentPurchaseModal`](/src/components/ListingsComponents/Listing/InvestmentPurchaseModal.jsx)             | Allows the user to invest in properties| Integrates [`/buyInvestments`](/src/api/investmentApi.js) |
| [`SellSharesModal`](/src/components/ListingsComponents/Listing/SellSharesModal.jsx)             | Allows the user to list for sale fractions of their investments | Integrates [`/sellInvestments`](/src/api/investmentApi.js) |
| [`Profile`](/src/screens/Profile.jsx)             | Displays the user's profile screen | Integrates `/user/profile` |
| [`ScheduleSettings`](/src/components/PaymentPayout/ScheduleSettings.jsx)             | Allows the user to update their their payout frequency and bank | Integrates `/payments/save-scheduled-preferences` |
| [`AdvancedSettings`](/src/components/PaymentPayout/AdvancedSettings.jsx)             | Allows the user to update the distribution cap, min, notification method for distributions, and Principal Repayment Options | Integrates `/payments/advanced-settings` |
| [`OnDemandSchedule`](/src/components/PaymentPayout/OnDemandSchedule.jsx)             | Allows the user to request on demand withdrawl | Integrates `/payments/request-withdrawal` |
| [`DistributionHistory`](/src/components/PaymentPayout/DistributionHistory.jsx.jsx)             | Displays the user's distribution history | Integrates `/payments/distribution-history` |
| [`DistributionOptions`](/src/components/PaymentPayout/DistributionOptions.jsx)             | Fetches and sets the user's settings | Integrates `/payments/payoutSettings` |
| [`BankManagement`](/src/components/PaymentPayout/BankManagement.jsx)             | Allows the user to add, edit, delete, and set primary bank information  | Integrates `/payments/banks`, `/payments/banks/{id}`, `/payments/banks/{id}/set-primary`, and  `/payments/banks/{id}` |
| [`ContactDetails`](/src/components/SettingsComponents/ContactDetails.jsx)             | Allows the user to veiw and update their contact information  | Integrates [`/update-password`](/src/api/settingsApi.js) |
| [`CredentialsForm`](/src/components/SettingsComponents/CredentialsForm.jsx)             | Allows the user to update their password  | Integrates [`/contactDetails`](/src/api/settingsApi.js) |
| [`DeactivateAccount`](/src/components/SettingsComponents/DeactivateAccount.jsx)             | Allows the user to Deactivate their Account  | Integrates [`/deactivate-account`](/src/api/settingsApi.js) |
| [`IdentityDetails`](/src/components/SettingsComponents/IdentityDetails.jsx)             | Allows the user to view their identity details  | Integrates [`/userDetails`](/src/api/settingsApi.js) |
| [`NotificationHistory`](/src/components/SettingsComponents/NotificationHistory.jsx)             | Allows the user to view their Notification history  | Integrates [`/notifications-history`](/src/api/settingsApi.js) |
| [`NotificationsChannel`](/src/components/SettingsComponents/NotificationsChannel.jsx)             | Allows the user to view and save their  notification channel  | Integrates [`/notifications`](/src/api/settingsApi.js) and [`/save-notifications`](/src/api/settingsApi.js) |
| [`StandardNotifications`](/src/components/SettingsComponents/StandardNotifications.jsx)             | Allows the user to view and save their Standard notification settings  | Integrates [`/standard-notifications`](/src/api/settingsApi.js) and  [`/save-standard-notifications`](/src/api/settingsApi.js) |
| [`UpdateInvestmentPreferences`](/src/components/SettingsComponents/UpdateInvestmentPreferences.jsx)             | Allows the user to view and update their investment preferences  | Integrates [`/investment-preferences`](/src/api/settingsApi.js) and [`/save-investment-preferences`](/src/api/settingsApi.js) |
| [`ViewLoginActivity`](/src/components/SettingsComponents/ViewLoginActivity.jsx)             | Allows the user to view their login activity  | Integrates [`/login-activity`](/src/api/settingsApi.js) |

---

## Authentication

### Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Authenticates a user with their username and password.

#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| username  | string | The user's username. | Yes      |
| password  | string | The user's password. | Yes      |

#### Example Request

```json
{
  "username": "johndoe",
  "password": "securepassword123"
}

```

#### Example Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "user": {
    "id": 1,
    "name": "johndoe",
    "role": "investor",
    "permissions": ["read", "write",],
    "preferences": {
      "theme": "dark",
      "language" : "en",
    }
  }
}
```


| **Field**   |	**Type**   |	**Description**                    | **Options**        |
|-------------|------------|---------------------------------------|--------------------|
| token	      | (`string`) | JWT `token` for authenticated requests|                    |
| user   	  | (`object`) |                                       |                    |
| user.id	  | (`string`) | User's unique `ID`                    |                    |
| user.name	  | (`string`) | User's `name`                         |                    |
| user.role	  | (`string`) | User's `role` for the platform        |                    |
| user.permisions	  | (`array`) | User's `permissions`           | `read`, `write`, ...|        
| user.lastName	  | (`string`) | User's `last name`                |                    |
| user.preferences   	  | (`object`) |                           |                    |
| user.preferences.theme   | (`string`)| Selected Theme            | `light` or `dark` |
| user.preferences.language| (`string`)| Selected Language         | `en`, ...          |


[Back](#api-integration)

### Sign up	

- **Endpoint:** `/signup`
- **Method:** `POST`
- **Description:** Submits user data for signing up.

#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| payload  | `object` | The users signup information | Yes      |

#### Example Request

```json
 {
    "email" : "johndoe@example.com",
    "investorType" : "individual",
    "userDetails" : {
        "firstName": "John",
        "lastName" : "Doe",
        "dob" : "1952-10-28", 
        "ssn" : "123-45-6789",
        "unitNumber" : "",
        "streetAddress" : "123 Street",
        "city" : "City",
        "state" : "CA",
        "zipCode" : "21211",
    },
    "riskLevel" : "5",
    "investmentAmount" : 500000,
    "locations" : ["Orange, California, US", ],
    "commercial": ["Industrial", "Office",],
    "residential": ["Multi-Family", ],
    "timeHorizon": "Long-Term Investors",
    "accreditedInvestorStatus": "Yes",
    "annualIncome": 100000,
    "netWorth": 100000000,
}

```

[Back](#api-integration)

## Account Card

### Dashboard

- **Endpoint:** `/dashboard`
- **Method:** `GET`
- **Description:** Retrieves user portfolio data (returns, dividends, appreciation).


#### Example Response

```json
 {
    "totalValue": 12315355.18,
    "appreciation": 32673.34,
    "dividends": 12461.89,
    "contributions": 270219.95,
    "totalChange": 45135.23,
    "percentageChange": 16.7,
  };

```
[Back](#api-integration)


### Portfolio Chart



- **Endpoint:** `/portfolio-chart`
- **Method:** `GET`
- **Description:** Fetches data for portfolio visualization chart.


#### Example Response

```json
[
    { "date": "2020-1", "value": 0 },
    { "date": "2020-4", "value": 50000 },
    { "date": "2020-7", "value": 120000 },
    { "date": "2020-10", "value": 150000 },
    { "date": "2021-1", "value": 180000 },
]

```

[Back](#api-integration)

## Activity

### Activity

- **Endpoint:** `/activity`
- **Method:** `GET`
- **Description:** Fetches user's activity and investment history.



#### Example Response

```json
[
    {
        "property": "Single-Family-Residential",
        "total": "-$30,467.00", 
        "shares": 50,
        "date": "May 30, 2020",
        "activityType": "Buy"
    },
    {
        "property": "Luxury Beach House",
        "total": "+$365.60", 
        "shares": "10",
        "date": "July 30, 2020", 
        "activityType": "Sell"
    },
    {
        "property": "Luxury Beach House",
        "total": "+$365.60", 
        "shares": "", 
        "date": "July 30, 2020", 
        "activityType": "Dividend"
    },
    {
        "property": "Luxury Beach House",
        "total": "-$365.60", 
        "shares": "", 
        "date": "July 30, 2020", 
        "activityType": "Maintenance"
    },
]

```

[Back](#api-integration)

## Developer

### Developer

- **Endpoint:** `/developers`
- **Method:** `GET`
- **Description:** Retrieves the list of followed developers.

#### Example Response

```json
[
    {
        "devId": 1 ,
        "devName": "Real Estate- Premium Properties",
        "units": "320 units",
        "totalRasied": "+$2,455,135.23 (16.70%)"
    },
    {
        "devId": 2,
        "devName": "Real Estate- Premium Properties",
        "units": "320 units",
        "totalRasied": "+$2,455,135.23 (16.70%)"
    },
]

```

[Back](#api-integration)

### Add Developer

- **Endpoint:** `/developers/add`
- **Method:** `POST`
- **Description:** Adds a developer to the user's followed list.

#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| devID  | `string` | The developers Unique ID | Yes      |

#### Example Request

```json
 {
  "devId": 1
}
```

[Back](#api-integration)

### Remove Developer

- **Endpoint:** `/developers/remove`
- **Method:** `DELETE`
- **Description:** Removes a developer to the user's followed list.

#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| devID  | `string` | The developers Unique ID | Yes      |

#### Example Request

```json
 {
  "devId": 1
}
```

[Back](#api-integration)

## Holdings

### Holdings

- **Endpoint:** `/holdings`
- **Method:** `GET`
- **Description:** Retrieves user's investment holdings.

#### Example Response

```json
[
    {
        "propertyId":1,
        "property": "Single-Family-Residential",
        "total": "+$45,135.23 (16.70%)",
        "shares": 50,
        "allocation": "50%"
    },
    {
        "propertyId":2,
        "property": "Luxury Beach House",
        "total": "+$45,135.23 (16.70%)",
        "shares": 100,
        "allocation":"50%"
    },
]

```

[Back](#api-integration)

## Investment

### Investment Mix

- **Endpoint:** `/investment-mix`
- **Method:** `GET`
- **Description:** Retrieves user's investment distribution across property types.

#### Example Response

```json
[
    { "name": "Single Family", "value": 2334.84 },
    { "name": "Multifamily", "value": 2334.84 },
    { "name": "Land", "value": 5420.55 },
    { "name": "Office", "value": 12030.84 },
    { "name": "Retail", "value": 6730.20 },
    { "name": "Industrial", "value": 9445.34 },
    { "name": "Hospitality", "value": 3890.75 },
    { "name": "Medical", "value": 4520.90 },
    { "name": "Construction", "value": 2850.60 }
]

```

[Back](#api-integration)

## Watchlist

### Watchlist

- **Endpoint:** `/watchlist`
- **Method:** `GET`
- **Description:** Retrieves user's watchlist of properties.


#### Example Response

```json
[
    {
        "propertyId": 1,
        "propertyName": "Luxury Beach House",
        "fundsRaised": "30.23% of $600,000",
    },
];

```

[Back](#api-integration)

### Add Watchlist

- **Endpoint:** `/watchlist/add`
- **Method:** `POST`
- **Description:** Adds a property to the watchlist.


#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| propertyId  | string | The properties ID  | Yes      |

#### Example Request

```json
{
  "propertyId": 1,
}

```

[Back](#api-integration)

### Remove Watchlist

- **Endpoint:** `/watchlist/remove`
- **Method:** `POST`
- **Description:** Removes a property from the watchlist.


#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| propertyId  | string | The properties ID  | Yes      |

#### Example Request

```json
{
  "propertyId": 1,
}
```

[Back](#api-integration)

## Add Funds Need to integrate with stripe

### Deposit Options

- **Endpoint:** `/deposit-options`
- **Method:** `GET`
- **Description:** Retrieves available deposit options for online and wire transfers.


#### Example Response

```json
[
    {
      "id": "amex",
      "name": "American Express",
      "logo": "https://via.placeholder.com/24?text=AmEx",
      "accountInfo": "Checking: *****0987",
    },
   
]
[
    {
      "id": "bankA",
      "bankName": "Pacific Premier Bank",
      "accountNumber": "****1234",
      "routingNumber": "111000025",
      "swiftCode": "BKAAUS33",
      "bankAddress": "123 Bank St, City, Country",
    },
]
```

[Back](#api-integration)

### Add Funds

- **Endpoint:** `/add-funds`
- **Method:** `POST`
- **Description:** Adds funds to user's account via selected deposit method and amount.


#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| payload   | `object` | the amount the deposite account | Yes      |

#### Example Request

```json
{
    "method": "onlineDeposit",
    "details": "amex",
    "amount": 20000,
}
```

[Back](#api-integration)

## Listings

### Listings

- **Endpoint:** `/listings`
- **Method:** `GET`
- **Description:** Retrieves property listings based on specified filters (location, price, etc.)

#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| filters   | `object` | filters such as location, price, ... | Yes      |

#### Example Request

```json
{
                "location":"Phoenix, AZ",
                "minPrice": 100,
                "maxPrice": 1000000,
                "minROI": 0,
                "maxROI": 10,
                "propertyTypes": 1,
}
```

| Property Type  | Value | Binary      |
|----------------|-------|-------------|
| Industrial     | 1     | `000000001` |
| Medical        | 2     | `000000010` |
| Hospitality    | 4     | `000000100` |
| Office         | 8     | `000001000` |
| Retail         | 16    | `000010000` |
| SingleFamily   | 32    | `000100000` |
| Multifamily    | 64    | `001000000` |
| Construction   | 128   | `010000000` |
| Land           | 256   | `100000000` |
| **Combinations** |       |             |
| Industrial + Medical      | 3    | `000000011` |
| Office + Retail           | 24   | `000011000` |
| SingleFamily + Land       | 288  | `100100000` |
| All Property Types        | 511  | `111111111` |



#### Example Response

```json
[
    {
        "propertyId": 1,
        "title": "3 Bed / 3 Bath Short Term Rental",
        "location": "4324 E Stanford Dr, Phoenix, AZ 85018",
        "realType": "SingleFamily",
        "raised": 4000,
        "raiseTarget": 90000,
        "investment": 100,
        "estimate": 835000,
        "roi": 7, 
        "imgSrc": "https://via.placeholder.com/500?text=ShortTermRental",
        "latitude": 33.5032,
        "longitude": -111.9796
    },
]
```

[Back](#api-integration)

### Listing

- **Endpoint:** `/listings/{propertyId}`
- **Method:** `GET`
- **Description:** Retrieves specific property details by ID.



#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| propertyId   | `object` | The id of the property selected | Yes      |

#### Example Request

```json
{
    "propertyID": "onlineDeposit",
}
```


#### Example Response

```json
[
  {
    "id": 1,
    "data": {
      "name": "3 Bed / 3 Bath Short Term Rental",
      "street": "4324 E Stanford Dr",
      "city": "Phoenix",
      "state": "AZ",
      "zipcode": "85018",
      "rent": 7500,
      "type": "Leased",
      "lineSummary": "3 Beds • 3 Bath • 2,600 sqft • Built in 1950 • Single Family",
      "paragraph":
        "Mid-Century Modern 1959 - Behold the epitome of sophistication and style in this beautifully maintained property...",
      "lng": -111.9796,
      "lat": 33.5032,
      "soldPercentage": 30,
      "initialSave": "false", // if the user saved the property

    },
    "initialImages": [
      "https://placehold.co/500?text=Main+Property",
      "https://placehold.co/500?text=Image1",
      "https://placehold.co/500?text=Image2",
      "https://placehold.co/500?text=Image3",
      "https://placehold.co/500?text=Image4",
    ],
    "addressCoordinates": [{ "lng": -111.9796, "lat": 33.5032 }],

    "ownershipData": {
      "blocksOwn": 200,
      "paidPrice": 11.52,
      "currentPrice": 28.5,
      "accountBalance": 10000.0,
      "title": "3 Bed / 3 Bath Short Term Rental",
      "location": "Miami, FL",
      "realType": "SingleFamily",
      "imgSrc": "https://placehold.co/200x150?text=ShortTermRental"

    },
    "investData": {
      "propertyId": 1,
      "address": "4324 E Stanford Drive",
      "pricePerBlock": 26.5,
      "accountB": 100000,
      "title": "3 Bed / 3 Bath Short Term Rental",
      "location": "4324 E Stanford Dr, Phoenix, AZ 85018",
      "realType": "SingleFamily",
      "raised": 400000,
      "raiseTarget": 900000,
      "investment": 100,
      "estimate": 835000,
      "roi": 7,
      "imgSrc": "https://placehold.co/200x150?text=ShortTermRental",
      "latitude": 33.5032,
      "longitude": -111.9796,
    },
    "documents": [
      "Operating Agreement",
      "Floor Plan",
      "Loan Agreement",
      "Series Designation",
    ],
    "cashAndFinancing": {
      "offeringBreakdown": 2000000,
      "contractPrice": 1869366,
      "cashReserve": 51442,
      "improvementCost": 121452,
      "dueDiligence": 4609,
      "acquisitionFee": 132903,
    },
    "dividendInfo": {
      "month": "April",
      "collectedRent": 7450,
      "managementFee": 100,
      "monthlyHoa": 16,
      "insurance": 126,
      "interestPayment": 500,
      "changeInCash": 1708,
      "dividend": 715,
      "SharesSoldLastMonth": 1400,
      "perShare": 0.5,
    },
    "developerInfo": {
      "name": "Real Estate-Premium Properties",
      "listingCount": 14,
      "joinedYear": 2020,
    },
  },
]
```

[Back](#api-integration)

### Document Download

- **Endpoint:** `/documents/download/:fileName`
- **Method:** `GET`
- **Description:** Downloads specified document.


#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| fineName   | `object` | The file name | Yes      |

#### Example Request

```json
{
    "fineName": "LoanAgreement.pdf",
}
```

#### Example Response

Doc

[Back](#api-integration)

### Save Listing

- **Endpoint:** `/listings/{propertyId}/save`
- **Method:** `POST`
- **Description:** Saves a property to user's saved list.



#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| propertyId   | `object` | The id of the property selected | Yes      |

#### Example Request

```json
{
    "propertyID": "onlineDeposit",
}
```

[Back](#api-integration)

### Unsave Listing

- **Endpoint:** `/listings/{propertyId}/unsave`
- **Method:** `DELETE`
- **Description:** Removes a property from user's saved list.



#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| propertyId   | `object` | The id of the property selected to delete | Yes      |

#### Example Request

```json
{
    "propertyID": "onlineDeposit",
}
```

[Back](#api-integration)

# Make Investments

### Buy Investment

- **Endpoint:** `/buyInvestments`
- **Method:** `POST`
- **Description:** Submits an investment transaction with property details.


#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| investmentData   | `object` | Data to purchase a fraction of the property | Yes      |

#### Example Request

```json
{
    "propertyID": 1,
    "amount": 3000,
    "sharePrice": 300,
    "shares": 10,
}
```

[Back](#api-integration)

###  Sell Investment

- **Endpoint:** `/sellInvestments`
- **Method:** `POST`
- **Description:** Submits a request to sell investment shares.



#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| investmentData   | `object` | Data to purchase a fraction of the property | Yes      |

#### Example Request

```json
{
    "shares": 20.7,
}
```

[Back](#api-integration)

## Profile

### Profile

- **Endpoint:** `/user/profile`
- **Method:** `GET`
- **Description:** Retrieves user profile information.

#### Example Response
```json
{
    "userName": "User",
    "dividend": 0,
    "totalFunds": 0,
    "investedPropertiesCount": 0,
    "payout": 0, 
    "payDate": "11/11/11",
    "properties": [
        {
            "propertyId": 1,
            "title": "3 Bed / 3 Bath Short Term Rental",
            "location": "4324 E Stanford Dr, Phoenix, AZ 85018",
            "realType": "SingleFamily",
            "imgSrc": "https://placehold.co/500?text=NA",
            "logoDev": "https://placehold.co/200x50?text=NA",
            "ownership": 34, // percent the user owns of the property
        },
    ],
    "activities": [
        {
            "description": "Invested in Luxury Beach House",
            "date": "12/01/24",
            "link": "/owned-listing/2",
        },
        {
            "description": "Dividend payout received",
            "date": "11/28/24",
            "link": "/account/payments",
        },
        {
            "description": "Updated profile settings",
            "date": "11/15/24",
            "link": "/Settings",
        },
    ],
}
```

[Back](#api-integration)


## Payments

### Save Scheduled Preferences


- **Endpoint:** `/payments/save-scheduled-preferences`
- **Method:** `POST`
- **Description:** Saves user scheduled payment preferences.

#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| preferences   | `object` |  | Yes      |


#### Example Request
```json
{
    "frequency": "Quarterly",
    "selectedBank": 1 // bank id need to integrate stripe
}
```

[Back](#api-integration)

### Advanced Settings


- **Endpoint:** `/payments/advanced-settings`
- **Method:** `POST`
- **Description:** Saves all advanced payment settings.


#### Example Request
```json
{
    "cap": 10000,
    "min": 1000
    "notifications":{
        "text":true,
        "email" :false,
        "calendar":false
        },
    "principalRepaymentOption":"manual_request",
}
```

[Back](#api-integration)

### Request Withdrawl


- **Endpoint:** `/payments/request-withdrawal`
- **Method:** `POST`
- **Description:** Requests a withdrawal of funds.



#### Example Request
```json
{
    "amount": 30000,
    "bank": 1,
}
```

[Back](#api-integration)

### Distribution History


- **Endpoint:** `/payments/distribution-history`
- **Method:** `GET`
- **Description:** Fetches distribution history of payments.


#### Example Response
```json
[
    {
        "date": "12/24/24",
        "type": "Scheduled",
        "amount": "$2,500",
        "status": "Pending",
        "bank": "Chase Bank",
        "last4": 1234,
    },
]
```

[Back](#api-integration)

### Payout Settings


- **Endpoint:** `/payments/payoutSettings`
- **Method:** `GET`
- **Description:** Retrieves user payout settings.


#### Example Response
```json
{
    "frequency": "Quarterly",
    "banks": [
        "Chase Bank - **** **** **** 1234",
        "Bank of America - **** **** **** 5678",
        "Wells Fargo - **** **** **** 9012",
    ],
    "ammountToWithdrawl":10000000,
    "estimatedAmount": 1000,
    "defaultCap": 10000,
    "defaultMin": 1000,
    "istext": true,
    "isEmail": false,
    "isCalender": true,
    "defaultPrincipalRepaymentOption": "manual_request",
}
```

[Back](#api-integration)

### Add Bank


- **Endpoint:** `/payments/banks`
- **Method:** `POST`
- **Description:** Adds a new bank to user's account.



#### Example Request
```json
{
    "id": 1, 
    "bank": "", 
    "last4": "" 
}
```

[Back](#api-integration)

### Edit Bank


- **Endpoint:** `/payments/banks/{id}`
- **Method:** `PUT`
- **Description:** Edits an existing bank's details.


#### Example Request
```json
{
    "id": 1, 
}
{
    "bank": "", 
    "last4": "" 
}
```

[Back](#api-integration)


### Delete Bank


- **Endpoint:** `/payments/banks/{id}`
- **Method:** `DELETE`
- **Description:** Deletes a bank from user's account.



#### Example Response
```json
{
    "id": 1, 
}
```

[Back](#api-integration)


### Set Primary Bank


- **Endpoint:** `/payments/banks/{id}/set-primary`
- **Method:** `POST`
- **Description:** Sets a bank as the primary bank.


#### Example request
```json
{
    "id": 1, 
}
```

[Back](#api-integration)

## Contact and Security

### Contact Details

- **Endpoint:** `/contactDetails`
- **Method:** `GET`
- **Description:** Fetches user's contact details.



#### Example Response
```json
{
    "phone": "123-456-7890",
    "streetAddress": "123 Main St",
    "unitNumber": "Apt 1",
    "city": "Fallback City",
    "state": "Fallback State",
    "zipCode": "12345",
  }
```

[Back](#api-integration)

### Update Contact Details

- **Endpoint:** `/contactDetails`
- **Method:** `PUT`
- **Description:** Updates user's contact details.

#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| details   | `object` | user's updated contact details | Yes      |

#### Example Request
```json
{
    "phone": "123-456-7890",
    "streetAddress": "123 Main St",
    "unitNumber": "Apt 1",
    "city": "Fallback City",
    "state": "Fallback State",
    "zipCode": "12345",
}
```

[Back](#api-integration)

### Update Password

- **Endpoint:** `/update-password`
- **Method:** `POST`
- **Description:** Updates user's password.

#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| oldPassword   | `string` | Encrypted current password of the user. | Yes      |
| newPassword   | `string` | Encrypted new password to be set.	 | Yes      |

#### Example Request
```json
{
    "oldPassword" : "U2FsdGVkX1+5m9k3LkZ4VQ==",
    "newPassword" : "U2FsdGVkX19a3l2pZ5P7RQ=="
}
```

[Back](#api-integration)

### Deactivate Accouont

- **Endpoint:** `/deactivate-account`
- **Method:** `POST`
- **Description:** Deactivates user's account.


#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| password   | `string` | Encrypted current password of the user. | Yes      |

#### Example Request
```json
{
    "password" : "U2FsdGVkX1+5m9k3LkZ4VQ==",
}
```

[Back](#api-integration)

### User Details

- **Endpoint:** `/userDetails`
- **Method:** `GET`
- **Description:** Retrieves user's identity details.


#### Example Response
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "dob": "1990-01-01",
    "ssn": "XXX-XX-XXXX",
    "validIdNum": "123456789",
    "entityName": "Real Estate Dev Corp.",
    "ein": "00-0000000",
  }
```

[Back](#api-integration)

## Notifications

### Notification History

- **Endpoint:** `/notifications-history`
- **Method:** `GET`
- **Description:** Fetches history of user notifications.


#### Example Response
```json
[
  {
    "id": 1,
    "date": "12/24/24",
    "time": "2:30 pm",
    "notification": "Investment Update: Your portfolio increased by 5%.",
  },
]
```

[Back](#api-integration)


### Notification Preferences

- **Endpoint:** `/notifications`
- **Method:** `GET`
- **Description:** Retrieves user's notification preferences.


#### Example Response // need to fix 
```json
[
  {
    "id": 1,
    "title": "Email Notifications",
    "description": "Receive notifications via email.",
    "isOn": true,
  },
]
```

[Back](#api-integration)

### Save Notification

- **Endpoint:** `/save-notifications`
- **Method:** `POST`
- **Description:** Saves user notification preferences.

#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| notifications   | `Array/Object` | Users updated notifications | Yes      |

#### Example Request
```json
[
    {
        "id": 1,
        "title": "Email Notifications",
        "description": "Receive notifications via email.",
        "isOn": true,
    },
]
```

[Back](#api-integration)


### Standard Notification

- **Endpoint:** `/standard-notifications`
- **Method:** `GET`
- **Description:** Retrieves user's standard notification preferences.


#### Example Response
```json
[
  {
    "id": 1,
    "title": "Investment Updates",
    "description": "Receive updates about your investments.",
    "isOn": true,
  },
]
```

[Back](#api-integration)


### Save Standard Notification

- **Endpoint:** `/save-standard-notifications`
- **Method:** `POST`
- **Description:** Saves user standard notification preferences.


#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| notifications   | `Array/Object` | Users updated notifications | Yes      |

#### Example Request
```json
[
  {
    "id": 1,
    "title": "Investment Updates",
    "description": "Receive updates about your investments.",
    "isOn": true,
  },
]
```

[Back](#api-integration)

## Investment Preferences

### Investment Preferences

- **Endpoint:** `/investment-preferences`
- **Method:** `GET`
- **Description:** Retrieves user's investment preferences.

#### Example Response

```json
{
    "sliderValue": 3,
    "investmentAmount": "100000",
    "locations": [],
    "selectionData": 
    {
      "commercial": ["Office", "Retail"],
      "residential": ["Single-Family", "Multi-Family"],
      "timeHorizon": ["Short-Term Investors"],
    }
}
```

[Back](#api-integration)


### Save Investment Preferences

- **Endpoint:** `/save-investment-preferences`
- **Method:** `POST`
- **Description:** Saves user updated investor preferences.

#### Request Parameters

| Parameter | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| preferences   | `Array/Object` | Users updated preferences | Yes      |

#### Example Request
```json
{
    "sliderValue": 3,
    "investmentAmount": "100000",
    "locations": [],
    "selectionData": 
    {
      "commercial": ["Office", "Retail"],
      "residential": ["Single-Family", "Multi-Family"],
      "timeHorizon": ["Short-Term Investors"],
    }
}
```

[Back](#api-integration)

## User Activity

### Login Activity

- **Endpoint:** `/login-activity`
- **Method:** `GET`
- **Description:** Fetches user's login activity


#### Example Response

```json
[
  {
    "id": 1,
    "dateTime": "2024-11-25 14:32:00",
    "device": "Chrome - Windows 10",
    "location": "New York, USA",
    "ipAddress": "192.168.1.1",
    "status": "Successful",
    "logoutTime": "2024-11-25 16:00:00",
  },
]
```

[Back](#api-integration)


## Styling with Tailwind CSS

- Utility-First: Leverage Tailwind’s utility classes directly in JSX for rapid UI building.
- Customization: Extend the Tailwind config (`tailwind.config.js`) to add custom color palettes, fonts, or spacing as needed.
- Responsive Design: Uses Tailwind’s responsive classes to ensure the application looks great on all devices.
- Dark Mode Support: Easily toggled through Tailwind’s `dark` mode feature. (started to implement)

---

## Future Enhancements

- Testing: Planing to Integrate Jest or React Testing Library for robust unit and integration tests.
- Performance Optimization: Introduce code splitting, memoization, lazy loading, pagination,  and caching strategies.
- Internationalization (i18n): Add support for multiple languages.
- Design System: Formalize a design system or component library for greater consistency. 
- Need to Add More Documentation
- Need to fix the PaymentPayoutScreen and integrate stripe

---