
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamCard from '@/components/TeamCard';
import { teams } from '@/data/mockData';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

const Teams = () => {
  const [sortBy, setSortBy] = useState<'name' | 'points' | 'matches'>('points');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSortChange = (value: 'name' | 'points' | 'matches') => {
    if (sortBy === value) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(value);
      setSortOrder('desc');
    }
  };
  
  const sortedTeams = [...teams].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'points') {
      return sortOrder === 'asc' ? a.points - b.points : b.points - a.points;
    } else {
      return sortOrder === 'asc' ? a.matches - b.matches : b.matches - a.matches;
    }
  });
  
  const filteredTeams = sortedTeams.filter(
    team => team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-lg mb-4">Tournament Teams</h1>
              <p className="text-lg opacity-90">
                Explore all the teams participating in the cricket tournament
              </p>
            </div>
          </div>
          <div className="h-16 bg-gradient-to-b from-blue-800/0 to-gray-50"></div>
        </section>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search teams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500 flex items-center">
                    <Filter size={16} className="mr-1" />
                    Sort by:
                  </div>
                  
                  <button
                    onClick={() => handleSortChange('name')}
                    className={`flex items-center px-3 py-1.5 rounded text-sm font-medium ${
                      sortBy === 'name' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Name
                    {sortBy === 'name' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleSortChange('points')}
                    className={`flex items-center px-3 py-1.5 rounded text-sm font-medium ${
                      sortBy === 'points' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Points
                    {sortBy === 'points' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleSortChange('matches')}
                    className={`flex items-center px-3 py-1.5 rounded text-sm font-medium ${
                      sortBy === 'matches' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Matches
                    {sortBy === 'matches' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {filteredTeams.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No teams found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTeams.map((team) => (
                  <TeamCard key={team.id} team={team} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Teams;
