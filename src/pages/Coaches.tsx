
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { getCoaches, Coach } from '../services/coachService';
import Layout from '../components/layout/Layout';
import { toast } from 'sonner';

const Coaches: React.FC = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const data = await getCoaches();
        setCoaches(data);
      } catch (error) {
        console.error('Failed to fetch coaches:', error);
        toast.error('Failed to load coaches. Please try again later.');
        // For demo purposes, let's provide some mock data if API fails
        setCoaches([
          {
            id: '1',
            name: 'James Peterson',
            position: 'Head Coach',
            experience: 15,
            nationality: 'South Africa',
            bio: 'Former professional player with extensive coaching experience across multiple leagues.',
            imageUrl: 'https://images.unsplash.com/photo-1553867745-6e038d085e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            qualifications: ['UEFA Pro License', 'Sports Science Degree']
          },
          {
            id: '2',
            name: 'Sarah Johnson',
            position: 'Assistant Coach',
            experience: 8,
            nationality: 'South Africa',
            bio: 'Specializes in player development and tactical analysis.',
            imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            qualifications: ['UEFA A License', 'Performance Analysis Certificate']
          },
          {
            id: '3',
            name: 'Robert Khumalo',
            position: 'Goalkeeper Coach',
            experience: 10,
            nationality: 'South Africa',
            bio: 'Former national team goalkeeper with specialized training in modern goalkeeping techniques.',
            imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            qualifications: ['Goalkeeper Coaching License', 'Sports Psychology Diploma']
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  return (
    <Layout>
      <div className="club-container py-12">
        <h1 className="text-3xl font-bold text-club-green mb-8 text-center">Our Coaching Staff</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-club-green"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map(coach => (
              <Link to={`/coaches/${coach.id}`} key={coach.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={coach.imageUrl} 
                      alt={coach.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105" 
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-club-green mb-1">{coach.name}</h3>
                    <p className="text-lg font-medium mb-3">{coach.position}</p>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <p>Experience: {coach.experience} years</p>
                      <p>{coach.nationality}</p>
                    </div>
                    <p className="text-gray-700 line-clamp-3">{coach.bio}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
        
        {!isLoading && coaches.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600">No coaches found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Coaches;
