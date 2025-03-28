
import { 
  Shield, 
  Trophy, 
  User, 
  Calendar, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Award, 
  Target,
  Zap
} from 'lucide-react';

export interface Team {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
  captain: number; // player ID
  homeGround: string;
  matches: number;
  won: number;
  lost: number;
  tied: number;
  points: number;
  nrr: number;
}

export interface Player {
  id: number;
  name: string;
  image: string;
  teamId: number;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
  nationality: string;
  age: number;
  matches: number;
  runs: number;
  highestScore: number;
  average: number;
  strikeRate: number;
  fifties: number;
  hundreds: number;
  wickets: number;
  economy: number;
  bestBowling: string;
}

export interface Match {
  id: number;
  team1Id: number;
  team2Id: number;
  venue: string;
  date: string;
  time: string;
  result: string;
  status: 'upcoming' | 'live' | 'completed';
  tossWinner?: number;
  tossDecision?: 'bat' | 'field';
  motm?: number; // player of the match
}

export interface LiveScore {
  matchId: number;
  inning: 1 | 2;
  battingTeamId: number;
  bowlingTeamId: number;
  totalRuns: number;
  wickets: number;
  overs: number;
  currentBatsmen: [number, number]; // player IDs of current batsmen
  currentBowler: number; // player ID of current bowler
  recentBalls: string[];
  requiredRunRate?: number;
  requiredRuns?: number;
  remainingBalls?: number;
}

export interface SponsorAd {
  id: number;
  name: string;
  logo: string;
  url: string;
  type: 'main' | 'partner' | 'associate';
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
  author: string;
}

export interface GalleryImage {
  id: number;
  image: string;
  caption: string;
  date: string;
  tags: string[];
  matchId?: number;
}

export interface FeatureSection {
  title: string;
  subtitle: string;
  icon: any;
  link: string;
}
// Mock Teams Data
export const teams: Team[] = [
  {
    id: 1,
    name: "Royal Challengers",
    shortName: "RCB",
    logo: "https://via.placeholder.com/150",
    primaryColor: "#FF0000",
    secondaryColor: "#000000",
    description: "A powerhouse team known for their aggressive batting and dynamic fielding.",
    captain: 1,
    homeGround: "Central Stadium",
    matches: 10,
    won: 7,
    lost: 3,
    tied: 0,
    points: 14,
    nrr: 0.58
  },
  {
    id: 2,
    name: "Super Kings",
    shortName: "CSK",
    logo: "https://via.placeholder.com/150",
    primaryColor: "#FFFF00",
    secondaryColor: "#0000FF",
    description: "A team with a legacy of success, renowned for their strategic play and experience.",
    captain: 5,
    homeGround: "Marina Beach Stadium",
    matches: 10,
    won: 8,
    lost: 2,
    tied: 0,
    points: 16,
    nrr: 0.95
  },
  {
    id: 3,
    name: "Metro Riders",
    shortName: "MR",
    logo: "https://via.placeholder.com/150",
    primaryColor: "#800080",
    secondaryColor: "#FFFFFF",
    description: "The newest franchise known for their innovative tactics and young talent.",
    captain: 9,
    homeGround: "Metro Arena",
    matches: 10,
    won: 5,
    lost: 5,
    tied: 0,
    points: 10,
    nrr: 0.12
  },
  {
    id: 4,
    name: "Capital Warriors",
    shortName: "CW",
    logo: "https://via.placeholder.com/150",
    primaryColor: "#0000FF",
    secondaryColor: "#FF0000",
    description: "A balanced team with strong domestic talent and strategic overseas players.",
    captain: 13,
    homeGround: "Capital Stadium",
    matches: 10,
    won: 6,
    lost: 4,
    tied: 0,
    points: 12,
    nrr: 0.35
  },
  {
    id: 5,
    name: "Coastal Titans",
    shortName: "CT",
    logo: "https://via.placeholder.com/150",
    primaryColor: "#00FFFF",
    secondaryColor: "#000000",
    description: "Known for their excellent bowling attack and fielding standards.",
    captain: 17,
    homeGround: "Coastal Arena",
    matches: 10,
    won: 4,
    lost: 6,
    tied: 0,
    points: 8,
    nrr: -0.1
  },
  {
    id: 6,
    name: "Eastern Eagles",
    shortName: "EE",
    logo: "https://via.placeholder.com/150",
    primaryColor: "#008000",
    secondaryColor: "#FFFFFF",
    description: "A team that emphasizes on team spirit and all-round performance.",
    captain: 21,
    homeGround: "Eastern Park",
    matches: 10,
    won: 3,
    lost: 6,
    tied: 1,
    points: 7,
    nrr: -0.28
  },
  {
    id: 7,
    name: "Northern Knights",
    shortName: "NK",
    logo: "https://via.placeholder.com/150",
    primaryColor: "#000000",
    secondaryColor: "#FFFFFF",
    description: "A team with a rich cricket culture and passionate fanbase.",
    captain: 25,
    homeGround: "Northern Stadium",
    matches: 10,
    won: 4,
    lost: 5,
    tied: 1,
    points: 9,
    nrr: -0.05
  },
  {
    id: 8,
    name: "Western Wolves",
    shortName: "WW",
    logo: "https://via.placeholder.com/150",
    primaryColor: "#FFA500",
    secondaryColor: "#000000",
    description: "Known for their resilience and comebacks from challenging situations.",
    captain: 29,
    homeGround: "Western Ground",
    matches: 10,
    won: 3,
    lost: 7,
    tied: 0,
    points: 6,
    nrr: -0.42
  }
];

