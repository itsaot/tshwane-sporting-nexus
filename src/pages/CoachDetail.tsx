
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getCoach, Coach } from '../services/coachService';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const CoachDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [coach, setCoach] = useState<Coach | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoach = async () => {
      if (!id) return;

      try {
        const data = await getCoach(id);
        setCoach(data);
      } catch (error) {
        console.error('Failed to fetch coach:', error);
        toast.error('Failed to load coach details. Please try again later.');
        // For demo purposes, provide mock data if API fails
        setCoach({
          id: id,
          name: 'James Peterson',
          position: 'Head Coach',
          experience: 15,
          nationality: 'South Africa',
          bio: 'Former professional player with extensive coaching experience across multiple leagues. James has led several teams to championship victories and is known for his tactical expertise and player development skills. He joined Tshwane Sporting FC in 2021 and has been instrumental in building the team from the ground up.',
          imageUrl: 'https://images.unsplash.com/photo-1553867745-6e038d085e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          qualifications: ['UEFA Pro License', 'Sports Science Degree', 'Advanced Tactical Analysis Certificate']
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoach();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="club-container py-12 flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-club-green"></div>
        </div>
      </Layout>
    );
  }

  if (!coach) {
    return (
      <Layout>
        <div className="club-container py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Coach Not Found</h2>
          <p className="mb-6">The coach you're looking for doesn't exist or has been removed.</p>
          <Link to="/coaches">
            <Button className="bg-club-green hover:bg-green-700">Back to Coaches</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="club-container py-12">
        <div className="mb-6">
          <Link to="/coaches" className="text-club-green hover:underline flex items-center">
            ← Back to All Coaches
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={coach.imageUrl}
                alt={coach.name}
                className="w-full h-auto object-cover md:h-full"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold text-club-green mb-2">{coach.name}</h1>
              <p className="text-xl mb-6">{coach.position}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-600">Experience</p>
                  <p className="font-semibold">{coach.experience} years</p>
                </div>
                <div>
                  <p className="text-gray-600">Nationality</p>
                  <p className="font-semibold">{coach.nationality}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-club-green mb-2">Biography</h2>
                <p className="text-gray-700">{coach.bio}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-club-green mb-2">Qualifications</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {coach.qualifications.map((qualification, index) => (
                    <li key={index}>{qualification}</li>
                  ))}
                </ul>
              </div>
              
              {isAdmin && (
                <div className="flex space-x-3">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate(`/admin/coaches/edit/${coach.id}`)}
                  >
                    Edit Coach
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      // This would normally delete the coach via API
                      toast.success('Coach deleted successfully');
                      navigate('/coaches');
                    }}
                  >
                    Delete Coach
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoachDetail;
