import axios from "axios";
import { storeData } from "./homeSlice";

//func() made get api request through axios for videos data
export async function getVidData(dispatch) {
  try {
    const response = await axios.get("http://localhost:3200");
    if (!response) {
      console.log("Try again!");
      return;
    }
    console.log(response.data);
    //dispatching storeData action to store fetched data inside global state..
    dispatch(storeData(response.data));
    //store data inside sessionStorage, which utilitze for filter and search
    sessionStorage.setItem("videoD", JSON.stringify(response.data));
  } catch (err) {
    console.log("Response Error: ", err);
  }
}