// Mock Players Data (4 players per team)
export const players: Player[] = [
  // Team 1 - Royal Challengers
  {
    id: 1,
    name: "Virat Singh",
    image: "https://via.placeholder.com/300",
    teamId: 1,
    role: "Batsman",
    battingStyle: "Right Handed",
    bowlingStyle: "Right Arm Medium",
    nationality: "Indian",
    age: 32,
    matches: 142,
    runs: 6800,
    highestScore: 121,
    average: 48.92,
    strikeRate: 145.8,
    fifties: 45,
    hundreds: 5,
    wickets: 0,
    economy: 0,
    bestBowling: "0/0"
  },
  {
    id: 2,
    name: "Dale Peters",
    image: "https://via.placeholder.com/300",
    teamId: 1,
    role: "Bowler",
    battingStyle: "Right Handed",
    bowlingStyle: "Right Arm Fast",
    nationality: "South African",
    age: 29,
    matches: 98,
    runs: 450,
    highestScore: 35,
    average: 12.5,
    strikeRate: 120.5,
    fifties: 0,
    hundreds: 0,
    wickets: 135,
    economy: 7.8,
    bestBowling: "5/25"
  },
  {
    id: 3,
    name: "Krishna Kumar",
    image: "https://via.placeholder.com/300",
    teamId: 1,
    role: "All-rounder",
    battingStyle: "Left Handed",
    bowlingStyle: "Left Arm Orthodox",
    nationality: "Indian",
    age: 27,
    matches: 85,
    runs: 1850,
    highestScore: 95,
    average: 32.4,
    strikeRate: 138.2,
    fifties: 12,
    hundreds: 0,
    wickets: 78,
    economy: 8.1,
    bestBowling: "4/28"
  },
  {
    id: 4,
    name: "Aaron Wright",
    image: "https://via.placeholder.com/300",
    teamId: 1,
    role: "Wicketkeeper",
    battingStyle: "Right Handed",
    bowlingStyle: "-",
    nationality: "Australian",
    age: 30,
    matches: 110,
    runs: 3200,
    highestScore: 105,
    average: 36.5,
    strikeRate: 142.5,
    fifties: 22,
    hundreds: 2,
    wickets: 0,
    economy: 0,
    bestBowling: "0/0"
  },
  // Team 2 - Super Kings
  {
    id: 5,
    name: "Mahendra Dhoni",
    image: "https://via.placeholder.com/300",
    teamId: 2,
    role: "Wicketkeeper",
    battingStyle: "Right Handed",
    bowlingStyle: "Right Arm Medium",
    nationality: "Indian",
    age: 40,
    matches: 220,
    runs: 4800,
    highestScore: 84,
    average: 38.5,
    strikeRate: 137.5,
    fifties: 23,
    hundreds: 0,
    wickets: 0,
    economy: 0,
    bestBowling: "0/0"
  },
  {
    id: 6,
    name: "Ravindra Jadeja",
    image: "https://via.placeholder.com/300",
    teamId: 2,
    role: "All-rounder",
    battingStyle: "Left Handed",
    bowlingStyle: "Left Arm Orthodox",
    nationality: "Indian",
    age: 32,
    matches: 185,
    runs: 2400,
    highestScore: 62,
    average: 26.5,
    strikeRate: 140.2,
    fifties: 10,
    hundreds: 0,
    wickets: 125,
    economy: 7.5,
    bestBowling: "5/16"
  },
  {
    id: 7,
    name: "Faf du Plessis",
    image: "https://via.placeholder.com/300",
    teamId: 2,
    role: "Batsman",
    battingStyle: "Right Handed",
    bowlingStyle: "Right Arm Medium",
    nationality: "South African",
    age: 36,
    matches: 190,
    runs: 5600,
    highestScore: 95,
    average: 41.2,
    strikeRate: 132.8,
    fifties: 38,
    hundreds: 0,
    wickets: 0,
    economy: 0,
    bestBowling: "0/0"
  },
  {
    id: 8,
    name: "Deepak Chahar",
    image: "https://via.placeholder.com/300",
    teamId: 2,
    role: "Bowler",
    battingStyle: "Right Handed",
    bowlingStyle: "Right Arm Medium",
    nationality: "Indian",
    age: 29,
    matches: 95,
    runs: 320,
    highestScore: 22,
    average: 10.5,
    strikeRate: 120.8,
    fifties: 0,
    hundreds: 0,
    wickets: 110,
    economy: 8.2,
    bestBowling: "4/13"
  },
  // Continuing with more players for other teams...
  {
    id: 9,
    name: "Rishabh Pant",
    image: "https://via.placeholder.com/300",
    teamId: 3,
    role: "Wicketkeeper",
    battingStyle: "Left Handed",
    bowlingStyle: "-",
    nationality: "Indian",
    age: 24,
    matches: 95,
    runs: 3200,
    highestScore: 128,
    average: 35.6,
    strikeRate: 150.2,
    fifties: 15,
    hundreds: 2,
    wickets: 0,
    economy: 0,
    bestBowling: "0/0"
  },
  // Add more players as needed...
  {
    id: 13,
    name: "Shreyas Iyer",
    image: "https://via.placeholder.com/300",
    teamId: 4,
    role: "Batsman",
    battingStyle: "Right Handed",
    bowlingStyle: "Right Arm Off Break",
    nationality: "Indian",
    age: 27,
    matches: 110,
    runs: 3400,
    highestScore: 96,
    average: 31.5,
    strikeRate: 130.8,
    fifties: 22,
    hundreds: 0,
    wickets: 5,
    economy: 9.2,
    bestBowling: "1/16"
  },
  {
    id: 17,
    name: "Kagiso Rabada",
    image: "https://via.placeholder.com/300",
    teamId: 5,
    role: "Bowler",
    battingStyle: "Right Handed",
    bowlingStyle: "Right Arm Fast",
    nationality: "South African",
    age: 26,
    matches: 105,
    runs: 380,
    highestScore: 28,
    average: 12.5,
    strikeRate: 125.8,
    fifties: 0,
    hundreds: 0,
    wickets: 155,
    economy: 8.1,
    bestBowling: "4/21"
  },
  {
    id: 21,
    name: "Andre Russell",
    image: "https://via.placeholder.com/300",
    teamId: 6,
    role: "All-rounder",
    battingStyle: "Right Handed",
    bowlingStyle: "Right Arm Fast Medium",
    nationality: "West Indian",
    age: 33,
    matches: 150,
    runs: 2800,
    highestScore: 88,
    average: 28.5,
    strikeRate: 180.2,
    fifties: 15,
    hundreds: 0,
    wickets: 90,
    economy: 9.8,
    bestBowling: "3/15"
  },
  {
    id: 25,
    name: "Babar Azam",
    image: "https://via.placeholder.com/300",
    teamId: 7,
    role: "Batsman",
    battingStyle: "Right Handed",
    bowlingStyle: "Right Arm Off Break",
    nationality: "Pakistani",
    age: 27,
    matches: 120,
    runs: 4200,
    highestScore: 105,
    average: 42.8,
    strikeRate: 128.5,
    fifties: 32,
    hundreds: 3,
    wickets: 2,
    economy: 10.2,
    bestBowling: "1/8"
  },
  {
    id: 29,
    name: "Trent Boult",
    image: "https://via.placeholder.com/300",
    teamId: 8,
    role: "Bowler",
    battingStyle: "Right Handed",
    bowlingStyle: "Left Arm Fast",
    nationality: "New Zealander",
    age: 32,
    matches: 130,
    runs: 450,
    highestScore: 25,
    average: 12.8,
    strikeRate: 125.5,
    fifties: 0,
    hundreds: 0,
    wickets: 175,
    economy: 7.9,
    bestBowling: "5/19"
  },
];

