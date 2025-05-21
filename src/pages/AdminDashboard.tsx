
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import Layout from '../components/layout/Layout';
import { toast } from 'sonner';
import { Player } from '../services/playerService';
import { Coach } from '../services/coachService';
import { GalleryItem } from '../services/galleryService';
import PlayerAdminList from '../components/admin/PlayerAdminList';
import CoachAdminList from '../components/admin/CoachAdminList';
import GalleryAdminList from '../components/admin/GalleryAdminList';

const AdminDashboard: React.FC = () => {
  return (
    <Layout>
      <div className="club-container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-club-green">Admin Dashboard</h1>
          <Button 
            className="bg-club-green hover:bg-green-700" 
            onClick={() => toast.success('Changes saved successfully')}
          >
            Save Changes
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Players</CardTitle>
              <CardDescription>Manage team players</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">20</p>
            </CardContent>
            <CardFooter>
              <Link to="/admin/players/add">
                <Button variant="outline">Add New Player</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Coaches</CardTitle>
              <CardDescription>Manage coaching staff</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
            </CardContent>
            <CardFooter>
              <Link to="/admin/coaches/add">
                <Button variant="outline">Add New Coach</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Gallery</CardTitle>
              <CardDescription>Manage media content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">15</p>
            </CardContent>
            <CardFooter>
              <Link to="/admin/gallery/add">
                <Button variant="outline">Add New Media</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        <Tabs defaultValue="players" className="mt-6">
          <TabsList className="grid grid-cols-3 w-[400px]">
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="coaches">Coaches</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="players" className="mt-6">
            <PlayerAdminList />
          </TabsContent>
          
          <TabsContent value="coaches" className="mt-6">
            <CoachAdminList />
          </TabsContent>
          
          <TabsContent value="gallery" className="mt-6">
            <GalleryAdminList />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
