import { Player, Team, Match } from "@/lib/types";

// Helper function to get team by ID
export const getTeamById = (id: number): Team | undefined => {
  //   return teams.find((team) => team.id === id);
  return undefined;
};

// Helper function to get player by ID
export const getPlayerById = (id: number): Player | undefined => {
  //   return players.find((player) => player.id === id);
  return undefined;
};

// Helper function to get player by team ID
export const getPlayersByTeamId = (teamId: number): Player[] => {
  //   return players.filter((player) => player.teamId === teamId);
  return [];
};

// Helper function to get match by ID
export const getMatchById = (id: number): Match | undefined => {
  //   return matches.find((match) => match.id === id);
  return undefined;
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to get upcoming matches
export const getUpcomingMatches = (): Match[] => {
  //   return matches.filter((match) => match.status === "upcoming");
  return [];
};

// Helper function to get completed matches
export const getCompletedMatches = (): Match[] => {
  //   return matches.filter((match) => match.status === "completed");
  return [];
};

// Helper function to get live matches
export const getLiveMatches = (): Match[] => {
  //   return matches.filter((match) => match.status === "live");
  return [];
};
