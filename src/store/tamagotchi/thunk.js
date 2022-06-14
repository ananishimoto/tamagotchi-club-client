import axios from "axios";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/actions";
import { selectToken } from "../user/selectors";
import { deleteTamagotchi, startLoading, tamagotchisFetched } from "./slice";

export async function fetchUserTamagotchis(dispatch, getState) {
  try {
    dispatch(appLoading());
    // dispatch(startLoading());
    const { token } = getState().user;

    const response = await axios.get("http://localhost:4000/tamagotchi/mine", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("thunk tamagotchi response", response.data);
    const tamagotchis = response.data;

    dispatch(tamagotchisFetched(tamagotchis));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e.message);
    dispatch(appDoneLoading());
  }
}

export const deleteUserTamagotchi = (tamaId) => async (dispatch, getState) => {
  try {
    const { token } = getState().user;
    dispatch(appLoading());
    const userTama = await axios.delete(
      `http://localhost:4000/tamagotchi/${tamaId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("delete thunk", userTama.data);
    dispatch(deleteTamagotchi(tamaId));
    dispatch(appDoneLoading());
  } catch (error) {
    console.log(error.message);
    dispatch(appDoneLoading());
  }
};
