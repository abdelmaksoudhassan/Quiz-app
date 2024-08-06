import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/result_reducer";
import "../styles/Main.css";

export default function Main() {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const [err, setErr] = useState(false)
    const regExp = /[^a-zA-Z]+/g
    const navigate = useNavigate()

    function startQuiz() {
        if(regExp.test(inputRef.current?.value) || inputRef.current?.value.length < 3){
            setErr(true)
            return
        }
        dispatch(setUserId(inputRef.current?.value));
        navigate('/quiz')
    }

    return (
        <div className="container">
            <h1 className="title text-light">Quiz Application</h1>

            <ol>
                <li>You will be asked 10 questions one after another.</li>
                <li>10 points is awarded for the correct answer.</li>
                <li>Each question has three options. You can choose only one options.</li>
                <li>You can review and change answers before the quiz finish.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ol>

            <form id="form">
                <input
                    ref={inputRef}
                    className="userid"
                    type="text"
                    placeholder="Username*"
                    onFocus={()=>setErr(false)}
                />
            </form>
            { err &&
                <div style={{color:'darkred', textAlign:"center"}}>
                    your name must be at least 3 and letters only</div>
            }

            <div className="start">
                <button className="btn" onClick={startQuiz}>
                    Start Quiz
                </button>
            </div>
        </div>
    );
}