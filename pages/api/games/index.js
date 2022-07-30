import {
  FETCH_ALL_ACHIEVEMENTS_PLAYER,
  FETCH_ALL_GAMES,
} from "../../../helper/urlHelper";
import axios from "axios";

const handler = async (req, res) => {
  console.clear();
  if (req.method === "GET") {
    axios
      .get(FETCH_ALL_GAMES)
      .then((response) => {
        const games = response.data.response.games;

        Promise.all(
          games.map(async (game) => {
            try {
              const playerResponse = await axios.get(
                FETCH_ALL_ACHIEVEMENTS_PLAYER(game.appid)
              );
              const playerAchievements = playerResponse.data;
              const newGame = {
                ...game,
                gameName: playerAchievements.playerstats.gameName,
                playerAchievements: playerAchievements.playerstats.achievements,
              };
              return newGame;
            } catch (error) {
              const newGame = {
                ...game,
                gameName: "",
                playerAchievements: [],
              };
              return newGame;
            }
          })
        ).then((data) => {
          res.status(200).json({
            status: "success",
            data: data,
          });
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: "error",
        });
      });
  }
};

export default handler;
