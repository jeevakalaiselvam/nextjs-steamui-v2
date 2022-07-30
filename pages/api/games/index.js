import axios from "axios";
import { FETCH_ALL_GAMES } from "../../../helper/urlHelper";

export default function handler(req, res) {
  axios
    .get(FETCH_ALL_GAMES)
    .then((response) => {
      const games = response.data.response.games;

      res.status(200).json({ status: "SUCCESS", data: games });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: "ERROR" });
    });
}
