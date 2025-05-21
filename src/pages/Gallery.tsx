
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { getGalleryItems, GalleryItem } from '../services/galleryService';
import Layout from '../components/layout/Layout';
import { toast } from 'sonner';

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const data = await getGalleryItems();
        setGalleryItems(data);
      } catch (error) {
        console.error('Failed to fetch gallery items:', error);
        toast.error('Failed to load gallery. Please try again later.');
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
            id: '3',
            title: 'Cup Final Celebration',
            description: 'Team celebrating after winning the local cup',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            event: 'Cup Final',
            date: '2023-06-10'
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
          {
            id: '5',
            title: 'Season Highlights',
            description: 'Best moments from the 2022-2023 season',
            type: 'video',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumbnailUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            event: 'Highlights',
            date: '2023-07-05'
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Filter by type (all, images, videos)
  const filteredByType = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.type === filter);

  // Further filter by event if selected
  const filteredItems = selectedEvent
    ? filteredByType.filter(item => item.event === selectedEvent)
    : filteredByType;

  // Get unique events for filter
  const events = Array.from(new Set(galleryItems.map(item => item.event)));

  return (
    <Layout>
      <div className="club-container py-12">
        <h1 className="text-3xl font-bold text-club-green mb-8 text-center">Gallery</h1>

        <Tabs defaultValue="all" className="mb-8" onValueChange={(value) => setFilter(value as 'all' | 'image' | 'video')}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Event Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">Filter by Event:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedEvent(null)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedEvent === null 
                  ? 'bg-club-green text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              All Events
            </button>
            {events.map(event => (
              <button
                key={event}
                onClick={() => setSelectedEvent(event)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedEvent === event 
                    ? 'bg-club-green text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {event}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-club-green"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative pb-[56.25%]">
                      <img 
                        src={item.type === 'image' ? item.url : (item.thumbnailUrl || item.url)} 
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover" 
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-50 rounded-full p-4">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"></path>
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-club-green mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.event} • {new Date(item.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-700 line-clamp-2">{item.description}</p>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full">
                  {item.type === 'image' ? (
                    <div>
                      <img 
                        src={item.url} 
                        alt={item.title}
                        className="w-full h-auto max-h-[70vh] object-contain" 
                      />
                      <div className="mt-4">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-gray-600 mb-2">{item.event} • {new Date(item.date).toLocaleDateString()}</p>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="aspect-video">
                        <iframe 
                          src={item.url} 
                          title={item.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-gray-600 mb-2">{item.event} • {new Date(item.date).toLocaleDateString()}</p>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
        
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600">No gallery items found for the selected filters.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