// Mock Matches Data
export const matches: Match[] = [
  {
    id: 1,
    team1Id: 1,
    team2Id: 2,
    venue: "Central Stadium",
    date: "2023-06-01",
    time: "19:30",
    result: "Super Kings won by 5 wickets",
    status: "completed",
    tossWinner: 1,
    tossDecision: "bat",
    motm: 6
  },
  {
    id: 2,
    team1Id: 3,
    team2Id: 4,
    venue: "Metro Arena",
    date: "2023-06-02",
    time: "19:30",
    result: "Capital Warriors won by 8 runs",
    status: "completed",
    tossWinner: 3,
    tossDecision: "bat",
    motm: 13
  },
  {
    id: 3,
    team1Id: 5,
    team2Id: 6,
    venue: "Coastal Arena",
    date: "2023-06-03",
    time: "15:30",
    result: "Coastal Titans won by 25 runs",
    status: "completed",
    tossWinner: 5,
    tossDecision: "bat",
    motm: 17
  },
  {
    id: 4,
    team1Id: 7,
    team2Id: 8,
    venue: "Northern Stadium",
    date: "2023-06-03",
    time: "19:30",
    result: "Northern Knights won by 6 wickets",
    status: "completed",
    tossWinner: 8,
    tossDecision: "bat",
    motm: 25
  },
  {
    id: 5,
    team1Id: 2,
    team2Id: 3,
    venue: "Marina Beach Stadium",
    date: "2023-06-04",
    time: "19:30",
    result: "Super Kings won by 34 runs",
    status: "completed",
    tossWinner: 2,
    tossDecision: "bat",
    motm: 7
  },
  {
    id: 6,
    team1Id: 1,
    team2Id: 7,
    venue: "Central Stadium",
    date: "2023-06-21",
    time: "19:30",
    result: "",
    status: "upcoming"
  },
  {
    id: 7,
    team1Id: 4,
    team2Id: 6,
    venue: "Capital Stadium",
    date: "2023-06-22",
    time: "19:30",
    result: "",
    status: "upcoming"
  },
  {
    id: 8,
    team1Id: 5,
    team2Id: 8,
    venue: "Coastal Arena",
    date: "2023-06-23",
    time: "15:30",
    result: "",
    status: "upcoming"
  },
  {
    id: 9,
    team1Id: 2,
    team2Id: 8,
    venue: "Marina Beach Stadium",
    date: "2023-06-24",
    time: "19:30",
    result: "",
    status: "upcoming"
  },
  {
    id: 10,
    team1Id: 1,
    team2Id: 5,
    venue: "Central Stadium",
    date: "2023-06-20",
    time: "19:30",
    result: "",
    status: "live"
  }
];

