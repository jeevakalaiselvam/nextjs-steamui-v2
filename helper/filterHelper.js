export const GAMES_SORT_COMPLETION_ASC = "GAMES_SORT_COMPLETION_ASC";
export const GAMES_SORT_COMPLETION_DESC = "GAMES_SORT_COMPLETION_DESC";
export const GAMES_SORT_NAME_ASC = "GAMES_SORT_NAME_ASC";
export const GAMES_SORT_NAME_DESC = "GAMES_SORT_NAME_DESC";
export const GAMES_SORT_PINNED = "GAMES_SORT_PINNED";
export const GAMES_SORT_STARTED = "GAMES_SORT_STARTED";

export const GAME_VIEWMODE_PLANNER = "GAME_VIEWMODE_PLANNER";
export const GAME_VIEWMODE_JOURNAL = "GAME_VIEWMODE_JOURNAL";

export const GAMES_FILTER_OPTIONS = [
  {
    id: GAMES_SORT_STARTED,
    title: "Filter by Started",
  },
  {
    id: GAMES_SORT_PINNED,
    title: "Filter by Pinned",
  },
  {
    id: GAMES_SORT_COMPLETION_DESC,
    title: "Filter by Completion [High to Low]",
  },
  {
    id: GAMES_SORT_COMPLETION_ASC,
    title: "Filter by Completion [Low to High]",
  },
  {
    id: GAMES_SORT_NAME_ASC,
    title: "Filter by Name [A to Z]",
  },
  {
    id: GAMES_SORT_NAME_DESC,
    title: "Filter by Name [Z to A]",
  },
];

export const GAME_VIEWMODE_OPTION = [
  {
    id: GAME_VIEWMODE_PLANNER,
    title: "Show Planner",
  },
  {
    id: GAME_VIEWMODE_JOURNAL,
    title: "Show Journal",
  },
];

//Filter Helper Methods

export const getGamesFiltered = (games, filterOption) => {
  if (filterOption === GAMES_SORT_COMPLETION_DESC) {
    const newGames = games.sort((game1, game2) => {
      return +game1.percentage < +game2.percentage;
    });
    return newGames;
  }

  if (filterOption === GAMES_SORT_COMPLETION_ASC) {
    const newGames = games.sort((game1, game2) => {
      return +game1.percentage > +game2.percentage;
    });
    return newGames;
  }

  if (filterOption === GAMES_SORT_PINNED) {
    const newGames = games.filter((game) => {
      if (typeof window !== undefined) {
        return (
          JSON.parse(localStorage.getItem(`PINNED_${game.appid}`)) || false
        );
      }
    });
    return newGames;
  }

  if (filterOption === GAMES_SORT_NAME_ASC) {
    const newGames = games.sort((game1, game2) => {
      return game1.gameName > game2.gameName;
    });
    return newGames;
  }

  if (filterOption === GAMES_SORT_NAME_DESC) {
    const newGames = games.sort((game1, game2) => {
      return game1.gameName < game2.gameName;
    });
    return newGames;
  }

  if (filterOption === GAMES_SORT_STARTED) {
    const newGames = games.filter((game) => {
      if (+game.completed > 0) {
        return game;
      }
    });
    const sortedGames = newGames.sort((game1, game2) => {
      return +game1.percentage < +game2.percentage;
    });
    return sortedGames;
  }
};
