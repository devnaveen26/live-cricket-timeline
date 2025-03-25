
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MatchCard from '@/components/MatchCard';
import { 
  Match, 
  matches, 
  teams, 
  getTeamById 
} from '@/data/mockData';
import { Search, Filter, Calendar, Clock, MapPin } from 'lucide-react';

const Schedule = () => {
  const [filteredMatches, setFilteredMatches] = useState<Match[]>(matches);
  const [selectedTeam, setSelectedTeam] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'upcoming' | 'completed' | 'live'>('all');
  const [selectedVenue, setSelectedVenue] = useState<string | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get unique venues
  const venues = [...new Set(matches.map(match => match.venue))];
  
  useEffect(() => {
    let filtered = [...matches];
    
    // Filter by team
    if (selectedTeam !== 'all') {
      filtered = filtered.filter(
        match => match.team1Id === selectedTeam || match.team2Id === selectedTeam
      );
    }
    
    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(match => match.status === selectedStatus);
    }
    
    // Filter by venue
    if (selectedVenue !== 'all') {
      filtered = filtered.filter(match => match.venue === selectedVenue);
    }
    
    // Filter by search term (team names)
    if (searchTerm) {
      filtered = filtered.filter(match => {
        const team1 = getTeamById(match.team1Id);
        const team2 = getTeamById(match.team2Id);
        
        return (
          team1?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team2?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    
    setFilteredMatches(filtered);
  }, [selectedTeam, selectedStatus, selectedVenue, searchTerm]);
  
  // Group matches by date
  const matchesByDate: { [key: string]: Match[] } = {};
  
  filteredMatches.forEach(match => {
    if (!matchesByDate[match.date]) {
      matchesByDate[match.date] = [];
    }
    matchesByDate[match.date].push(match);
  });
  
  // Sort dates
  const sortedDates = Object.keys(matchesByDate).sort();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-lg mb-4">Match Schedule & Fixtures</h1>
              <p className="text-lg opacity-90">
                View all upcoming and completed matches in the tournament
              </p>
            </div>
          </div>
          <div className="h-16 bg-gradient-to-b from-blue-800/0 to-gray-50"></div>
        </section>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
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
                
                <div>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedTeam.toString()}
                    onChange={(e) => setSelectedTeam(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                  >
                    <option value="all">All Teams</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                  >
                    <option value="all">All Matches</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedVenue}
                    onChange={(e) => setSelectedVenue(e.target.value)}
                  >
                    <option value="all">All Venues</option>
                    {venues.map(venue => (
                      <option key={venue} value={venue}>
                        {venue}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {filteredMatches.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No matches found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="space-y-8">
                {sortedDates.map(date => (
                  <div key={date}>
                    <div className="flex items-center mb-4">
                      <Calendar size={20} className="text-blue-600 mr-2" />
                      <h2 className="text-xl font-semibold">{new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {matchesByDate[date].map(match => (
                        <MatchCard key={match.id} match={match} />
                      ))}
                    </div>
                  </div>
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

export default Schedule;