// Current Live Score
export const liveScore: LiveScore = {
  matchId: 10,
  inning: 1,
  battingTeamId: 1,
  bowlingTeamId: 5,
  totalRuns: 156,
  wickets: 4,
  overs: 15.2,
  currentBatsmen: [1, 3],
  currentBowler: 17,
  recentBalls: ["1", "W", "4", "0", "6", "2"],
  requiredRunRate: 0,
  requiredRuns: 0,
  remainingBalls: 0
};

// Mock Sponsors
export const sponsors: SponsorAd[] = [
  {
    id: 1,
    name: "GreenTech Solutions",
    logo: "https://via.placeholder.com/200",
    url: "#",
    type: "main"
  },
  {
    id: 2,
    name: "Metro Bank",
    logo: "https://via.placeholder.com/200",
    url: "#",
    type: "partner"
  },
  {
    id: 3,
    name: "Coastal Airlines",
    logo: "https://via.placeholder.com/200",
    url: "#",
    type: "partner"
  },
  {
    id: 4,
    name: "PowerDrink",
    logo: "https://via.placeholder.com/200",
    url: "#",
    type: "associate"
  },
  {
    id: 5,
    name: "SportGear",
    logo: "https://via.placeholder.com/200",
    url: "#",
    type: "associate"
  }
];

