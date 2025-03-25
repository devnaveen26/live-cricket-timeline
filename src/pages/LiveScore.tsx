
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LiveScoreBoard from '@/components/LiveScoreBoard';
import MatchCard from '@/components/MatchCard';
import { matches, liveScore, getLiveMatches, getMatchById } from '@/data/mockData';
import { Message, MessageSquare, Users, Zap } from 'lucide-react';

const LiveScore = () => {
  const [searchParams] = useSearchParams();
  const [selectedMatchId, setSelectedMatchId] = useState<number>(0);
  const [liveMatches, setLiveMatches] = useState(getLiveMatches());
  const [commentaryInput, setCommentaryInput] = useState('');
  const [comments, setComments] = useState<{ user: string; text: string; time: string }[]>([
    { user: 'CricketFan01', text: 'What a magnificent six by Singh!', time: '3 min ago' },
    { user: 'BowlingExpert', text: 'Kumar is in great form today', time: '5 min ago' },
    { user: 'StatGuru', text: 'That\'s the 5th boundary in this over!', time: '7 min ago' },
  ]);
  
  useEffect(() => {
    const matchId = searchParams.get('matchId');
    if (matchId) {
      setSelectedMatchId(parseInt(matchId));
    } else if (liveMatches.length > 0) {
      setSelectedMatchId(liveMatches[0].id);
    }
  }, [searchParams]);
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentaryInput.trim()) return;
    
    setComments([
      { 
        user: 'You', 
        text: commentaryInput, 
        time: 'Just now' 
      },
      ...comments
    ]);
    setCommentaryInput('');
  };
  
  // If there are no live matches
  if (liveMatches.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <main className="flex-grow pt-16">
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="heading-lg mb-4">Live Scores</h1>
                <p className="text-lg opacity-90">
                  Stay updated with ball-by-ball coverage of ongoing matches
                </p>
              </div>
            </div>
            <div className="h-16 bg-gradient-to-b from-blue-800/0 to-gray-50"></div>
          </section>
          
          <section className="py-16">
            <div className="container mx-auto px-4 text-center">
              <Zap size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No Live Matches Right Now</h2>
              <p className="text-gray-600 max-w-lg mx-auto mb-6">
                There are no matches being played at the moment. Check back later or view upcoming matches.
              </p>
              <a href="/schedule" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View Match Schedule
              </a>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  // If a match is selected or there's at least one live match
  const currentMatch = getMatchById(selectedMatchId) || liveMatches[0];
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-500 text-white text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></span>
                LIVE NOW
              </div>
              <h1 className="heading-lg mb-4">Live Match Coverage</h1>
              <p className="text-lg opacity-90">
                Ball-by-ball updates and live commentary
              </p>
            </div>
          </div>
          <div className="h-16 bg-gradient-to-b from-blue-800/0 to-gray-50"></div>
        </section>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            {liveMatches.length > 1 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Select a Live Match</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {liveMatches.map(match => (
                    <div
                      key={match.id}
                      className={`cursor-pointer transition-all ${
                        selectedMatchId === match.id 
                          ? 'ring-2 ring-blue-500 scale-[1.02]' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedMatchId(match.id)}
                    >
                      <MatchCard match={match} showDetails={false} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <LiveScoreBoard matchId={currentMatch.id} liveScore={liveScore} className="mb-6" />
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <MessageSquare size={20} className="mr-2 text-blue-600" /> Live Commentary
                  </h3>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-blue-800">Commentator</span>
                        <span className="text-xs text-gray-500">Just now</span>
                      </div>
                      <p className="text-blue-900">
                        FOUR! Beautiful cover drive by Singh, finds the gap perfectly!
                      </p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-blue-800">Commentator</span>
                        <span className="text-xs text-gray-500">1 min ago</span>
                      </div>
                      <p className="text-blue-900">
                        Kumar comes in to bowl his 4th over. He's been excellent today with figures of 2-28 so far.
                      </p>
                    </div>
                    
                    {comments.map((comment, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{comment.user}</span>
                          <span className="text-xs text-gray-500">{comment.time}</span>
                        </div>
                        <p>{comment.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleSubmitComment} className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add your commentary..."
                      value={commentaryInput}
                      onChange={(e) => setCommentaryInput(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Users size={20} className="mr-2 text-blue-600" /> Match Info
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Venue</span>
                      <span className="font-medium">{currentMatch.venue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">{new Date(currentMatch.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time</span>
                      <span className="font-medium">{currentMatch.time}</span>
                    </div>
                    {currentMatch.tossWinner && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Toss</span>
                        <span className="font-medium">
                          {getMatchById(currentMatch.tossWinner)?.name} ({currentMatch.tossDecision})
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="font-medium mb-3">Key Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Run Rate</span>
                        <span className="font-medium">{(liveScore.totalRuns / liveScore.overs).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Projected Score</span>
                        <span className="font-medium">{Math.round(liveScore.totalRuns / liveScore.overs * 20)}-{liveScore.wickets + 2}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Partnership</span>
                        <span className="font-medium">42 (28)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold mb-4">Match Prediction</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Royal Challengers</span>
                        <span>65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Coastal Titans</span>
                        <span>35%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-2">
                      Prediction based on current match situation, team form, and head-to-head records.
                    </p>
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Zap size={18} className="text-red-600 mr-2" />
                    <h3 className="text-lg font-semibold text-red-800">Live Updates</h3>
                  </div>
                  
                  <div className="space-y-2 text-sm text-red-800">
                    <p>• Singh reaches his half-century in just 28 balls!</p>
                    <p>• Titans bring on their star bowler for a crucial spell</p>
                    <p>• Kumar picks up his second wicket of the match</p>
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

export default LiveScore;
