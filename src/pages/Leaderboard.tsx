"use client"

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { teams, players, getTeamById } from '@/data/mockData';
import { 
  Trophy, 
  TrendingUp, 
  Percent, 
  User, 
  Target, 
  BarChart, 
  Activity,
  Award 
} from 'lucide-react';

type LeaderboardTab = 'teams' | 'batting' | 'bowling';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('teams');
  
  // Sort teams by points then by NRR
  const sortedTeams = [...teams].sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    }
    return b.nrr - a.nrr;
  });
  
  // Sort players by runs for batting leaderboard
  const topBatsmen = [...players]
    .sort((a, b) => b.runs - a.runs)
    .slice(0, 10);
  
  // Sort players by wickets for bowling leaderboard
  const topBowlers = [...players]
    .sort((a, b) => b.wickets - a.wickets)
    .slice(0, 10);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <Navbar /> */}
      
      <main className="flex-grow pt-16">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-lg mb-4">Tournament Leaderboard</h1>
              <p className="text-lg opacity-90">
                Points table and player rankings
              </p>
            </div>
          </div>
          <div className="h-16 bg-gradient-to-b from-blue-800/0 to-gray-50"></div>
        </section>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="flex">
                <button
                  className={`flex-1 py-4 px-4 text-center font-medium ${
                    activeTab === 'teams' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('teams')}
                >
                  <div className="flex items-center justify-center">
                    <Trophy size={18} className="mr-2" />
                    Team Standings
                  </div>
                </button>
                
                <button
                  className={`flex-1 py-4 px-4 text-center font-medium ${
                    activeTab === 'batting' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('batting')}
                >
                  <div className="flex items-center justify-center">
                    <BarChart size={18} className="mr-2" />
                    Batting Leaders
                  </div>
                </button>
                
                <button
                  className={`flex-1 py-4 px-4 text-center font-medium ${
                    activeTab === 'bowling' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('bowling')}
                >
                  <div className="flex items-center justify-center">
                    <Target size={18} className="mr-2" />
                    Bowling Leaders
                  </div>
                </button>
              </div>
            </div>
            
            {activeTab === 'teams' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Team
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          M
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          W
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          L
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          T/NR
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          PT
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          NRR
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Form
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sortedTeams.map((team, index) => (
                        <tr key={team.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {index + 1}
                              {index < 4 && (
                                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 bg-green-100 text-green-800 text-xs rounded-full">
                                  Q
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                                style={{ backgroundColor: `${team.primaryColor}20` }}
                              >
                                <span className="text-xs font-bold" style={{ color: team.primaryColor }}>
                                  {team.shortName}
                                </span>
                              </div>
                              <div className="text-sm font-medium text-gray-900">{team.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            {team.matches}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 font-medium">
                            {team.won}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-red-600 font-medium">
                            {team.lost}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            {team.tied}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold">
                            {team.points}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            {team.nrr > 0 ? '+' : ''}{team.nrr.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <span className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium bg-green-100 text-green-800">
                                W
                              </span>
                              <span className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium bg-green-100 text-green-800">
                                W
                              </span>
                              <span className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium bg-red-100 text-red-800">
                                L
                              </span>
                              <span className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium bg-green-100 text-green-800">
                                W
                              </span>
                              <span className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium bg-red-100 text-red-800">
                                L
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="px-6 py-3 bg-gray-50">
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-green-100 text-green-800 text-xs rounded-full mr-1">
                      Q
                    </span>
                    <span>Qualified for playoffs</span>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'batting' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Player
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Team
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          M
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Runs
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          HS
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Avg
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          SR
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          50s/100s
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {topBatsmen.map((player, index) => {
                        const team = getTeamById(player.teamId);
                        return (
                          <tr key={player.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">{player.name}</div>
                                {index === 0 && (
                                  <div className="ml-2">
                                    <Award size={16} className="text-yellow-500" />
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                              {team?.shortName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              {player.matches}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold">
                              {player.runs}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              {player.highestScore}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              {player.average.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              {player.strikeRate.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              {player.fifties}/{player.hundreds}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'bowling' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Player
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Team
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          M
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Wkts
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Best
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Eco
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Style
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {topBowlers.map((player, index) => {
                        const team = getTeamById(player.teamId);
                        return (
                          <tr key={player.id} className={index === 0 ? 'bg-yellow-50' : ''}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">{player.name}</div>
                                {index === 0 && (
                                  <div className="ml-2">
                                    <Award size={16} className="text-yellow-500" />
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                              {team?.shortName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              {player.matches}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold">
                              {player.wickets}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              {player.bestBowling}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              {player.economy.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                              {player.bowlingStyle === '-' ? 'N/A' : player.bowlingStyle}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Stats Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <BarChart size={24} className="text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">Batting Stats</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Highest Score</div>
                    <div className="text-2xl font-bold">128</div>
                    <div className="text-sm text-gray-600">Rishabh Pant vs Western Wolves</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Most Runs</div>
                    <div className="text-2xl font-bold">6,800</div>
                    <div className="text-sm text-gray-600">Virat Singh (142 matches)</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Best Strike Rate</div>
                    <div className="text-2xl font-bold">180.2</div>
                    <div className="text-sm text-gray-600">Andre Russell (min. 1000 runs)</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <Target size={24} className="text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">Bowling Stats</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Best Bowling</div>
                    <div className="text-2xl font-bold">5/16</div>
                    <div className="text-sm text-gray-600">Ravindra Jadeja vs Northern Knights</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Most Wickets</div>
                    <div className="text-2xl font-bold">175</div>
                    <div className="text-sm text-gray-600">Trent Boult (130 matches)</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Best Economy</div>
                    <div className="text-2xl font-bold">7.5</div>
                    <div className="text-sm text-gray-600">Ravindra Jadeja (min. 30 overs)</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <Activity size={24} className="text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">Team Records</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Highest Team Score</div>
                    <div className="text-2xl font-bold">235/5</div>
                    <div className="text-sm text-gray-600">Royal Challengers vs Eastern Eagles</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Lowest Team Score</div>
                    <div className="text-2xl font-bold">87</div>
                    <div className="text-sm text-gray-600">Western Wolves vs Super Kings</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Largest Win Margin</div>
                    <div className="text-2xl font-bold">95 runs</div>
                    <div className="text-sm text-gray-600">Super Kings vs Western Wolves</div>
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

export default Leaderboard;
