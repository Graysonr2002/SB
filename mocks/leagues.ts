export interface League {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  isActive: boolean;
}

export const leagues: League[] = [
  {
    id: 'nfl',
    name: 'National Football League',
    shortName: 'NFL',
    icon: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=100&h=100&fit=crop&crop=center',
    color: '#013369',
    isActive: true,
  },
  {
    id: 'nba',
    name: 'National Basketball Association',
    shortName: 'NBA',
    icon: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop&crop=center',
    color: '#C8102E',
    isActive: true,
  },
  {
    id: 'mlb',
    name: 'Major League Baseball',
    shortName: 'MLB',
    icon: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop&crop=center',
    color: '#041E42',
    isActive: true,
  },
  {
    id: 'nhl',
    name: 'National Hockey League',
    shortName: 'NHL',
    icon: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center',
    color: '#000000',
    isActive: true,
  },
  {
    id: 'mls',
    name: 'Major League Soccer',
    shortName: 'MLS',
    icon: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&h=100&fit=crop&crop=center',
    color: '#005DAA',
    isActive: true,
  },
  {
    id: 'ncaaf',
    name: 'College Football',
    shortName: 'NCAAF',
    icon: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=100&h=100&fit=crop&crop=center',
    color: '#FF6B35',
    isActive: true,
  },
];