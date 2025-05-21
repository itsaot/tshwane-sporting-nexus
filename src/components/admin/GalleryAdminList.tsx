
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GalleryItem, getGalleryItems, deleteGalleryItem } from '../../services/galleryService';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const GalleryAdminList: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const data = await getGalleryItems();
        setGalleryItems(data);
      } catch (error) {
        console.error('Failed to fetch gallery items:', error);
        toast.error('Failed to load gallery items. Please try again later.');
        // For demo purposes, let's provide some mock data if API fails
        setGalleryItems([
          {
            id: '1',
            title: 'Match against Blue Eagles FC',
            description: 'Key moments from our victory against Blue Eagles FC',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            event: 'League Match',
            date: '2023-05-15'
          },
          {
            id: '2',
            title: 'Training Session',
            description: 'Our team during an intensive training session',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            event: 'Training',
            date: '2023-04-20'
          },
          {
            id: '4',
            title: 'Coach Interview',
            description: 'Interview with our head coach about season strategy',
            type: 'video',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumbnailUrl: 'https://images.unsplash.com/photo-1553867745-6e038d085e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            event: 'Interviews',
            date: '2023-03-25'
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  const handleDeleteGalleryItem = async (id: string) => {
    try {
      await deleteGalleryItem(id);
      setGalleryItems(galleryItems.filter(item => item.id !== id));
      toast.success('Gallery item deleted successfully');
    } catch (error) {
      console.error('Failed to delete gallery item:', error);
      toast.error('Failed to delete gallery item. Please try again.');
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
        <h2 className="text-2xl font-bold">Manage Gallery</h2>
        <Link to="/admin/gallery/add">
          <Button className="bg-club-green hover:bg-green-700">
            Add New Media
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Media
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {galleryItems.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex-shrink-0 h-14 w-20">
                    <img 
                      className="h-14 w-20 rounded object-cover" 
                      src={item.type === 'image' ? item.url : (item.thumbnailUrl || item.url)} 
                      alt={item.title} 
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={item.type === 'image' ? 'outline' : 'secondary'}>
                    {item.type === 'image' ? 'Image' : 'Video'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.event}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link to={`/admin/gallery/edit/${item.id}`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteGalleryItem(item.id)}
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

export default GalleryAdminList;
