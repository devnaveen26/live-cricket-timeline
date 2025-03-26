"use client"

import React, { useState, useEffect } from 'react';
import { LiveScore, Team, Player, Match, getTeamById, getPlayerById, getMatchById } from '@/data/mockData';
import { Play, PauseCircle, Clock, Gauge, Award } from 'lucide-react';

interface LiveScoreBoardProps {
  matchId: number;
  liveScore: LiveScore;
  className?: string;
}

const LiveScoreBoard: React.FC<LiveScoreBoardProps> = ({ matchId, liveScore, className = '' }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  
  const battingTeam = getTeamById(liveScore.battingTeamId);
  const bowlingTeam = getTeamById(liveScore.bowlingTeamId);
  const match = getMatchById(matchId);
  
  const batsman1 = getPlayerById(liveScore.currentBatsmen[0]);
  const batsman2 = getPlayerById(liveScore.currentBatsmen[1]);
  const bowler = getPlayerById(liveScore.currentBowler);
  
  // Format time in HH:MM:SS
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate match progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  if (!battingTeam || !bowlingTeam || !match || !batsman1 || !batsman2 || !bowler) {
    return <div className="p-6 text-center">Match data not available</div>;
  }
  
  // Calculate current run rate
  const currentRunRate = liveScore.overs > 0 
    ? (liveScore.totalRuns / liveScore.overs).toFixed(2) 
    : '0.00';
  
  // Format overs
  const formatOvers = (overs: number) => {
    const fullOvers = Math.floor(overs);
    const balls = Math.round((overs - fullOvers) * 10);
    return `${fullOvers}.${balls}`;
  };
  
  // Recent balls with color coding
  const getBallClass = (ball: string) => {
    switch(ball) {
      case '4': return 'bg-blue-500 text-white';
      case '6': return 'bg-purple-500 text-white';
      case 'W': return 'bg-red-500 text-white';
      case '0': return 'bg-gray-200 text-gray-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
              <span className="text-xs font-semibold uppercase text-red-500">Live</span>
              <span className="mx-2 text-gray-300">|</span>
              <Clock size={14} className="text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">{currentTime}</span>
            </div>
            <h2 className="text-lg font-semibold mt-1">
              {battingTeam.name} vs {bowlingTeam.name}
            </h2>
            <p className="text-sm text-gray-500">{match.venue}</p>
          </div>
          <div className="flex items-center">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isPlaying 
                ? <PauseCircle size={20} className="text-gray-600" /> 
                : <Play size={20} className="text-gray-600" />
              }
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-bold">
              {liveScore.totalRuns}-{liveScore.wickets}
            </h3>
            <p className="text-sm text-gray-500">
              {formatOvers(liveScore.overs)} Overs
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm">
              <Gauge size={16} className="mr-1 text-gray-500" />
              <span className="text-gray-600">CRR: </span>
              <span className="ml-1 font-medium">{currentRunRate}</span>
            </div>
            {liveScore.requiredRunRate && (
              <div className="flex items-center text-sm mt-1">
                <Gauge size={16} className="mr-1 text-gray-500" />
                <span className="text-gray-600">RRR: </span>
                <span className="ml-1 font-medium">{liveScore.requiredRunRate.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-3">Batsmen</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="font-medium">{batsman1.name}</span>
                </div>
                <span className="font-semibold">75 (42)</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                  <span className="font-medium">{batsman2.name}</span>
                </div>
                <span className="font-semibold">32 (28)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-3">Bowler</h4>
            <div className="flex justify-between items-center">
              <span className="font-medium">{bowler.name}</span>
              <span className="font-semibold">2-28 (3.2)</span>
            </div>
            <div className="mt-3">
              <h4 className="text-xs font-medium text-gray-500 mb-2">This Over</h4>
              <div className="flex space-x-2">
                {liveScore.recentBalls.map((ball, index) => (
                  <div 
                    key={index}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${getBallClass(ball)}`}
                  >
                    {ball}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {liveScore.inning === 2 && liveScore.requiredRuns !== undefined && (
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <p className="text-blue-800 font-medium">
              {bowlingTeam.name} need {liveScore.requiredRuns} runs from {liveScore.remainingBalls} balls
            </p>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-500 mb-3">Commentary</h4>
          <div className="space-y-3 text-sm">
            <div className="flex">
              <span className="text-gray-500 mr-2">15.2</span>
              <p>
                <span className="font-medium">Kumar</span> to <span className="font-medium">Singh</span>, 
                <span className="text-blue-600 font-medium"> FOUR</span>, beautiful cover drive!
              </p>
            </div>
            <div className="flex">
              <span className="text-gray-500 mr-2">15.1</span>
              <p>
                <span className="font-medium">Kumar</span> to <span className="font-medium">Singh</span>, 
                no run, defended back to the bowler.
              </p>
            </div>
            <div className="flex">
              <span className="text-gray-500 mr-2">14.6</span>
              <p>
                <span className="font-medium">Patel</span> to <span className="font-medium">Sharma</span>, 
                <span className="text-red-600 font-medium"> WICKET</span>, caught behind!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveScoreBoard;
