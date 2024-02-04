## Getting Started

### Prerequisites

Before you begin, make sure you have the following software installed:

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/news-portal.git

   npm install


The application will be available at http://localhost:3000.

## Run the server

npm run dev

## Features
User authentication (Login and Signup)
View top business headlines
Protected routes for authenticated users
Session-based authentication using localStorage
Server-side rendering (SSR) with Next.js

## Project Structure
/pages: Next.js pages and API routes
/components: Reusable React components
/styles: Global styles and CSS modules
/utils: Utility functions and API integration
/data: JSON files for storing user data
/api:for create aapi for logina dn signup

## Technologies Used
Next.js
React
Material-UI

Authentication
User authentication is implemented using a session-based approach. The withAuth higher-order component (HOC) protects routes that require authentication.

## api for login and signup
/api/login and /api/signup
These endpoints handle user authentication:

Login: The POST request to /api/login compares the provided credentials with stored user data. If the credentials match, the server responds with a success message.
Signup: The POST request to /api/signup checks if the username already exists. If not, it hashes the password and adds the new user to the data. The server responds with a success message.
API Implementation (example: /pages/api/login.ts and /pages/api/signup.ts)
These files utilize the fs/promises, path, bcrypt, and NextApiRequest and NextApiResponse from Next.js to handle authentication.

## Authentication
Session-Based Authentication: User authentication is session-based. When a user logs in, the server sets an isLoggedIn flag in the localStorage. This flag is checked during the rendering of protected routes to determine if a user is authenticated.

withAuth Higher-Order Component (HOC): The withAuth HOC is used to protect routes that require authentication. It checks the isLoggedIn flag and redirects the user to the login page if not authenticated.

## Reusable Components
Button Component (/component/Button/Button.tsx):

Purpose: A reusable button component.
Props:
children: ReactNode - Content inside the button.
...props: Additional props forwarded to the underlying MuiButton

TextInput Component (/components/TextInput.tsx):

Purpose: A reusable text input component.
Props:
label: string - Input label.
...props: Additional props forwarded to the underlying TextField.


These reusable components enhance code maintainability and readability by encapsulating specific functionalities. They can be easily integrated into different parts of your application.