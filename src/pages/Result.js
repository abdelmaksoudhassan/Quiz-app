import "../styles/Result.css";
import { useRef } from 'react'
import { useNavigate } from "react-router-dom";

import ResultTable from "../components/ResultTable";
import { useDispatch, useSelector } from "react-redux";
import {
    attempts_Number,
    earnPoints_Number,
    flagResult,
} from "../helper/helper";

/** import actions  */
import { resetAllAction } from "../redux/question_reducer";
import { resetResultAction } from "../redux/result_reducer";
import { publishResult } from "../helper/result";

export default function Result() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const table = useRef()
    const { queue, answers } = useSelector((state) => state.questions);
    const { result, userId } = useSelector((state) => state.result);

    const totalPoints = queue.length * 10;
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10);
    const flag = flagResult(totalPoints, earnPoints);

    /** store user result */
    function onPushToServer(){
        publishResult({
            result,
            username: userId,
            attempts,
            points: earnPoints,
            achived: flag ? "Passed" : "Failed",
        },(data)=>table.current.pushToData(data));
    }

    function onRestart() {
        dispatch(resetAllAction());
        dispatch(resetResultAction());
        navigate('/')
    }

    return (
        <div className="container">
            <h1 className="title text-light">Quiz Application</h1>

            <div className="flex-center">
                <div className="flex">
                    <span>Username</span>
                    <span className="bold">{userId || ""}</span>
                </div>
                <div className="flex">
                    <span>Total Quiz Points : </span>
                    <span className="bold">{totalPoints || 0}</span>
                </div>
                <div className="flex">
                    <span>Total Questions : </span>
                    <span className="bold">{queue.length || 0}</span>
                </div>
                <div className="flex">
                    <span>Total Attempts : </span>
                    <span className="bold">{attempts || 0}</span>
                </div>
                <div className="flex">
                    <span>Total Earn Points : </span>
                    <span className="bold">{earnPoints || 0}</span>
                </div>
                <div className="flex">
                    <span>Quiz Result</span>
                    <span
                        style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }}
                        className="bold"
                    >
                        {flag ? "Passed" : "Failed"}
                    </span>
                </div>
            </div>

            <div className="grid">
                <button className="btn prev" onClick={onRestart}>
                    Restart
                </button>
                <button className="btn next" onClick={onPushToServer}>
                    Push to server
                </button>
            </div>

            <div className="container">
                <ResultTable ref={table}></ResultTable>
            </div>
        </div>
    );
}