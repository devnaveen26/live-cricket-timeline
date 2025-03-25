
import React from 'react';
import { Link } from 'react-router-dom';
import { Player, Team, getTeamById } from '@/data/mockData';
import { Award, TrendingUp } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  showTeam?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, showTeam = true }) => {
  const team = getTeamById(player.teamId);
  
  if (!team) return null;
  
  // Determine if the player is a top performer based on runs or wickets
  const isTopBatsman = player.runs > 3000;
  const isTopBowler = player.wickets > 100;
  
  return (
    <Link to={`/players/${player.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full card-hover">
        <div className="relative">
          <div 
            className="h-32 bg-gradient-to-r"
            style={{ 
              backgroundImage: `linear-gradient(to right, ${team.primaryColor}, ${team.secondaryColor})`,
              opacity: 0.8
            }}
          ></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-gray-200">
              <img 
                src={player.image} 
                alt={player.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {(isTopBatsman || isTopBowler) && (
            <div className="absolute top-3 right-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-md">
                <Award size={18} className="text-yellow-500" />
              </div>
            </div>
          )}
        </div>
        
        <div className="pt-4 p-5 text-center">
          <h3 className="text-lg font-semibold mb-1">{player.name}</h3>
          
          {showTeam && (
            <p className="text-sm text-gray-600 mb-2">
              {team.name} • {player.role}
            </p>
          )}
          
          {!showTeam && (
            <p className="text-sm text-gray-600 mb-2">
              {player.role} • {player.battingStyle}
            </p>
          )}
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            {player.role === 'Batsman' || player.role === 'All-rounder' || player.role === 'Wicketkeeper' ? (
              <>
                <div>
                  <div className="text-2xl font-bold">{player.runs}</div>
                  <div className="text-xs text-gray-500">RUNS</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{player.average.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">AVG</div>
                </div>
              </>
            ) : null}
            
            {player.role === 'Bowler' || player.role === 'All-rounder' ? (
              <>
                <div>
                  <div className="text-2xl font-bold">{player.wickets}</div>
                  <div className="text-xs text-gray-500">WICKETS</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{player.economy.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">ECO</div>
                </div>
              </>
            ) : null}
          </div>
          
          {player.role === 'All-rounder' && (
            <div className="mt-2 text-xs text-center py-1 bg-gray-50 rounded text-gray-600 flex items-center justify-center">
              <TrendingUp size={12} className="mr-1" />
              All-round Performance Index: {((player.runs/100) + (player.wickets*2)).toFixed(1)}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;
