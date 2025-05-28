export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  time: string;
  league: string;
  valueRating: number;
  predictions: Array<{
    type: string;
    description: string;
    odds: string;
    confidence: number;
  }>;
}

export const games: Game[] = [
  {
    id: '1',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    homeTeamLogo: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg',
    awayTeamLogo: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg',
    time: '8:00 PM ET',
    league: 'NBA',
    valueRating: 85,
    predictions: [
      {
        type: 'Player Prop',
        description: 'LeBron James Over 25.5 Points',
        odds: '+110',
        confidence: 78
      },
      {
        type: 'Team Total',
        description: 'Lakers Over 112.5 Points',
        odds: '-105',
        confidence: 82
      }
    ]
  },
  {
    id: '2',
    homeTeam: 'Celtics',
    awayTeam: 'Heat',
    homeTeamLogo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
    awayTeamLogo: 'https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg',
    time: '7:30 PM ET',
    league: 'NBA',
    valueRating: 92,
    predictions: [
      {
        type: 'Spread',
        description: 'Celtics -4.5',
        odds: '-110',
        confidence: 85
      },
      {
        type: 'Player Prop',
        description: 'Jayson Tatum Over 27.5 Points',
        odds: '+105',
        confidence: 79
      }
    ]
  },
  {
    id: '3',
    homeTeam: 'Chiefs',
    awayTeam: 'Bills',
    homeTeamLogo: 'https://static.www.nfl.com/image/private/t_headshot_desktop/league/u9fltoslqdsyao8cpm0k',
    awayTeamLogo: 'https://static.www.nfl.com/image/private/t_headshot_desktop/league/giphcy6ie9mxmyvidzwd',
    time: '1:00 PM ET',
    league: 'NFL',
    valueRating: 88,
    predictions: [
      {
        type: 'Total',
        description: 'Over 47.5 Points',
        odds: '-115',
        confidence: 83
      },
      {
        type: 'Player Prop',
        description: 'Patrick Mahomes Over 2.5 TD Passes',
        odds: '+120',
        confidence: 76
      }
    ]
  },
  {
    id: '4',
    homeTeam: 'Cowboys',
    awayTeam: 'Eagles',
    homeTeamLogo: 'https://static.www.nfl.com/image/private/t_headshot_desktop/league/cteh8jkk4lqz8qz2d4wq',
    awayTeamLogo: 'https://static.www.nfl.com/image/private/t_headshot_desktop/league/puhrqgj71gobgdkdo6uq',
    time: '4:25 PM ET',
    league: 'NFL',
    valueRating: 76,
    predictions: [
      {
        type: 'Spread',
        description: 'Eagles -3.5',
        odds: '-108',
        confidence: 72
      },
      {
        type: 'Player Prop',
        description: 'Dak Prescott Over 275.5 Passing Yards',
        odds: '+115',
        confidence: 68
      }
    ]
  },
  {
    id: '5',
    homeTeam: 'Dodgers',
    awayTeam: 'Padres',
    homeTeamLogo: 'https://www.mlbstatic.com/team-logos/119.svg',
    awayTeamLogo: 'https://www.mlbstatic.com/team-logos/135.svg',
    time: '10:10 PM ET',
    league: 'MLB',
    valueRating: 81,
    predictions: [
      {
        type: 'Moneyline',
        description: 'Dodgers ML',
        odds: '-140',
        confidence: 74
      },
      {
        type: 'Player Prop',
        description: 'Mookie Betts Over 1.5 Hits',
        odds: '+130',
        confidence: 77
      }
    ]
  },
  {
    id: '6',
    homeTeam: 'Yankees',
    awayTeam: 'Red Sox',
    homeTeamLogo: 'https://www.mlbstatic.com/team-logos/147.svg',
    awayTeamLogo: 'https://www.mlbstatic.com/team-logos/111.svg',
    time: '7:05 PM ET',
    league: 'MLB',
    valueRating: 79,
    predictions: [
      {
        type: 'Total',
        description: 'Over 9.5 Runs',
        odds: '-105',
        confidence: 71
      },
      {
        type: 'Player Prop',
        description: 'Aaron Judge Over 1.5 Total Bases',
        odds: '+110',
        confidence: 75
      }
    ]
  }
];

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};

export const getGamesByLeague = (league: string): Game[] => {
  return games.filter(game => game.league === league);
};