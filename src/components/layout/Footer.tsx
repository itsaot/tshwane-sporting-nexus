
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-club-green text-white">
      <div className="club-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/ecb1e5c0-0e98-4b54-a5ac-e3889130ddaa.png" 
                alt="Tshwane Sporting FC Logo" 
                className="h-12 w-12" 
              />
              <span className="ml-2 text-xl font-bold">Tshwane Sporting FC</span>
            </div>
            <p className="text-sm">
              The Cyclones - Football Excellence Since 2021
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-club-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-club-gold transition-colors">Home</Link></li>
              <li><Link to="/players" className="hover:text-club-gold transition-colors">Players</Link></li>
              <li><Link to="/coaches" className="hover:text-club-gold transition-colors">Coaches</Link></li>
              <li><Link to="/gallery" className="hover:text-club-gold transition-colors">Gallery</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-club-gold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@tshwanesporting.co.za</li>
              <li>Phone: +27 12 345 6789</li>
              <li>Address: Tshwane Stadium, Pretoria, South Africa</li>
            </ul>
            <div className="mt-4 flex space-x-3">
              {/* Social Media Icons */}
              <a href="#" className="hover:text-club-gold transition-colors">Facebook</a>
              <a href="#" className="hover:text-club-gold transition-colors">Twitter</a>
              <a href="#" className="hover:text-club-gold transition-colors">Instagram</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {currentYear} Tshwane Sporting FC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
