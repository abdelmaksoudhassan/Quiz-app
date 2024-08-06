import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";
import * as Action from "../redux/question_reducer";

/** fetch question hook to fetch api data and set value to store */
export const useFetchQestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({
        isLoading: false,
        apiData: [],
        serverError: null,
    });

    useEffect(() => {
        setGetData((prev) => ({ ...prev, isLoading: true }));

        /** async function fetch backend data */
        (async () => {
            try {
                const [{ questions, answers }] = await getServerData(`${process.env.REACT_APP_API_URL}/questions`);

                if (questions.length > 0) {
                    setGetData((prev) => ({ ...prev, isLoading: false, apiData: questions }))

                    /** dispatch an action */
                    dispatch(Action.startExamAction({ question: questions, answers }));
                } else {
                    throw new Error("No Question Available");
                }
            } catch (error) {
                setGetData((prev) => ({ ...prev, isLoading: false, serverError: error.message  }));
            }
        })();
    }, [dispatch]);

    return [getData];
};

/** MoveAction Dispatch function */
export const MoveNextQuestion = () => (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /** increase trace by 1 */
    } catch (error) {
        console.error("Error moving to next question:", error);
    }
};

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** decrease trace by 1 */
    } catch (error) {
        console.error("Error moving to previous question:", error);
    }
};