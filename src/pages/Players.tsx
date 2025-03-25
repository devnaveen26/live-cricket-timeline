
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlayerCard from '@/components/PlayerCard';
import { 
  Player, 
  players, 
  teams, 
  getTeamById, 
  getPlayerById 
} from '@/data/mockData';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  User, 
  ChevronLeft, 
  ChevronRight,
  BarChart2,
  Target,
  Activity
} from 'lucide-react';

const PlayerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const playerId = parseInt(id || '0');
  const player = getPlayerById(playerId);
  const team = player ? getTeamById(player.teamId) : null;
  
  if (!player || !team) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Player not found</h1>
            <Link to="/players" className="text-blue-600 hover:text-blue-800">
              Back to Players
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <section 
          className="relative"
          style={{ 
            background: `linear-gradient(to right, ${team.primaryColor}, ${team.secondaryColor})`,
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 py-16 relative z-10">
            <Link 
              to="/players" 
              className="inline-flex items-center text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 hover:bg-white/30 transition-colors"
            >
              <ChevronLeft size={16} className="mr-2" /> Back to Players
            </Link>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg overflow-hidden">
                <img 
                  src={player.image} 
                  alt={player.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-white md:pt-2">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left">
                  {player.name}
                </h1>
                <div className="flex items-center justify-center md:justify-start mb-6">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium mr-2"
                    style={{ backgroundColor: `${team.primaryColor}40` }}
                  >
                    {team.name}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    {player.role}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <div className="text-sm opacity-80">Nationality</div>
                    <div className="font-bold">{player.nationality}</div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <div className="text-sm opacity-80">Age</div>
                    <div className="font-bold">{player.age} years</div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <div className="text-sm opacity-80">Batting</div>
                    <div className="font-bold">{player.battingStyle}</div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <div className="text-sm opacity-80">Bowling</div>
                    <div className="font-bold">{player.bowlingStyle === '-' ? 'N/A' : player.bowlingStyle}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-16 bg-gradient-to-b from-transparent to-gray-50"></div>
        </section>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Stats Overview */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-6">Career Statistics</h2>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-gray-500 text-sm mb-1">Matches</div>
                      <div className="text-3xl font-bold">{player.matches}</div>
                    </div>
                    
                    {(player.role === 'Batsman' || player.role === 'All-rounder' || player.role === 'Wicketkeeper') && (
                      <>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-gray-500 text-sm mb-1">Runs</div>
                          <div className="text-3xl font-bold">{player.runs}</div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-gray-500 text-sm mb-1">Average</div>
                          <div className="text-3xl font-bold">{player.average.toFixed(2)}</div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-gray-500 text-sm mb-1">SR</div>
                          <div className="text-3xl font-bold">{player.strikeRate.toFixed(2)}</div>
                        </div>
                      </>
                    )}
                    
                    {(player.role === 'Bowler' || player.role === 'All-rounder') && (
                      <>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-gray-500 text-sm mb-1">Wickets</div>
                          <div className="text-3xl font-bold">{player.wickets}</div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-gray-500 text-sm mb-1">Economy</div>
                          <div className="text-3xl font-bold">{player.economy.toFixed(2)}</div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-gray-500 text-sm mb-1">Best</div>
                          <div className="text-3xl font-bold">{player.bestBowling}</div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {(player.role === 'Batsman' || player.role === 'All-rounder' || player.role === 'Wicketkeeper') && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Batting Performance</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stat</th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Highest Score</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold">{player.highestScore}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">vs Coastal Titans</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">50s / 100s</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold">{player.fifties} / {player.hundreds}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Career</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total 4s / 6s</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold">245 / 98</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Career</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Dot Ball %</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold">32.4%</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Career</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  {(player.role === 'Bowler' || player.role === 'All-rounder') && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Bowling Performance</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stat</th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4+ Wickets</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold">12</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Career</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Maidens</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold">8</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Career</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Dot Ball %</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold">38.7%</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Career</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Economy (Death)</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold">9.2</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Overs 16-20</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Performance Trends */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Last 5 Matches Performance</span>
                        <span className="text-sm text-gray-500">Trending Up</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Performance vs Top Teams</span>
                        <span className="text-sm text-gray-500">Average</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Home Ground Performance</span>
                        <span className="text-sm text-gray-500">Excellent</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Player Bio */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Player Bio</h3>
                  <p className="text-gray-600 mb-4">
                    {player.name} is a {player.nationality} {player.role.toLowerCase()} known for his {
                      player.role === 'Batsman' ? 'aggressive batting style and ability to dominate bowlers' :
                      player.role === 'Bowler' ? 'exceptional control and wicket-taking ability' :
                      player.role === 'All-rounder' ? 'all-round capabilities with both bat and ball' :
                      'quick reflexes behind the stumps and batting prowess'
                    }.
                  </p>
                  <p className="text-gray-600">
                    Representing {team.name} since the beginning of the tournament, {player.name} has been a crucial part of the team's {
                      team.won > team.lost ? 'success' : 'campaign'
                    } with {
                      player.role === 'Batsman' || player.role === 'Wicketkeeper' ? `${player.runs} runs at an average of ${player.average.toFixed(2)}` :
                      player.role === 'Bowler' ? `${player.wickets} wickets at an economy of ${player.economy.toFixed(2)}` :
                      `${player.runs} runs and ${player.wickets} wickets`
                    }.
                  </p>
                </div>
                
                {/* Recent Form */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Form</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">vs Super Kings</span>
                      {player.role === 'Batsman' || player.role === 'All-rounder' || player.role === 'Wicketkeeper' ? (
                        <span className="font-medium">42 (28)</span>
                      ) : (
                        <span className="font-medium">2/34</span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">vs Metro Riders</span>
                      {player.role === 'Batsman' || player.role === 'All-rounder' || player.role === 'Wicketkeeper' ? (
                        <span className="font-medium">65 (42)</span>
                      ) : (
                        <span className="font-medium">1/28</span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">vs Coastal Titans</span>
                      {player.role === 'Batsman' || player.role === 'All-rounder' || player.role === 'Wicketkeeper' ? (
                        <span className="font-medium">12 (9)</span>
                      ) : (
                        <span className="font-medium">3/25</span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">vs Eastern Eagles</span>
                      {player.role === 'Batsman' || player.role === 'All-rounder' || player.role === 'Wicketkeeper' ? (
                        <span className="font-medium">85 (52)</span>
                      ) : (
                        <span className="font-medium">0/42</span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">vs Northern Knights</span>
                      {player.role === 'Batsman' || player.role === 'All-rounder' || player.role === 'Wicketkeeper' ? (
                        <span className="font-medium">38 (25)</span>
                      ) : (
                        <span className="font-medium">2/19</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Achievements */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">Player of the Match: 3 times</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">
                          {player.role === 'Batsman' || player.role === 'Wicketkeeper' 
                            ? `Fastest Fifty: 21 balls` 
                            : player.role === 'Bowler' 
                            ? `Best Bowling Spell: ${player.bestBowling}`
                            : `Best All-round Performance: 72 runs & 3/24`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">
                          {player.role === 'Batsman' 
                            ? `Most 4s in an innings: 12` 
                            : player.role === 'Bowler' 
                            ? `Most maidens: 3 in a match`
                            : player.role === 'All-rounder'
                            ? `Most runs & wickets in same match`
                            : `Most dismissals in a match: 5`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const PlayersPage = () => {
  const [filterRole, setFilterRole] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeam, setFilterTeam] = useState<number | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 12;
  
  const handleSortChange = (value: string) => {
    if (sortBy === value) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(value);
      setSortOrder('asc');
    }
  };
  
  // Filter and sort players
  const filteredPlayers = players.filter(player => {
    const matchesRole = filterRole === 'all' || player.role === filterRole;
    const matchesTeam = filterTeam === 'all' || player.teamId === filterTeam;
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRole && matchesTeam && matchesSearch;
  });
  
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'runs') {
      return sortOrder === 'asc' ? a.runs - b.runs : b.runs - a.runs;
    } else if (sortBy === 'wickets') {
      return sortOrder === 'asc' ? a.wickets - b.wickets : b.wickets - a.wickets;
    } else if (sortBy === 'matches') {
      return sortOrder === 'asc' ? a.matches - b.matches : b.matches - a.matches;
    }
    return 0;
  });
  
  // Pagination
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = sortedPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const totalPages = Math.ceil(sortedPlayers.length / playersPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-lg mb-4">Player Statistics</h1>
              <p className="text-lg opacity-90">
                Explore detailed statistics of all players in the tournament
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
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                
                <div>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    value={filterRole}
                    onChange={(e) => {
                      setFilterRole(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="all">All Roles</option>
                    <option value="Batsman">Batsmen</option>
                    <option value="Bowler">Bowlers</option>
                    <option value="All-rounder">All-rounders</option>
                    <option value="Wicketkeeper">Wicketkeepers</option>
                  </select>
                </div>
                
                <div>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    value={filterTeam === 'all' ? 'all' : filterTeam.toString()}
                    onChange={(e) => {
                      setFilterTeam(e.target.value === 'all' ? 'all' : parseInt(e.target.value));
                      setCurrentPage(1);
                    }}
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
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="name">Sort by Name</option>
                    <option value="runs">Sort by Runs</option>
                    <option value="wickets">Sort by Wickets</option>
                    <option value="matches">Sort by Matches</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Player Stats Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <BarChart2 size={24} className="text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">Top Run Scorer</h3>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                    <img 
                      src={players[0].image} 
                      alt={players[0].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{players[0].name}</h4>
                    <p className="text-gray-600 text-sm">{getTeamById(players[0].teamId)?.name}</p>
                    <p className="text-2xl font-bold mt-1">{players[0].runs} <span className="text-gray-500 text-sm">runs</span></p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <Target size={24} className="text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">Top Wicket Taker</h3>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                    <img 
                      src={players.sort((a, b) => b.wickets - a.wickets)[0].image} 
                      alt={players.sort((a, b) => b.wickets - a.wickets)[0].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{players.sort((a, b) => b.wickets - a.wickets)[0].name}</h4>
                    <p className="text-gray-600 text-sm">{getTeamById(players.sort((a, b) => b.wickets - a.wickets)[0].teamId)?.name}</p>
                    <p className="text-2xl font-bold mt-1">{players.sort((a, b) => b.wickets - a.wickets)[0].wickets} <span className="text-gray-500 text-sm">wickets</span></p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <Activity size={24} className="text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">Best All-Rounder</h3>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                    <img 
                      src={players.filter(p => p.role === 'All-rounder').sort((a, b) => ((b.runs/100) + (b.wickets*2)) - ((a.runs/100) + (a.wickets*2)))[0].image} 
                      alt={players.filter(p => p.role === 'All-rounder').sort((a, b) => ((b.runs/100) + (b.wickets*2)) - ((a.runs/100) + (a.wickets*2)))[0].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{players.filter(p => p.role === 'All-rounder').sort((a, b) => ((b.runs/100) + (b.wickets*2)) - ((a.runs/100) + (a.wickets*2)))[0].name}</h4>
                    <p className="text-gray-600 text-sm">{getTeamById(players.filter(p => p.role === 'All-rounder').sort((a, b) => ((b.runs/100) + (b.wickets*2)) - ((a.runs/100) + (a.wickets*2)))[0].teamId)?.name}</p>
                    <p className="text-sm mt-1">
                      <span className="font-bold">{players.filter(p => p.role === 'All-rounder').sort((a, b) => ((b.runs/100) + (b.wickets*2)) - ((a.runs/100) + (a.wickets*2)))[0].runs} runs</span> • 
                      <span className="font-bold ml-1">{players.filter(p => p.role === 'All-rounder').sort((a, b) => ((b.runs/100) + (b.wickets*2)) - ((a.runs/100) + (a.wickets*2)))[0].wickets} wickets</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {currentPlayers.length === 0 ? (
              <div className="text-center py-16">
                <User size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No players found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentPlayers.map(player => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <nav className="flex items-center">
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md mr-2 ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <ChevronLeft size={18} />
                      </button>
                      
                      <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`w-8 h-8 flex items-center justify-center rounded-md ${
                              currentPage === number
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {number}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md ml-2 ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const Players = () => {
  const { id } = useParams<{ id: string }>();
  
  return id ? <PlayerProfile /> : <PlayersPage />;
};

export default Players;
