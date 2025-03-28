export type Team = {
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
};

export type Player = {
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
};

export type Match = {
  id: number;
  team1Id: number;
  team2Id: number;
  venue: string;
  date: string;
  time: string;
  result: string;
  status: "upcoming" | "live" | "completed";
  tossWinner?: number;
  tossDecision?: "bat" | "field";
  motm?: number; // player of the match
};

export type LiveScore = {
  id?: number;
  matchId: number;
  inning: number;
  battingTeamId: number;
  bowlingTeamId: number;
  totalRuns: number;
  wickets: number;
  overs: number;
  currentBatsmenId: number;
  currentBowlerId: number;
  currentBall: string;
  requiredRunRate?: number;
  requiredRuns?: number;
  remainingBalls?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SponsorAd = {
  id: number;
  name: string;
  logo: string;
  url: string;
  type: "main" | "partner" | "associate";
};

export type NewsItem = {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
  author: string;
};

export type GalleryImage = {
  id: number;
  image: string;
  caption: string;
  date: string;
  tags: string[];
  matchId?: number;
};

export type FeatureSection = {
  title: string;
  subtitle: string;
  icon: any;
  link: string;
};
