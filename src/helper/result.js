import { postServerData } from "./helper";
import * as Action from "../redux/result_reducer";

export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result));
    } catch (error) {
        console.error("Error pushing answer:", error);
    }
};

export const updateResult = (payload) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(payload));
    } catch (error) {
        console.error("Error updating result:", error);
    }
};

/** insert user data */
export const publishResult = (resultData,cb) => {
    const { result, username } = resultData;
    (async () => {
        try {
            if (!result.length || !username) {
                throw new Error("Couldn't get Result: Invalid result or username.");
            }
            const response = await postServerData(
                `${process.env.REACT_APP_API_URL}/result`,
                resultData
            );
            cb(response.result)
        } catch (error) {
            console.error("Error publishing result:", error);
        }
    })();
};