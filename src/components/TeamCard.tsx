
import React from 'react';
import { Link } from 'react-router-dom';
import { Team, getPlayerById } from '@/data/mockData';
import { Trophy, Users } from 'lucide-react';

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const captain = getPlayerById(team.captain);
  
  return (
    <Link to={`/teams/${team.id}`}>
      <div 
        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all card-hover relative h-full"
      >
        <div 
          className="h-3"
          style={{ backgroundColor: team.primaryColor }}
        ></div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${team.primaryColor}20` }}
            >
              <span className="text-lg font-bold" style={{ color: team.primaryColor }}>
                {team.shortName}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-700 flex items-center">
                <Trophy size={14} className="mr-1" /> Rank #{team.id}
              </span>
              <span className="text-sm font-medium text-gray-700 flex items-center mt-1">
                <Users size={14} className="mr-1" /> Players: 11
              </span>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
          
          <div className="text-gray-500 mb-4 line-clamp-2 text-sm">
            {team.description}
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="flex flex-col">
              <span className="text-gray-500">Captain</span>
              <span className="font-medium">{captain?.name || 'Unknown'}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-gray-500">Home Ground</span>
              <span className="font-medium">{team.homeGround}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold">{team.matches}</div>
              <div className="text-xs text-gray-500">Matches</div>
            </div>
            <div>
              <div className="text-lg font-bold">{team.won}</div>
              <div className="text-xs text-gray-500">Won</div>
            </div>
            <div>
              <div className="text-lg font-bold">{team.points}</div>
              <div className="text-xs text-gray-500">Points</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;
