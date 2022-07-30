import axios from "axios";
import { FETCH_ALL_GAMES } from "../../../helper/urlHelper";

export default function handler(req, res) {
  axios
    .get(FETCH_ALL_GAMES)
    .then((response) => {
      const games = response.data.response.games;

      const newGames = games.map((game) => {
        const newGame = { ...game, data: "Jeeva" };
        return newGame;
      });

      res.status(200).json({ status: "SUCCESS", games: newGames });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: "ERROR" });
    });
}
