import { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => clearInterval(intervalIdRef.current);
    }, [isRunning]);
    
    const start = () => {
        setIsRunning(true);
        startTimeRef.current = (Date.now() - elapsedTime);
    }
    const stop = () => {
        setIsRunning(false);
    }
    const reset = () => {
        setElapsedTime(0);
        setIsRunning(false);
    }

    const formatTime = () => {
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliSeconds = Math.floor((elapsedTime % 1000) / 10);

        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        milliSeconds = String(milliSeconds).padStart(2, '0');
        return(`${minutes}:${seconds}:${milliSeconds}`);
    }

    return <>
        <div className="stopwatch-container">
            <div className="time">{formatTime()}</div>
            <div className="btns">
                <button onClick={start} className="start-Button">▶</button>
                <button onClick={stop} className="stop-Button">❚❚</button>
                <button onClick={reset} className="reset-Button">⟳</button>
            </div>
        </div>
        <div className="donation-section">
            <a
                href="https://www.palestinercs.org/en/Donation"
                target='_blank'>
                Donate To The Palestine Red Crescent Society
            </a>
        </div>
    </>
}