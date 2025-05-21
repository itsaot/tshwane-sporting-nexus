
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '../components/layout/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div 
          className="absolute inset-0 opacity-50 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')" 
          }}
        ></div>
        <div className="relative club-container py-20 md:py-32 flex flex-col items-center justify-center text-center">
          <img 
            src="/lovable-uploads/ecb1e5c0-0e98-4b54-a5ac-e3889130ddaa.png" 
            alt="Tshwane Sporting FC Logo" 
            className="h-28 w-28 mb-6"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Tshwane Sporting FC</h1>
          <p className="text-xl md:text-2xl mb-8">The Cyclones - Football Excellence Since 2021</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/players">
              <Button className="bg-club-green hover:bg-green-700 text-white px-6 py-3 text-lg">
                Meet Our Players
              </Button>
            </Link>
            <Link to="/gallery">
              <Button variant="outline" className="border-2 border-club-gold text-club-gold hover:bg-club-gold hover:text-black px-6 py-3 text-lg">
                View Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-white">
        <div className="club-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-club-green mb-2">Welcome to Our Club</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tshwane Sporting FC is more than just a football club. We are a community dedicated to excellence, 
              sportsmanship, and developing the next generation of football stars.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-club-green mb-3">Our Team</h3>
              <p className="text-gray-700 mb-4">
                Meet our talented players and dedicated coaching staff who work tirelessly to achieve success on and off the pitch.
              </p>
              <Link to="/players" className="text-club-green hover:underline font-medium">
                Meet the Players →
              </Link>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-club-green mb-3">Our Coaches</h3>
              <p className="text-gray-700 mb-4">
                Our experienced coaching team brings years of professional knowledge and a passion for developing talented players.
              </p>
              <Link to="/coaches" className="text-club-green hover:underline font-medium">
                Meet the Coaches →
              </Link>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-club-green mb-3">Our Gallery</h3>
              <p className="text-gray-700 mb-4">
                Experience the excitement of our matches, training sessions, and special events through our photo and video gallery.
              </p>
              <Link to="/gallery" className="text-club-green hover:underline font-medium">
                Visit Gallery →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="club-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <p className="text-4xl font-bold text-club-green mb-2">20+</p>
              <p className="text-gray-600">Players</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-club-green mb-2">5+</p>
              <p className="text-gray-600">Coaches</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-club-green mb-2">15+</p>
              <p className="text-gray-600">Matches</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-club-green mb-2">2+</p>
              <p className="text-gray-600">Trophies</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-club-green text-white">
        <div className="club-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Sign up for an account to stay updated with the latest news, match schedules, and exclusive content.
          </p>
          <Link to="/register">
            <Button className="bg-club-gold text-club-black hover:bg-yellow-400 px-6 py-3 text-lg">
              Create an Account
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
