import { useDispatch, useSelector } from "react-redux";
import { useFetchQestion } from "../hooks/FetchQuestions";
import { updateResult } from "../helper/result";

export default function Questions() {
    const dispatch = useDispatch();
    const { trace } = useSelector((state) => state.questions);
    const { result } = useSelector((state) => state.result);
    const [{ isLoading, serverError }] = useFetchQestion();
    const questions = useSelector((state) => state.questions.queue[trace]);

    function onSelect(i) {
        dispatch(updateResult({ trace, checked: i }));
    }

    if (isLoading) return <h3 className="text-light">Loading...</h3>;
    if (serverError)
        return <h3 className="text-light">{serverError || "Unknown Error"}</h3>;

    if (!questions) return <h3 className="text-light">No questions available</h3>;

    return (
        <>
            <h2 className="text-light">{questions?.question}</h2>
            <ul key={questions?.id}>
                {questions?.options.map((q, i) => (
                    <li key={i}>
                        <input type="radio"
                            value={i}
                            name={`options-${questions.id}`}
                            id={`q${i}-option`}
                            onChange={() => onSelect(i)}
                            checked={result[trace] === i}
                            style={{color: 'green'}}
                        />
                        <label className="text-primary" htmlFor={`q${i}-option`}>{q}</label>
                    </li>
                ))}
            </ul>
        </>
    );
}