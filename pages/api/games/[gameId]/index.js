import {
  FETCH_ALL_ACHIEVEMENTS_GLOBAL,
  FETCH_ALL_ACHIEVEMENTS_PLAYER,
  FETCH_ALL_ACHIEVEMENTS_SCHEMA,
} from "../../../../helper/urlHelper";

const axios = require("axios");
const cheerio = require("cheerio");

const handler = async (req, res) => {
  console.clear();
  if (req.method === "GET") {
    try {
      let game = {};
      const { gameId } = req.query;

      let hiddenAchievements = [];
      const url = `https://completionist.me/steam/app/${gameId}/achievements?display=mosaic&sort=created&order=desc`;

      const hiddenResponse = await axios.get(url);
      const html = hiddenResponse.data;
      const $ = cheerio.load(html);
      let titles = [];
      let descriptions = [];

      $("span.title").each(function (i, e) {
        titles[i] = $(this).text().trim();
      });

      $("span.description").each(function (i, e) {
        descriptions[i] = $(this).text().trim();
      });

      titles.forEach((title, i) => {
        hiddenAchievements.push({
          name: titles[i],
          description: descriptions[i],
        });
      });

      //Get All Hidden Achivements

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
        hiddenAchievements: hiddenAchievements,
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
