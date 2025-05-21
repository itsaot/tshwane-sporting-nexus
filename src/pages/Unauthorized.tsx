
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '../components/layout/Layout';

const Unauthorized: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-xl text-gray-700 mb-8">
            You don't have permission to access this page.
          </p>
          <Link to="/">
            <Button className="bg-club-green hover:bg-green-700">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Unauthorized;
