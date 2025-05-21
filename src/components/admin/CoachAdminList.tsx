
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coach, getCoaches, deleteCoach } from '../../services/coachService';
import { toast } from 'sonner';

const CoachAdminList: React.FC = () => {
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
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  const handleDeleteCoach = async (id: string) => {
    try {
      await deleteCoach(id);
      setCoaches(coaches.filter(coach => coach.id !== id));
      toast.success('Coach deleted successfully');
    } catch (error) {
      console.error('Failed to delete coach:', error);
      toast.error('Failed to delete coach. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-club-green"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Coaches</h2>
        <Link to="/admin/coaches/add">
          <Button className="bg-club-green hover:bg-green-700">
            Add New Coach
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coach
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nationality
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coaches.map(coach => (
              <tr key={coach.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img 
                        className="h-10 w-10 rounded-full object-cover" 
                        src={coach.imageUrl} 
                        alt={coach.name} 
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{coach.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {coach.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {coach.experience} years
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {coach.nationality}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link to={`/admin/coaches/edit/${coach.id}`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteCoach(coach.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoachAdminList;
