
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-club-green text-white sticky top-0 z-50 shadow-md">
      <div className="club-container flex justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/ecb1e5c0-0e98-4b54-a5ac-e3889130ddaa.png" 
              alt="Tshwane Sporting FC Logo" 
              className="h-12 w-12"
            />
            <span className="ml-2 text-xl font-bold">Tshwane Sporting FC</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              isActive ? "border-b-2 border-club-gold font-bold" : "hover:text-club-gold"
            }
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/players" 
            className={({isActive}) => 
              isActive ? "border-b-2 border-club-gold font-bold" : "hover:text-club-gold"
            }
          >
            Players
          </NavLink>
          <NavLink 
            to="/coaches" 
            className={({isActive}) => 
              isActive ? "border-b-2 border-club-gold font-bold" : "hover:text-club-gold"
            }
          >
            Coaches
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({isActive}) => 
              isActive ? "border-b-2 border-club-gold font-bold" : "hover:text-club-gold"
            }
          >
            Gallery
          </NavLink>
          {isAdmin && (
            <NavLink 
              to="/admin" 
              className={({isActive}) => 
                isActive ? "border-b-2 border-club-gold font-bold" : "hover:text-club-gold"
              }
            >
              Admin
            </NavLink>
          )}

          {isLoggedIn ? (
            <Button 
              variant="outline" 
              className="bg-transparent border border-white text-white hover:bg-white hover:text-club-green"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button 
                variant="outline" 
                className="bg-transparent border border-white text-white hover:bg-white hover:text-club-green"
              >
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-club-green border-t border-green-700 animate-fade-in">
          <div className="club-container py-4 space-y-3">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                isActive ? "block py-2 px-4 bg-green-700 rounded-md" : "block py-2 px-4 hover:bg-green-700 rounded-md"
              }
              onClick={toggleMenu}
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/players" 
              className={({isActive}) => 
                isActive ? "block py-2 px-4 bg-green-700 rounded-md" : "block py-2 px-4 hover:bg-green-700 rounded-md"
              }
              onClick={toggleMenu}
            >
              Players
            </NavLink>
            <NavLink 
              to="/coaches" 
              className={({isActive}) => 
                isActive ? "block py-2 px-4 bg-green-700 rounded-md" : "block py-2 px-4 hover:bg-green-700 rounded-md"
              }
              onClick={toggleMenu}
            >
              Coaches
            </NavLink>
            <NavLink 
              to="/gallery" 
              className={({isActive}) => 
                isActive ? "block py-2 px-4 bg-green-700 rounded-md" : "block py-2 px-4 hover:bg-green-700 rounded-md"
              }
              onClick={toggleMenu}
            >
              Gallery
            </NavLink>
            {isAdmin && (
              <NavLink 
                to="/admin" 
                className={({isActive}) => 
                  isActive ? "block py-2 px-4 bg-green-700 rounded-md" : "block py-2 px-4 hover:bg-green-700 rounded-md"
                }
                onClick={toggleMenu}
              >
                Admin
              </NavLink>
            )}

            {isLoggedIn ? (
              <button 
                onClick={() => { logout(); toggleMenu(); }} 
                className="block w-full text-left py-2 px-4 hover:bg-green-700 rounded-md"
              >
                <LogOut className="inline-block mr-2 h-4 w-4" />
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={toggleMenu} className="block py-2 px-4 hover:bg-green-700 rounded-md">
                <User className="inline-block mr-2 h-4 w-4" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
