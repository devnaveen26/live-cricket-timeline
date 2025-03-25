
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MatchCard from '@/components/MatchCard';
import TeamCard from '@/components/TeamCard';
import PlayerCard from '@/components/PlayerCard';
import LiveScoreBoard from '@/components/LiveScoreBoard';
import { 
  getUpcomingMatches, 
  getCompletedMatches, 
  getLiveMatches, 
  teams, 
  players, 
  liveScore,
  featureSections
} from '@/data/mockData';
import { ArrowRight, Calendar, BarChart2, Zap, Trophy } from 'lucide-react';

const Index = () => {
  const [upcomingMatches, setUpcomingMatches] = useState(getUpcomingMatches().slice(0, 3));
  const [completedMatches, setCompletedMatches] = useState(getCompletedMatches().slice(0, 3));
  const [liveMatches, setLiveMatches] = useState(getLiveMatches());
  const [topTeams, setTopTeams] = useState(teams.sort((a, b) => b.points - a.points).slice(0, 4));
  const [topPlayers, setTopPlayers] = useState(players.sort((a, b) => b.runs - a.runs).slice(0, 4));
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6 animate-fade-in">
                The Ultimate Cricket Experience
              </div>
              <h1 className="heading-xl mb-6 animate-fade-in animation-delay-100">
                Local Cricket Tournament <br />
                <span className="text-gradient">Like Never Before</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in animation-delay-200">
                Experience the excitement of cricket with live scores, 
                player stats, and match schedules all in one place.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animation-delay-300">
                <Link 
                  to="/live-score" 
                  className="px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center"
                >
                  <Zap size={18} className="mr-2" /> Watch Live
                </Link>
                <Link 
                  to="/schedule" 
                  className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold border border-blue-500 hover:bg-blue-800 transition-all flex items-center"
                >
                  <Calendar size={18} className="mr-2" /> View Schedule
                </Link>
              </div>
            </div>
          </div>
          <div className="h-16 bg-gradient-to-b from-blue-800/0 to-gray-50"></div>
        </section>
        
        {/* Live Matches Section */}
        {liveMatches.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                    <h2 className="text-xl font-bold text-red-500">LIVE NOW</h2>
                  </div>
                  <p className="text-gray-600 mt-1">Watch the action unfold in real-time</p>
                </div>
                <Link to="/live-score" className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                  View All <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <LiveScoreBoard matchId={liveMatches[0].id} liveScore={liveScore} />
                </div>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <h3 className="text-lg font-semibold mb-3">Key Statistics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Highest Score</span>
                        <span className="font-medium">Virat Singh - 75*</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Best Bowler</span>
                        <span className="font-medium">Kumar - 2/28</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Highest Partnership</span>
                        <span className="font-medium">107 (Singh-Sharma)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Run Rate</span>
                        <span className="font-medium">10.2</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h3 className="text-md font-semibold text-blue-800 mb-2">Match Prediction</h3>
                    <div className="flex items-center mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">65%</span>
                    </div>
                    <p className="text-sm text-blue-800">
                      Royal Challengers are favored to win based on current match situation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Features Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-lg mb-4">Everything You Need</h2>
              <p className="text-lg text-gray-600">
                Explore all the features of our cricket tournament platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureSections.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Link
                    key={index}
                    to={feature.link}
                    className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all relative overflow-hidden"
                  >
                    <div className="absolute -right-6 -top-6 w-20 h-20 bg-blue-500/10 rounded-full group-hover:scale-150 transition-all duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                        <Icon 
                          size={24} 
                          className="text-blue-600 group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.subtitle}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Upcoming Matches */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="heading-md">Upcoming Matches</h2>
                <p className="text-gray-600 mt-1">Don't miss any of the upcoming cricket action</p>
              </div>
              <Link to="/schedule" className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Teams Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="heading-md">Top Teams</h2>
                <p className="text-gray-600 mt-1">The leading teams in the tournament</p>
              </div>
              <Link to="/teams" className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topTeams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Recent Results */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="heading-md">Recent Results</h2>
                <p className="text-gray-600 mt-1">Catch up on recently completed matches</p>
              </div>
              <Link to="/schedule" className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Top Players */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="heading-md">Top Players</h2>
                <p className="text-gray-600 mt-1">The star performers of the tournament</p>
              </div>
              <Link to="/players" className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topPlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="heading-lg mb-6">Ready to Experience the Excitement?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of cricket fans following every ball, run, and wicket of this tournament.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/live-score" 
                className="px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center"
              >
                <Zap size={18} className="mr-2" /> Watch Live
              </Link>
              <Link 
                to="/leaderboard" 
                className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold border border-blue-500 hover:bg-blue-800 transition-all flex items-center"
              >
                <BarChart2 size={18} className="mr-2" /> View Leaderboard
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
