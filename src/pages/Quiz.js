import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import Questions from "../components/Questions";
import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestions";
import { PushAnswer } from "../helper/result";

export default function Quiz() {
    const [check, setChecked] = useState(undefined);
    const { result } = useSelector((state) => state.result);
    const { queue, trace } = useSelector((state) => state.questions);
    const dispatch = useDispatch();

    function onNext() {
        if (trace < queue.length) {
            dispatch(MoveNextQuestion());
            if (result.length <= trace) { //if trace still gt result array (trace-1)
                dispatch(PushAnswer(check));
            }
        }
        setChecked(undefined);
    }

    function onPrev() {
        if (trace > 0) {
            dispatch(MovePrevQuestion());
        }
    }

    if (result.length && result.length >= queue.length) {
        return <Navigate to={"/result"} replace={true}></Navigate>;
    }

    return (
        <div className="container">
            <h1 className="title text-light">Quiz Application</h1>
            <Questions />
            <div className="grid">
                {trace > 0 ? (
                    <button className="btn prev" onClick={onPrev}>
                        Prev
                    </button>
                ) : (
                    <div></div>
                )}
                <button className="btn next" onClick={onNext}>
                    Next
                </button>
            </div>
        </div>
    );
}