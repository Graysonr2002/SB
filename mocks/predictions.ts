export interface Prediction {
  id: string;
  title: string;
  description: string;
  odds: string;
  confidence: number;
  type: string;
}

export interface BetInsight {
  id: string;
  gameId: string;
  title: string;
  description: string;
  probability: number;
  bookmakerOdds: number;
  impliedProbability: number;
  valueGap: number;
  confidenceLevel: "high" | "medium" | "low";
  supportingStats: string[];
  historicalTrend: string;
  recommendation: string;
}

// Get current date
const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export const predictions: Prediction[] = [
  {
    id: 'pred-1',
    title: `Chiefs Moneyline Value (${formattedDate})`,
    description: "Our model shows the Chiefs have a 68% chance to win, but the odds imply only a 60% probability.",
    odds: "-150",
    confidence: 85,
    type: "Moneyline"
  },
  {
    id: 'pred-2',
    title: `Celtics Cover ATS (${formattedDate})`,
    description: "Our model gives the Celtics a 75% chance to win by 6+ points, making the -5.5 spread a strong value.",
    odds: "-110",
    confidence: 78,
    type: "Spread"
  },
  {
    id: 'pred-3',
    title: `Yankees Total Runs Over (${formattedDate})`,
    description: "Our model projects the Yankees to score 5.2 runs, making the over 4.5 team total a strong play.",
    odds: "-115",
    confidence: 72,
    type: "Total"
  }
];

export const betInsights: Record<string, BetInsight> = {
  "nfl-1": {
    id: "insight-nfl-1",
    gameId: "nfl-1",
    title: `Chiefs Moneyline Value (${formattedDate})`,
    description: "Our model shows the Chiefs have a 68% chance to win, but the odds imply only a 60% probability.",
    probability: 0.68,
    bookmakerOdds: -150,
    impliedProbability: 0.6,
    valueGap: 0.08,
    confidenceLevel: "high",
    supportingStats: [
      "Chiefs are 8-1 at home this season",
      "Chiefs average 28.5 points per game at home",
      "Mahomes has a 118.7 passer rating in prime time games",
      "Bills defense allowing 24.3 points per game on the road"
    ],
    historicalTrend: "Chiefs have won 72% of home games when Mahomes throws for 300+ yards",
    recommendation: "Bet Chiefs Moneyline at -150 or better"
  },
  "nba-1": {
    id: "insight-nba-1",
    gameId: "nba-1",
    title: `Celtics Cover ATS (${formattedDate})`,
    description: "Our model gives the Celtics a 75% chance to win by 6+ points, making the -5.5 spread a strong value.",
    probability: 0.75,
    bookmakerOdds: -110,
    impliedProbability: 0.52,
    valueGap: 0.23,
    confidenceLevel: "high",
    supportingStats: [
      "Celtics are 18-4 ATS at home this season",
      "Nuggets are 7-12 ATS on the road",
      "Celtics average margin of victory at home is 9.8 points",
      "Nuggets allowing 118.3 points per game on the road"
    ],
    historicalTrend: "Celtics have covered the spread in 82% of games when Tatum scores 30+ points",
    recommendation: "Bet Celtics -5.5 at -110 or better"
  },
  "mlb-1": {
    id: "insight-mlb-1",
    gameId: "mlb-1",
    title: `Yankees Total Runs Over (${formattedDate})`,
    description: "Our model projects the Yankees to score 5.2 runs, making the over 4.5 team total a strong play.",
    probability: 0.65,
    bookmakerOdds: -115,
    impliedProbability: 0.53,
    valueGap: 0.12,
    confidenceLevel: "high",
    supportingStats: [
      "Yankees averaging 5.8 runs per game at home",
      "Red Sox starting pitcher has a 4.85 ERA on the road",
      "Yankees have gone over their team total in 7 of last 10 games",
      "Wind blowing out to right field at 12 mph"
    ],
    historicalTrend: "Yankees have scored 5+ runs in 70% of games when Judge hits a home run",
    recommendation: "Bet Yankees Team Total Over 4.5 Runs at -115 or better"
  },
  "nba-3": {
    id: "insight-nba-3",
    gameId: "nba-3",
    title: `Lakers vs Warriors Total (${formattedDate})`,
    description: "Our model projects 238.5 total points, giving significant value on the over 232.5.",
    probability: 0.68,
    bookmakerOdds: -110,
    impliedProbability: 0.52,
    valueGap: 0.16,
    confidenceLevel: "high",
    supportingStats: [
      "Lakers games have gone over in 12 of their last 15 home games",
      "Warriors are averaging 119.8 points in their last 10 games",
      "Combined average of 236.4 points in their last 5 meetings",
      "Both teams rank in the top 10 in pace of play"
    ],
    historicalTrend: "The over is 9-2 in the last 11 meetings between these teams",
    recommendation: "Bet Over 232.5 at -110 or better"
  },
  "nfl-3": {
    id: "insight-nfl-3",
    gameId: "nfl-3",
    title: `Eagles First Half Spread (${formattedDate})`,
    description: "Our model gives the Eagles a 78% chance to lead by 3+ at halftime, making the -2.5 1H spread a strong value.",
    probability: 0.78,
    bookmakerOdds: -115,
    impliedProbability: 0.53,
    valueGap: 0.25,
    confidenceLevel: "high",
    supportingStats: [
      "Eagles have led at halftime in 9 of 11 home games",
      "Giants have trailed at halftime in 7 of 10 road games",
      "Eagles average 14.2 first half points at home",
      "Giants average just 8.7 first half points on the road"
    ],
    historicalTrend: "Eagles have covered the first half spread in 8 of their last 10 divisional games",
    recommendation: "Bet Eagles 1H -2.5 at -115 or better"
  }
};

export const getBetInsight = (gameId: string): BetInsight | undefined => {
  return betInsights[gameId];
};