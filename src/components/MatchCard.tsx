
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Match, Team, getTeamById, formatDate } from '@/data/mockData';

interface MatchCardProps {
  match: Match;
  showDetails?: boolean;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, showDetails = true }) => {
  const team1 = getTeamById(match.team1Id);
  const team2 = getTeamById(match.team2Id);

  if (!team1 || !team2) return null;

  const isLive = match.status === 'live';
  const isUpcoming = match.status === 'upcoming';
  const isCompleted = match.status === 'completed';

  const getStatusClass = () => {
    if (isLive) return 'bg-red-500';
    if (isUpcoming) return 'bg-blue-500';
    return 'bg-gray-500';
  };

  const getStatusText = () => {
    if (isLive) return 'LIVE';
    if (isUpcoming) return 'UPCOMING';
    return 'COMPLETED';
  };

  const date = new Date(match.date);
  const formattedDate = formatDate(match.date);
  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div 
      className={`rounded-lg overflow-hidden transition-all card-hover ${
        isLive 
          ? 'border-2 border-red-500 shadow-lg' 
          : 'border border-gray-200 shadow'
      }`}
    >
      <div className="relative">
        <div className="p-4 bg-white">
          <div className="flex justify-between items-center mb-3">
            <span 
              className={`text-xs font-bold text-white px-2 py-1 rounded ${getStatusClass()}`}
            >
              {getStatusText()}
            </span>
            {isToday && !isLive && (
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                TODAY
              </span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center w-5/12">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${team1.primaryColor}20` }}
              >
                <span className="text-lg font-bold" style={{ color: team1.primaryColor }}>
                  {team1.shortName}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-center">{team1.name}</h3>
            </div>

            <div className="flex flex-col items-center w-2/12">
              <span className="text-sm font-bold mb-1">VS</span>
              {isLive && (
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </div>

            <div className="flex flex-col items-center w-5/12">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${team2.primaryColor}20` }}
              >
                <span className="text-lg font-bold" style={{ color: team2.primaryColor }}>
                  {team2.shortName}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-center">{team2.name}</h3>
            </div>
          </div>

          {isCompleted && (
            <div className="mt-4 text-center text-sm font-medium text-gray-800 bg-gray-50 py-2 rounded">
              {match.result}
            </div>
          )}

          {showDetails && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2 text-gray-400" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-2 text-gray-400" />
                  <span>{match.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-2 text-gray-400" />
                  <span>{match.venue}</span>
                </div>
              </div>
            </div>
          )}

          {isLive && (
            <div className="mt-4">
              <Link 
                to={`/live-score?matchId=${match.id}`}
                className="block w-full text-center bg-cricket-500 hover:bg-cricket-600 text-white py-2 rounded-md transition-colors"
              >
                Watch Live
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
