"use client"

import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  teams, 
  players, 
  matches, 
  liveScore, 
  getTeamById, 
  getPlayerById, 
  getMatchById 
} from '@/data/mockData';
import { 
  User, 
  Lock, 
  LogIn, 
  Shield, 
  Calendar, 
  Settings, 
  Home, 
  BarChart, 
  Edit, 
  Plus, 
  Save, 
  Key, 
  Trash, 
  Eye, 
  Zap, 
  ChevronRight,
  CheckCircle,
  XCircle
} from 'lucide-react';

type AdminTab = 'dashboard' | 'matches' | 'teams' | 'players' | 'live-scoring';

// Add these types to help with type safety
type BatterStats = {
  id: number;
  name: string;
  runs: number;
  balls: number;
  isStriker: boolean;
};

type BowlerStats = {
  id: number;
  name: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
};

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [liveMatchId, setLiveMatchId] = useState(10); // Default active match
  const [liveScoreData, setLiveScoreData] = useState(liveScore);
  const [newBallEvent, setNewBallEvent] = useState('');
  const [commentaryText, setCommentaryText] = useState('');
  const { toast } = useToast();
  
  // New state for more detailed live scoring
  const [batters, setBatters] = useState<BatterStats[]>([
    { 
      id: liveScoreData.currentBatsmen[0], 
      name: getPlayerById(liveScoreData.currentBatsmen[0])?.name || '', 
      runs: 0, 
      balls: 0, 
      isStriker: true 
    },
    { 
      id: liveScoreData.currentBatsmen[1], 
      name: getPlayerById(liveScoreData.currentBatsmen[1])?.name || '', 
      runs: 0, 
      balls: 0, 
      isStriker: false 
    }
  ]);

  const [bowlers, setBowlers] = useState<BowlerStats[]>([
    {
      id: liveScoreData.currentBowler,
      name: getPlayerById(liveScoreData.currentBowler)?.name || '',
      overs: 0,
      maidens: 0,
      runs: 0,
      wickets: 0
    }
  ]);

  // Add a new state to track if the innings is complete
  const [isInningsComplete, setIsInningsComplete] = useState(false);

  // Add additional state to track innings number
  const [currentInnings, setCurrentInnings] = useState<1|2>(1);
  const [firstInningsScore, setFirstInningsScore] = useState<number | null>(null);
  const [matchResult, setMatchResult] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication for demo purposes
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      toast({
        title: 'Login Successful',
        description: 'Welcome to the admin panel!',
        variant: 'default',
      });
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password. Try admin/admin123',
        variant: 'destructive',
      });
    }
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully.',
      variant: 'default',
    });
  };
  
  // Function to rotate strike
  const rotateStrike = () => {
    setBatters(prevBatters => 
      prevBatters.map(batter => ({
        ...batter, 
        isStriker: !batter.isStriker
      }))
    );
  };

  // Updated ball event handler with more comprehensive logic
  const handleBallEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBallEvent || !/^(0|1|2|3|4|6|W|NB|WD)$/.test(newBallEvent)) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter a valid ball event (0, 1, 2, 3, 4, 6, W, NB, WD).',
        variant: 'destructive',
      });
      return;
    }
    
    // Update recent balls
    const updatedBalls = [newBallEvent, ...liveScoreData.recentBalls.slice(0, 5)];
    
    // Initialize variables
    let runs = liveScoreData.totalRuns;
    let wickets = liveScoreData.wickets;
    let overs = liveScoreData.overs;
    
    // Update batters and bowler stats
    let updatedBatters = [...batters];
    let updatedBowlers = [...bowlers];
    
    // Find striker
    const strikerIndex = updatedBatters.findIndex(b => b.isStriker);
    const nonStrikerIndex = strikerIndex === 0 ? 1 : 0;
    
    // Process ball event
    switch (newBallEvent) {
      case '0':
        updatedBatters[strikerIndex].balls++;
        updatedBowlers[0].runs += 0;
        updatedBowlers[0].overs += 0.1;
        overs += 0.1;
        break;
      case '1':
        runs++;
        updatedBatters[strikerIndex].runs++;
        updatedBatters[strikerIndex].balls++;
        updatedBowlers[0].runs += 1;
        updatedBowlers[0].overs += 0.1;
        // Rotate strike for single
        updatedBatters[strikerIndex].isStriker = false;
        updatedBatters[nonStrikerIndex].isStriker = true;
        overs += 0.1;
        break;
      case '2':
        runs += 2;
        updatedBatters[strikerIndex].runs += 2;
        updatedBatters[strikerIndex].balls++;
        updatedBowlers[0].runs += 2;
        updatedBowlers[0].overs += 0.1;
        overs += 0.1;
        break;
      case '3':
        runs += 3;
        updatedBatters[strikerIndex].runs += 3;
        updatedBatters[strikerIndex].balls++;
        updatedBowlers[0].runs += 3;
        updatedBowlers[0].overs += 0.1;
        // Rotate strike for 3 runs
        updatedBatters[strikerIndex].isStriker = false;
        updatedBatters[nonStrikerIndex].isStriker = true;
        overs += 0.1;
        break;
      case '4':
        runs += 4;
        updatedBatters[strikerIndex].runs += 4;
        updatedBatters[strikerIndex].balls++;
        updatedBowlers[0].runs += 4;
        updatedBowlers[0].overs += 0.1;
        overs += 0.1;
        break;
      case '6':
        runs += 6;
        updatedBatters[strikerIndex].runs += 6;
        updatedBatters[strikerIndex].balls++;
        updatedBowlers[0].runs += 6;
        updatedBowlers[0].overs += 0.1;
        overs += 0.1;
        break;
      case 'W':
        wickets++;
        updatedBatters[strikerIndex].balls++;
        updatedBowlers[0].wickets++;
        updatedBowlers[0].overs += 0.1;
        overs += 0.1;
        
        // Check if all wickets have fallen (10 wickets in cricket)
        if (wickets >= 10) {
          // End the innings
          toast({
            title: 'Innings Complete',
            description: 'All wickets have fallen. The innings is now complete.',
            variant: 'default',
          });
          
          // Disable further scoring
          setNewBallEvent('');
          setCommentaryText('');
          
          // You might want to add additional logic here to switch innings
          // For now, we'll just update the UI to show the innings is complete
          
          // Update state with final score
          setLiveScoreData({
            ...liveScoreData,
            totalRuns: runs,
            wickets: wickets,
            overs: overs,
            recentBalls: updatedBalls,
          });
          
          setBatters(updatedBatters);
          setBowlers(updatedBowlers);
          
          return; // Exit the function early
        }
        
        // Replace dismissed batter if the innings isn't over
        updatedBatters[strikerIndex] = {
          id: 0, // You'd typically select next batter from team
          name: 'Next Batter',
          runs: 0,
          balls: 0,
          isStriker: true
        };
        break;
      case 'WD':
        runs++;
        updatedBowlers[0].runs += 1;
        // No over increment for wides
        break;
      case 'NB':
        runs++;
        updatedBowlers[0].runs += 1;
        // No over increment for no balls
        break;
    }
    
    // Complete over logic
    if (Math.round((overs * 10) % 10) === 6) {
      overs = Math.floor(overs) + 1.0;
      
      // Check for maiden over
      const currentBowlerIndex = 0; // Assuming first bowler in the array
      const currentOverRuns = updatedBalls.reduce((total, ball) => {
        // Only count runs directly off the bat (not extras)
        if (['0', '1', '2', '3', '4', '6'].includes(ball)) {
          return total + parseInt(ball);
        }
        return total;
      }, 0);
      
      if (currentOverRuns === 0) {
        updatedBowlers[currentBowlerIndex].maidens++;
      }
      
      // Rotate strike at end of over
      updatedBatters[strikerIndex].isStriker = false;
      updatedBatters[nonStrikerIndex].isStriker = true;
      
      // Change bowler at end of over
      // For demo purposes, we'll just create a new bowler with a different ID
      const nextBowlerId = liveScoreData.currentBowler === 17 ? 18 : 17;
      const nextBowlerName = getPlayerById(nextBowlerId)?.name || 'New Bowler';
      
      // Update the bowlers array with the new bowler
      updatedBowlers = [
        {
          id: nextBowlerId,
          name: nextBowlerName,
          overs: 0,
          maidens: 0,
          runs: 0,
          wickets: 0
        }
      ];
      
      // Update the live score data with the new bowler
      liveScoreData.currentBowler = nextBowlerId;
      
      // Reset recent balls
      updatedBalls.length = 0;
    }
    
    // Update state
    setLiveScoreData({
      ...liveScoreData,
      totalRuns: runs,
      wickets: wickets,
      overs: overs,
      recentBalls: updatedBalls,
    });
    
    setBatters(updatedBatters);
    setBowlers(updatedBowlers);
    
    // Reset input
    setNewBallEvent('');
    setCommentaryText('');
    
    toast({
      title: 'Score Updated',
      description: `Added ${newBallEvent} to the scorecard.`,
      variant: 'default',
    });
  };

  // Manual strike rotation button handler
  const handleManualStrikeRotation = () => {
    rotateStrike();
    toast({
      title: 'Strike Rotated',
      description: 'Batsmen positions have been swapped.',
      variant: 'default',
    });
  };
  
  // If not logged in, show login form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* <Navbar /> */}
        
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key size={24} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">Admin Login</h2>
              <p className="text-gray-600 mt-1">Enter your credentials to access the admin panel</p>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="admin"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="admin123"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <LogIn size={18} className="mr-2" />
                Login
              </button>
            </form>
            
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>For demo, use: admin / admin123</p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  // Admin panel after successful login
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <Navbar /> */}
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Sidebar */}
              <div className="w-full md:w-64 bg-gray-50 p-4 border-r border-gray-200">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Settings size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-bold">Admin Panel</h2>
                    <p className="text-xs text-gray-500">Manage tournament data</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'dashboard'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Home size={16} className="mr-3" />
                    Dashboard
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('live-scoring')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'live-scoring'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Zap size={16} className="mr-3" />
                    Live Scoring
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('matches')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'matches'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Calendar size={16} className="mr-3" />
                    Matches
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('teams')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'teams'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Shield size={16} className="mr-3" />
                    Teams
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('players')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'players'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User size={16} className="mr-3" />
                    Players
                  </button>
                </nav>
                
                <div className="mt-auto pt-4 border-t border-gray-200 mt-6">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-700 hover:bg-red-50"
                  >
                    <LogIn size={16} className="mr-3 transform rotate-180" />
                    Logout
                  </button>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="w-full p-6">
                {activeTab === 'dashboard' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <Calendar size={24} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Matches</p>
                            <h3 className="text-2xl font-bold">{matches.length}</h3>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <div className="flex items-center text-green-600 mr-4">
                            <ChevronRight size={16} className="mr-1" />
                            <span>{matches.filter(m => m.status === 'completed').length} Completed</span>
                          </div>
                          <div className="flex items-center text-blue-600">
                            <ChevronRight size={16} className="mr-1" />
                            <span>{matches.filter(m => m.status === 'upcoming').length} Upcoming</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <Shield size={24} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Teams</p>
                            <h3 className="text-2xl font-bold">{teams.length}</h3>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <div className="flex items-center text-green-600 mr-4">
                            <ChevronRight size={16} className="mr-1" />
                            <span>{teams.filter(t => t.points >= 10).length} Top Teams</span>
                          </div>
                          <div className="flex items-center text-blue-600">
                            <ChevronRight size={16} className="mr-1" />
                            <span>{teams.filter(t => t.points < 10).length} Bottom Teams</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <User size={24} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Players</p>
                            <h3 className="text-2xl font-bold">{players.length}</h3>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <div className="flex items-center text-green-600 mr-4">
                            <ChevronRight size={16} className="mr-1" />
                            <span>{players.filter(p => p.role === 'Batsman').length} Batsmen</span>
                          </div>
                          <div className="flex items-center text-blue-600">
                            <ChevronRight size={16} className="mr-1" />
                            <span>{players.filter(p => p.role === 'Bowler').length} Bowlers</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                      <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
                        <div className="p-4 flex items-center">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-4">
                            <CheckCircle size={20} className="text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">Match Score Updated</h4>
                            <p className="text-sm text-gray-500">Royal Challengers vs Coastal Titans - Updated 10 minutes ago</p>
                          </div>
                        </div>
                        
                        <div className="p-4 flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-4">
                            <Plus size={20} className="text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">New Match Added</h4>
                            <p className="text-sm text-gray-500">Super Kings vs Northern Knights - Added 2 hours ago</p>
                          </div>
                        </div>
                        
                        <div className="p-4 flex items-center">
                          <div className="w-10 h-10 rounded-full bg-yellow-100 flex-shrink-0 flex items-center justify-center mr-4">
                            <Edit size={20} className="text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">Player Stats Updated</h4>
                            <p className="text-sm text-gray-500">Virat Singh's statistics updated - 5 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Upcoming Matches</h3>
                      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Match
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Venue
                              </th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {matches.filter(match => match.status === 'upcoming').slice(0, 5).map(match => {
                              const team1 = getTeamById(match.team1Id);
                              const team2 = getTeamById(match.team2Id);
                              return (
                                <tr key={match.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-gray-900">
                                      {team1?.shortName} vs {team2?.shortName}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(match.date).toLocaleDateString()} {match.time}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {match.venue}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                    <button
                                      className="text-blue-600 hover:text-blue-800 mr-3"
                                      onClick={() => {
                                        toast({
                                          title: 'Action Not Available',
                                          description: 'This is a demo admin panel. Edit functionality is not implemented.',
                                          variant: 'default',
                                        });
                                      }}
                                    >
                                      <Edit size={16} />
                                    </button>
                                    <button
                                      className="text-red-600 hover:text-red-800"
                                      onClick={() => {
                                        toast({
                                          title: 'Action Not Available',
                                          description: 'This is a demo admin panel. Delete functionality is not implemented.',
                                          variant: 'destructive',
                                        });
                                      }}
                                    >
                                      <Trash size={16} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'live-scoring' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Live Match Scoring</h2>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Match
                      </label>
                      <select
                        value={liveMatchId}
                        onChange={(e) => setLiveMatchId(parseInt(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {matches.filter(match => match.status === 'live' || match.status === 'upcoming').map(match => {
                          const team1 = getTeamById(match.team1Id);
                          const team2 = getTeamById(match.team2Id);
                          return (
                            <option key={match.id} value={match.id}>
                              {team1?.shortName} vs {team2?.shortName} ({match.venue})
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                          <h3 className="text-lg font-semibold mb-4">Current Score</h3>
                          
                          <div className="flex justify-between items-center mb-6">
                            <div>
                              <div className="text-3xl font-bold">
                                {liveScoreData.totalRuns}-{liveScoreData.wickets}
                              </div>
                              <div className="text-gray-600">
                                Overs: {Math.floor(liveScoreData.overs)}.{Math.round((liveScoreData.overs - Math.floor(liveScoreData.overs)) * 10)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                {getTeamById(liveScoreData.battingTeamId)?.name} batting
                              </div>
                              <div className="text-gray-600">
                                CRR: {(liveScoreData.totalRuns / (liveScoreData.overs || 1)).toFixed(2)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Current Batsmen</h4>
                              <div className="space-y-2">
                                {batters.map(batter => (
                                  <div 
                                    key={batter.id} 
                                    className={`flex justify-between items-center ${batter.isStriker ? 'bg-green-50' : 'bg-gray-50'} p-2 rounded`}
                                  >
                                    <div className="flex items-center">
                                      <div className={`w-2 h-2 rounded-full mr-2 ${batter.isStriker ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                      <span>{batter.name}</span>
                                      {batter.isStriker && <span className="ml-2 text-xs text-green-600">(Striker)</span>}
                                    </div>
                                    <span className="font-medium">{batter.runs} ({batter.balls})</span>
                                  </div>
                                ))}
                              </div>
                              <button 
                                onClick={handleManualStrikeRotation}
                                className="mt-2 w-full px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                              >
                                Rotate Strike
                              </button>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Current Bowler</h4>
                              <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                <span>{bowlers[0].name}</span>
                                <span className="font-medium">
                                  {bowlers[0].wickets}-{bowlers[0].runs} ({Math.floor(bowlers[0].overs)}.{Math.round((bowlers[0].overs - Math.floor(bowlers[0].overs)) * 10)})
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="text-sm font-medium text-gray-700 mb-2">This Over</h4>
                          <div className="flex space-x-2 mb-6">
                            {liveScoreData.recentBalls.map((ball, index) => {
                              const getBallClass = () => {
                                switch(ball) {
                                  case '4': return 'bg-blue-500 text-white';
                                  case '6': return 'bg-purple-500 text-white';
                                  case 'W': return 'bg-red-500 text-white';
                                  case '0': return 'bg-gray-200 text-gray-800';
                                  default: return 'bg-green-100 text-green-800';
                                }
                              };
                              
                              return (
                                <div 
                                  key={index}
                                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium ${getBallClass()}`}
                                >
                                  {ball}
                                </div>
                              );
                            })}
                          </div>
                          
                          <form onSubmit={handleBallEventSubmit} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Add Ball Event
                              </label>
                              <div className="flex space-x-2">
                                {['0', '1', '2', '3', '4', '6', 'W', 'WD', 'NB'].map(event => (
                                  <button
                                    key={event}
                                    type="button"
                                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium ${
                                      newBallEvent === event 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                    } ${isInningsComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => setNewBallEvent(event)}
                                    disabled={isInningsComplete}
                                  >
                                    {event}
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Commentary (Optional)
                              </label>
                              <textarea
                                value={commentaryText}
                                onChange={(e) => setCommentaryText(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Add commentary for this ball..."
                                rows={3}
                              ></textarea>
                            </div>
                            
                            <button
                              type="submit"
                              className={`px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ${
                                isInningsComplete ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                              disabled={isInningsComplete}
                            >
                              <Save size={16} className="inline mr-1" /> Update Score
                            </button>
                          </form>
                        </div>
                      </div>
                      
                      <div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                          <h3 className="text-lg font-semibold mb-4">Match Details</h3>
                          
                          <div className="space-y-3">
                            <div>
                              <div className="text-sm text-gray-500">Teams</div>
                              <div className="font-medium">
                                {getTeamById(liveScoreData.battingTeamId)?.name} vs {getTeamById(liveScoreData.bowlingTeamId)?.name}
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-gray-500">Venue</div>
                              <div className="font-medium">
                                {getMatchById(liveMatchId)?.venue}
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-gray-500">Date & Time</div>
                              <div className="font-medium">
                                {new Date(getMatchById(liveMatchId)?.date || '').toLocaleDateString()} {getMatchById(liveMatchId)?.time}
                              </div>
                            </div>
                            
                            <div className="pt-3 border-t border-gray-200">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h4>
                              
                              <div className="space-y-2">
                                <button
                                  className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100"
                                  onClick={() => {
                                    toast({
                                      title: 'Action Not Available',
                                      description: 'This is a demo admin panel. Wicket entry functionality is not implemented.',
                                      variant: 'default',
                                    });
                                  }}
                                >
                                  <span>Enter Wicket Details</span>
                                  <ChevronRight size={16} />
                                </button>
                                
                                <button
                                  className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100"
                                  onClick={() => {
                                    toast({
                                      title: 'Action Not Available',
                                      description: 'This is a demo admin panel. Change bowler functionality is not implemented.',
                                      variant: 'default',
                                    });
                                  }}
                                >
                                  <span>Change Bowler</span>
                                  <ChevronRight size={16} />
                                </button>
                                
                                <button
                                  className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100"
                                  onClick={() => {
                                    toast({
                                      title: 'Action Not Available',
                                      description: 'This is a demo admin panel. End innings functionality is not implemented.',
                                      variant: 'default',
                                    });
                                  }}
                                >
                                  <span>End Innings</span>
                                  <ChevronRight size={16} />
                                </button>
                                
                                <button
                                  className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md bg-red-50 text-red-700 hover:bg-red-100"
                                  onClick={() => {
                                    toast({
                                      title: 'Action Not Available',
                                      description: 'This is a demo admin panel. End match functionality is not implemented.',
                                      variant: 'destructive',
                                    });
                                  }}
                                >
                                  <span>End Match</span>
                                  <ChevronRight size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'matches' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Manage Matches</h2>
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                        onClick={() => {
                          toast({
                            title: 'Action Not Available',
                            description: 'This is a demo admin panel. Add match functionality is not implemented.',
                            variant: 'default',
                          });
                        }}
                      >
                        <Plus size={16} className="mr-1" /> Add Match
                      </button>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <input
                          type="text"
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Search matches..."
                        />
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Match
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date & Time
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Venue
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {matches.map(match => {
                              const team1 = getTeamById(match.team1Id);
                              const team2 = getTeamById(match.team2Id);
                              
                              return (
                                <tr key={match.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    #{match.id}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-gray-900">
                                      {team1?.shortName} vs {team2?.shortName}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(match.date).toLocaleDateString()} {match.time}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {match.venue}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      match.status === 'live' 
                                        ? 'bg-red-100 text-red-800' 
                                        : match.status === 'upcoming' 
                                        ? 'bg-blue-100 text-blue-800' 
                                        : 'bg-green-100 text-green-800'
                                    }`}>
                                      {match.status.toUpperCase()}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                    <button
                                      className="text-blue-600 hover:text-blue-800 mx-1"
                                      onClick={() => {
                                        toast({
                                          title: 'Action Not Available',
                                          description: 'This is a demo admin panel. View match functionality is not implemented.',
                                          variant: 'default',
                                        });
                                      }}
                                    >
                                      <Eye size={16} />
                                    </button>
                                    <button
                                      className="text-blue-600 hover:text-blue-800 mx-1"
                                      onClick={() => {
                                        toast({
                                          title: 'Action Not Available',
                                          description: 'This is a demo admin panel. Edit match functionality is not implemented.',
                                          variant: 'default',
                                        });
                                      }}
                                    >
                                      <Edit size={16} />
                                    </button>
                                    <button
                                      className="text-red-600 hover:text-red-800 mx-1"
                                      onClick={() => {
                                        toast({
                                          title: 'Action Not Available',
                                          description: 'This is a demo admin panel. Delete match functionality is not implemented.',
                                          variant: 'destructive',
                                        });
                                      }}
                                    >
                                      <Trash size={16} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'teams' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Manage Teams</h2>
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                        onClick={() => {
                          toast({
                            title: 'Action Not Available',
                            description: 'This is a demo admin panel. Add team functionality is not implemented.',
                            variant: 'default',
                          });
                        }}
                      >
                        <Plus size={16} className="mr-1" /> Add Team
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {teams.map(team => (
                        <div key={team.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                          <div 
                            className="h-3"
                            style={{ backgroundColor: team.primaryColor }}
                          ></div>
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center">
                                <div 
                                  className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                                  style={{ backgroundColor: `${team.primaryColor}20` }}
                                >
                                  <span className="text-base font-bold" style={{ color: team.primaryColor }}>
                                    {team.shortName}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold">{team.name}</h3>
                                  <p className="text-sm text-gray-600">{team.homeGround}</p>
                                </div>
                              </div>
                              <div className="flex">
                                <button
                                  className="text-blue-600 hover:text-blue-800 mx-1"
                                  onClick={() => {
                                    toast({
                                      title: 'Action Not Available',
                                      description: 'This is a demo admin panel. Edit team functionality is not implemented.',
                                      variant: 'default',
                                    });
                                  }}
                                >
                                  <Edit size={16} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div className="bg-gray-50 rounded p-2">
                                <div className="text-sm text-gray-500">Matches</div>
                                <div className="font-bold">{team.matches}</div>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="text-sm text-gray-500">Won</div>
                                <div className="font-bold text-green-600">{team.won}</div>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <div className="text-sm text-gray-500">Points</div>
                                <div className="font-bold">{team.points}</div>
                              </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                              <button
                                className="text-sm text-blue-600 hover:text-blue-800"
                                onClick={() => {
                                  toast({
                                    title: 'Action Not Available',
                                    description: 'This is a demo admin panel. View team players functionality is not implemented.',
                                    variant: 'default',
                                  });
                                }}
                              >
                                View Players
                              </button>
                              <button
                                className="text-sm text-blue-600 hover:text-blue-800"
                                onClick={() => {
                                  toast({
                                    title: 'Action Not Available',
                                    description: 'This is a demo admin panel. Edit team stats functionality is not implemented.',
                                    variant: 'default',
                                  });
                                }}
                              >
                                Edit Stats
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'players' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Manage Players</h2>
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                        onClick={() => {
                          toast({
                            title: 'Action Not Available',
                            description: 'This is a demo admin panel. Add player functionality is not implemented.',
                            variant: 'default',
                          });
                        }}
                      >
                        <Plus size={16} className="mr-1" /> Add Player
                      </button>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Search players..."
                        />
                        <select
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block sm:w-48 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="all">All Teams</option>
                          {teams.map(team => (
                            <option key={team.id} value={team.id}>
                              {team.name}
                            </option>
                          ))}
                        </select>
                        <select
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block sm:w-48 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="all">All Roles</option>
                          <option value="Batsman">Batsman</option>
                          <option value="Bowler">Bowler</option>
                          <option value="All-rounder">All-rounder</option>
                          <option value="Wicketkeeper">Wicketkeeper</option>
                        </select>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Player
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Team
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                              </th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Matches
                              </th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Runs / Wickets
                              </th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {players.slice(0, 10).map(player => {
                              const team = getTeamById(player.teamId);
                              
                              return (
                                <tr key={player.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                                        <img 
                                          src={player.image} 
                                          alt={player.name} 
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div>
                                        <div className="font-medium text-gray-900">{player.name}</div>
                                        <div className="text-xs text-gray-500">{player.nationality}, {player.age} yrs</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                      className="px-2 py-1 rounded text-xs font-medium"
                                      style={{ 
                                        backgroundColor: `${team?.primaryColor}20`,
                                        color: team?.primaryColor
                                      }}
                                    >
                                      {team?.shortName}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {player.role}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    {player.matches}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    {player.role === 'Batsman' || player.role === 'Wicketkeeper'
                                      ? <span className="font-medium">{player.runs}</span>
                                      : player.role === 'Bowler'
                                      ? <span className="font-medium">{player.wickets}</span>
                                      : <span className="font-medium">{player.runs} / {player.wickets}</span>
                                    }
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                    <button
                                      className="text-blue-600 hover:text-blue-800 mx-1"
                                      onClick={() => {
                                        toast({
                                          title: 'Action Not Available',
                                          description: 'This is a demo admin panel. View player functionality is not implemented.',
                                          variant: 'default',
                                        });
                                      }}
                                    >
                                      <Eye size={16} />
                                    </button>
                                    <button
                                      className="text-blue-600 hover:text-blue-800 mx-1"
                                      onClick={() => {
                                        toast({
                                          title: 'Action Not Available',
                                          description: 'This is a demo admin panel. Edit player functionality is not implemented.',
                                          variant: 'default',
                                        });
                                      }}
                                    >
                                      <Edit size={16} />
                                    </button>
                                    <button
                                      className="text-red-600 hover:text-red-800 mx-1"
                                      onClick={() => {
                                        toast({
                                          title: 'Action Not Available',
                                          description: 'This is a demo admin panel. Delete player functionality is not implemented.',
                                          variant: 'destructive',
                                        });
                                      }}
                                    >
                                      <Trash size={16} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                        <div className="text-sm text-gray-700">
                          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">{players.length}</span> players
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            Previous
                          </button>
                          <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
