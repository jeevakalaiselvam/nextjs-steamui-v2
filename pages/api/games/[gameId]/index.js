import {
  FETCH_ALL_ACHIEVEMENTS_GLOBAL,
  FETCH_ALL_ACHIEVEMENTS_PLAYER,
  FETCH_ALL_ACHIEVEMENTS_SCHEMA,
} from "../../../../helper/urlHelper";

const axios = require("axios");

const handler = async (req, res) => {
  console.clear();
  if (req.method === "GET") {
    try {
      let game = {};
      const { gameId } = req.query;

      //Fetch Schema Achievements
      const achievementsResponse = await axios.get(
        FETCH_ALL_ACHIEVEMENTS_SCHEMA(gameId)
      );
      const achievements = achievementsResponse.data;
      game = {
        ...game,
        schemaAchievements:
          achievements.game.availableGameStats?.achievements || [],
        gameName: achievements.game.gameName,
      };

      //Get Player Achievements
      const playerResponse = await axios.get(
        FETCH_ALL_ACHIEVEMENTS_PLAYER(gameId)
      );
      const playerAchievements = playerResponse.data;
      game = {
        ...game,
        gameName: playerAchievements.playerstats.gameName,
        playerAchievements: playerAchievements.playerstats.achievements,
      };

      //Get Global Achievements
      const globalResponse = await axios.get(
        FETCH_ALL_ACHIEVEMENTS_GLOBAL(gameId)
      );
      const globalAchievements = globalResponse.data;
      game = {
        ...game,
        globalAchievements:
          globalAchievements.achievementpercentages.achievements,
      };

      //Send response when all data is collected
      res.status(200).json({
        status: "success",
        data: game,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
      });
    }
  }
};

export default handler;
