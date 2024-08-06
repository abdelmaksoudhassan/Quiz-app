import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";

export function attempts_Number(result) {
    return result.filter((r) => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point) {
    return result
        .map((element, i) => answers[i] === element) //array of boolen
        .filter((i) => i) //remove false items
        .map((i) => point) // map true items to be point (10)
        .reduce((prev, curr) => prev + curr, 0); //calculate sum starting from 0
}

export function flagResult(totalPoints, earnPoints) {
    return (totalPoints * 50) / 100 < earnPoints; /** earn 50% marks */
}

/** check user auth  */
export function CheckUserExist({ children }) {
    const auth = useSelector((state) => state.result.userId) || localStorage.getItem("userId");
    return auth ? children : <Navigate to={"/"} replace={true}></Navigate>;
}

/** get server data */
export async function getServerData(url,cb) {
    const data = await (await axios.get(url))?.data;
    return cb ? cb(data) : data;
}

/** post server data */
export async function postServerData(url, result) {
    const data = await (await axios.post(url, result))?.data;
    return data;
}