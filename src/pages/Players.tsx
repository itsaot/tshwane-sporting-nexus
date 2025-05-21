
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { getPlayers, Player } from '../services/playerService';
import Layout from '../components/layout/Layout';
import { toast } from 'sonner';

const Players: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getPlayers();
        setPlayers(data);
      } catch (error) {
        console.error('Failed to fetch players:', error);
        toast.error('Failed to load players. Please try again later.');
        // For demo purposes, let's provide some mock data if API fails
        setPlayers([
          {
            id: '1',
            name: 'John Smith',
            position: 'Goalkeeper',
            jerseyNumber: 1,
            age: 28,
            height: '6\'2"',
            weight: '90kg',
            nationality: 'South Africa',
            bio: 'Team captain with exceptional leadership skills.',
            imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: '2',
            name: 'David Mabaso',
            position: 'Defender',
            jerseyNumber: 4,
            age: 25,
            height: '6\'0"',
            weight: '85kg',
            nationality: 'South Africa',
            bio: 'Strong defensive skills and excellent at set pieces.',
            imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: '3',
            name: 'Michael Dlamini',
            position: 'Midfielder',
            jerseyNumber: 8,
            age: 23,
            height: '5\'10"',
            weight: '75kg',
            nationality: 'South Africa',
            bio: 'Creative playmaker with exceptional vision.',
            imageUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: '4',
            name: 'Samuel Nkosi',
            position: 'Forward',
            jerseyNumber: 10,
            age: 22,
            height: '5\'11"',
            weight: '78kg',
            nationality: 'South Africa',
            bio: 'Top scorer with lightning pace and clinical finishing.',
            imageUrl: 'https://images.unsplash.com/photo-1583933748039-3c5d32d0b87f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Filter players by position if a position is selected
  const filteredPlayers = selectedPosition
    ? players.filter(player => player.position === selectedPosition)
    : players;

  // Get unique positions for filter
  const positions = Array.from(new Set(players.map(player => player.position)));

  return (
    <Layout>
      <div className="club-container py-12">
        <h1 className="text-3xl font-bold text-club-green mb-8 text-center">Our Players</h1>
        
        {/* Position Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">Filter by Position:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedPosition(null)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedPosition === null 
                  ? 'bg-club-green text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {positions.map(position => (
              <button
                key={position}
                onClick={() => setSelectedPosition(position)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedPosition === position 
                    ? 'bg-club-green text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {position}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-club-green"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map(player => (
              <Link to={`/players/${player.id}`} key={player.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="relative pb-[130%]">
                    <img 
                      src={player.imageUrl} 
                      alt={player.name}
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-lg">{player.name}</h3>
                          <p>{player.position}</p>
                        </div>
                        <div className="bg-club-green rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          {player.jerseyNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <p>Age: {player.age}</p>
                      <p>{player.nationality}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
        
        {!isLoading && filteredPlayers.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600">No players found for this position.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Players;
