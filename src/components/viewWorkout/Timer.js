import { useEffect, useMemo, useState } from "react";
import './Timer.scss'

const SECOND = 1000;
const COUNTDOWN_SECONDS = 1000000000;

export const Timer = ({ onTimeout }) => {
    const [timeLeft, setTime] = useState(COUNTDOWN_SECONDS);


    useEffect(() => {
        const interval = setInterval(() => {
            setTime(timeLeft-1);
        }, SECOND);

        return () => clearInterval(interval);
    }, [timeLeft]);

    
    useEffect(() => {
        if (timeLeft === 0) {
            onTimeout && onTimeout();
        }
    }, [timeLeft, onTimeout]);


    return (
        <div className="timer">
            {Object.entries({
                Seconds: (timeLeft),
            }).map(([label, value]) => (
                //<div key={label} className="col-4">
                    <div className="circle">
                            {`${Math.floor(value)}`.padStart(2, "0")}
                        </div>
                    //</div>
            ))}
        </div>
    );
};



export default Timer;
