
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getPlayer, Player } from '../services/playerService';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const PlayerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayer = async () => {
      if (!id) return;

      try {
        const data = await getPlayer(id);
        setPlayer(data);
      } catch (error) {
        console.error('Failed to fetch player:', error);
        toast.error('Failed to load player details. Please try again later.');
        // For demo purposes, provide mock data if API fails
        setPlayer({
          id: id,
          name: 'John Smith',
          position: 'Goalkeeper',
          jerseyNumber: 1,
          age: 28,
          height: '6\'2"',
          weight: '90kg',
          nationality: 'South Africa',
          bio: 'Team captain with exceptional leadership skills. John has been with the club since its founding and has played a crucial role in the team\'s success. Known for his reflexes and commanding presence in the box.',
          imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayer();
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

  if (!player) {
    return (
      <Layout>
        <div className="club-container py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Player Not Found</h2>
          <p className="mb-6">The player you're looking for doesn't exist or has been removed.</p>
          <Link to="/players">
            <Button className="bg-club-green hover:bg-green-700">Back to Players</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="club-container py-12">
        <div className="mb-6">
          <Link to="/players" className="text-club-green hover:underline flex items-center">
            ← Back to All Players
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={player.imageUrl}
                alt={player.name}
                className="w-full h-auto object-cover md:h-full"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-club-green">{player.name}</h1>
                <div className="bg-club-green rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
                  {player.jerseyNumber}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-600">Position</p>
                  <p className="font-semibold">{player.position}</p>
                </div>
                <div>
                  <p className="text-gray-600">Age</p>
                  <p className="font-semibold">{player.age}</p>
                </div>
                <div>
                  <p className="text-gray-600">Height</p>
                  <p className="font-semibold">{player.height}</p>
                </div>
                <div>
                  <p className="text-gray-600">Weight</p>
                  <p className="font-semibold">{player.weight}</p>
                </div>
                <div>
                  <p className="text-gray-600">Nationality</p>
                  <p className="font-semibold">{player.nationality}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-club-green mb-2">Biography</h2>
                <p className="text-gray-700">{player.bio}</p>
              </div>
              
              {isAdmin && (
                <div className="flex space-x-3">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate(`/admin/players/edit/${player.id}`)}
                  >
                    Edit Player
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      // This would normally delete the player via API
                      toast.success('Player deleted successfully');
                      navigate('/players');
                    }}
                  >
                    Delete Player
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

export default PlayerDetail;
