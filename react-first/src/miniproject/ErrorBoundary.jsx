import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          {error.status === 404 ? 'Page Not Found' : 'Oops! Something went wrong'}
        </h1>
        <p className="text-gray-600 mb-6">
          {error.status === 404
            ? "The page you're looking for doesn't exist or has been moved."
            : 'We encountered an unexpected error. Please try again later.'}
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Go to Home
          </Link>
          <Link
            to="/activities"
            className="block w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            Browse Games
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;