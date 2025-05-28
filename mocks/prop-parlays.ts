export interface PropParlay {
  id: string;
  sport: string;
  title: string;
  date: string;
  successRate: number;
  props: {
    player: string;
    team: string;
    stat: string;
    line: string;
    hitRate: number;
  }[];
}

export const propParlays: PropParlay[] = [
  {
    id: '1',
    sport: 'NBA',
    title: 'NBA Scoring Trio (May 27, 2025)',
    date: 'May 27, 2025',
    successRate: 65,
    props: [
      {
        player: 'Jayson Tatum',
        team: 'Boston Celtics',
        stat: 'Points',
        line: '28.5 Over',
        hitRate: 78
      },
      {
        player: 'Anthony Edwards',
        team: 'Minnesota Timberwolves',
        stat: 'Points',
        line: '26.5 Over',
        hitRate: 72
      },
      {
        player: 'Luka Dončić',
        team: 'Dallas Mavericks',
        stat: 'Points',
        line: '31.5 Over',
        hitRate: 68
      }
    ]
  },
  {
    id: '2',
    sport: 'NFL',
    title: 'NFL Rushing Combo (May 27, 2025)',
    date: 'May 27, 2025',
    successRate: 58,
    props: [
      {
        player: 'Christian McCaffrey',
        team: 'San Francisco 49ers',
        stat: 'Rushing Yards',
        line: '85.5 Over',
        hitRate: 74
      },
      {
        player: 'Josh Jacobs',
        team: 'Green Bay Packers',
        stat: 'Rushing Yards',
        line: '72.5 Over',
        hitRate: 66
      }
    ]
  },
  {
    id: '3',
    sport: 'MLB',
    title: 'MLB Home Run Special (May 27, 2025)',
    date: 'May 27, 2025',
    successRate: 72,
    props: [
      {
        player: 'Aaron Judge',
        team: 'New York Yankees',
        stat: 'Home Runs',
        line: '0.5 Over',
        hitRate: 82
      },
      {
        player: 'Ronald Acuña Jr.',
        team: 'Atlanta Braves',
        stat: 'Home Runs',
        line: '0.5 Over',
        hitRate: 76
      },
      {
        player: 'Mike Trout',
        team: 'Los Angeles Angels',
        stat: 'Home Runs',
        line: '0.5 Over',
        hitRate: 71
      }
    ]
  }
];