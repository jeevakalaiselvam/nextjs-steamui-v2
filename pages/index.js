import Page from "../components/organisms/Page";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseCounter,
  increaseCounter,
} from "../store/actions/games.action";

export default function Home() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  const { count } = games;

  return (
    <div className="App">
      <div>Count: {count}</div>

      <button
        onClick={() => {
          dispatch(increaseCounter());
        }}
      >
        Increase Count
      </button>

      <button
        onClick={() => {
          dispatch(decreaseCounter());
        }}
      >
        Decrease Count
      </button>
    </div>
  );
}
