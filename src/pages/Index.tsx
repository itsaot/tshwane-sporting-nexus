
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the Home component
    navigate('/');
  }, [navigate]);

  return null; // This component just redirects, so no rendering needed
};

export default Index;
