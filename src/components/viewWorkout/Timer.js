import { useEffect, useMemo, useState } from "react";
import './Timer.scss'


export const Timer = ({ onTimeout, restData }) => {
    const SECOND = 1000;
    console.log("Rest data", restData.time)
    const COUNTDOWN_SECONDS = restData.time;
    const [timeLeft, setTime] = useState(restData.time);


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
