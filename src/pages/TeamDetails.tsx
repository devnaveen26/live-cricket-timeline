"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlayerCard from '@/components/PlayerCard';
import MatchCard from '@/components/MatchCard';
import { 
  getTeamById, 
  getPlayersByTeamId, 
  Match, 
  matches, 
  getPlayerById 
} from '@/data/mockData';
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  Calendar, 
  Map, 
  User, 
  ArrowLeft 
} from 'lucide-react';

const TeamDetails = () => {
  const params = useParams<{ id: string }>();
  const teamId = parseInt(params?.id || '0');
  const team = getTeamById(teamId);
  const players = getPlayersByTeamId(teamId);
  const captain = team ? getPlayerById(team.captain) : null;
  
  const [teamMatches, setTeamMatches] = useState<Match[]>([]);
  
  useEffect(() => {
    // Get all matches for this team
    if (teamId) {
      const teamMatchList = matches.filter(
        match => match.team1Id === teamId || match.team2Id === teamId
      );
      setTeamMatches(teamMatchList);
    }
  }, [teamId]);
  
  if (!team) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* <Navbar /> */}
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Team not found</h1>
            <Link href="/teams" className="text-blue-600 hover:text-blue-800">
              Back to Teams
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <Navbar /> */}
      
      <main className="flex-grow pt-16">
        {/* Team Header */}
        <section 
          className="relative"
          style={{ 
            background: `linear-gradient(to right, ${team.primaryColor}, ${team.secondaryColor})`,
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 py-16 relative z-10">
            <Link 
              href="/teams" 
              className="inline-flex items-center text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Teams
            </Link>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div 
                className="w-32 h-32 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg"
              >
                <span className="text-4xl font-bold" style={{ color: team.primaryColor }}>
                  {team.shortName}
                </span>
              </div>
              
              <div className="text-white md:pt-2">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left">
                  {team.name}
                </h1>
                <p className="max-w-2xl mb-6 opacity-90 text-center md:text-left">
                  {team.description}
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                    <Trophy size={18} className="mr-2" />
                    <div>
                      <div className="text-sm opacity-80">Points</div>
                      <div className="font-bold">{team.points}</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                    <TrendingUp size={18} className="mr-2" />
                    <div>
                      <div className="text-sm opacity-80">Net Run Rate</div>
                      <div className="font-bold">{team.nrr.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                    <Calendar size={18} className="mr-2" />
                    <div>
                      <div className="text-sm opacity-80">Matches</div>
                      <div className="font-bold">{team.matches}</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                    <User size={18} className="mr-2" />
                    <div>
                      <div className="text-sm opacity-80">Captain</div>
                      <div className="font-bold">{captain?.name || 'N/A'}</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                    <Map size={18} className="mr-2" />
                    <div>
                      <div className="text-sm opacity-80">Home Ground</div>
                      <div className="font-bold">{team.homeGround}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-16 bg-gradient-to-b from-transparent to-gray-50"></div>
        </section>
        
        {/* Team Stats */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Team Statistics</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-gray-500 text-sm mb-1">Matches</div>
                  <div className="text-3xl font-bold">{team.matches}</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-gray-500 text-sm mb-1">Won</div>
                  <div className="text-3xl font-bold text-green-600">{team.won}</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-gray-500 text-sm mb-1">Lost</div>
                  <div className="text-3xl font-bold text-red-600">{team.lost}</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-gray-500 text-sm mb-1">Tied/NR</div>
                  <div className="text-3xl font-bold text-gray-600">{team.tied}</div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Win/Loss Ratio</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(team.won / team.matches) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Win Rate: {((team.won / team.matches) * 100).toFixed(1)}%</span>
                  <span>Loss Rate: {((team.lost / team.matches) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Squad */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="heading-md mb-2">Team Squad</h2>
              <p className="text-gray-600">Meet the players representing {team.name}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {players.map((player) => (
                <PlayerCard key={player.id} player={player} showTeam={false} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Matches */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="heading-md mb-2">Team Matches</h2>
              <p className="text-gray-600">All matches involving {team.name}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TeamDetails;
