import { FETCH_ALL_GAMES } from "../../../helper/urlHelper";

const axios = require("axios");

const handler = async (req, res) => {
  console.clear();
  if (req.method === "GET") {
    let newGames = [];
    axios
      .get(FETCH_ALL_GAMES)
      .then((response) => {
        const games = response.data.response.games;
        res.status(200).json({
          status: "success",
          data: games,
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