// Mock News Items
export const news: NewsItem[] = [
  {
    id: 1,
    title: "Royal Challengers sign international star for upcoming season",
    content: "The Royal Challengers franchise has secured the services of international cricket star...",
    image: "https://via.placeholder.com/400",
    date: "2023-05-15",
    author: "Cricket Reporter"
  },
  {
    id: 2,
    title: "Super Kings unveil new team jersey for tournament",
    content: "The Super Kings have revealed their new team jersey for the upcoming cricket tournament...",
    image: "https://via.placeholder.com/400",
    date: "2023-05-18",
    author: "Sports News"
  },
  {
    id: 3,
    title: "Metro Riders announce new head coach",
    content: "The Metro Riders franchise has appointed a former international cricketer as their new head coach...",
    image: "https://via.placeholder.com/400",
    date: "2023-05-20",
    author: "Cricket Reporter"
  }
];

// Mock Gallery Images
export const gallery: GalleryImage[] = [
  {
    id: 1,
    image: "https://via.placeholder.com/800x600",
    caption: "Virat Singh's match-winning century against Super Kings",
    date: "2023-05-10",
    tags: ["batting", "century", "match highlight"],
    matchId: 1
  },
  {
    id: 2,
    image: "https://via.placeholder.com/800x600",
    caption: "Dale Peters' spectacular bowling spell",
    date: "2023-05-12",
    tags: ["bowling", "wickets", "match highlight"],
    matchId: 2
  },
  {
    id: 3,
    image: "https://via.placeholder.com/800x600",
    caption: "Tournament opening ceremony",
    date: "2023-05-01",
    tags: ["ceremony", "opening"]
  },
  {
    id: 4,
    image: "https://via.placeholder.com/800x600",
    caption: "Fans cheering at Central Stadium",
    date: "2023-05-15",
    tags: ["fans", "stadium"]
  },
  {
    id: 5,
    image: "https://via.placeholder.com/800x600",
    caption: "Mahendra Dhoni's match-winning six",
    date: "2023-05-20",
    tags: ["batting", "six", "match highlight"],
    matchId: 5
  }
];

// Feature sections for homepage
export const featureSections: FeatureSection[] = [
  {
    title: "Teams & Players",
    subtitle: "Explore all participating teams and player profiles",
    icon: Shield,
    link: "/teams"
  },
  {
    title: "Match Schedule",
    subtitle: "View upcoming matches and past results",
    icon: Calendar,
    link: "/schedule"
  },
  {
    title: "Live Scores",
    subtitle: "Follow ball-by-ball updates of ongoing matches",
    icon: Zap,
    link: "/live-score"
  },
  {
    title: "Leaderboard",
    subtitle: "Track team standings and player statistics",
    icon: TrendingUp,
    link: "/leaderboard"
  },
  {
    title: "Player Stats",
    subtitle: "In-depth statistics of all players",
    icon: User,
    link: "/players"
  },
  {
    title: "Awards Gallery",
    subtitle: "Celebrate the best moments and performances",
    icon: Trophy,
    link: "/gallery"
  }
];

// Helper function to get team by ID
export const getTeamById = (id: number): Team | undefined => {
  return teams.find(team => team.id === id);
};

// Helper function to get player by ID
export const getPlayerById = (id: number): Player | undefined => {
  return players.find(player => player.id === id);
};

// Helper function to get player by team ID
export const getPlayersByTeamId = (teamId: number): Player[] => {
  return players.filter(player => player.teamId === teamId);
};

// Helper function to get match by ID
export const getMatchById = (id: number): Match | undefined => {
  return matches.find(match => match.id === id);
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to get upcoming matches
export const getUpcomingMatches = (): Match[] => {
  return matches.filter(match => match.status === 'upcoming');
};

// Helper function to get completed matches
export const getCompletedMatches = (): Match[] => {
  return matches.filter(match => match.status === 'completed');
};

// Helper function to get live matches
export const getLiveMatches = (): Match[] => {
  return matches.filter(match => match.status === 'live');
};
