import { useEffect, useMemo, useState } from "react";
import './Timer.css'

const SECOND = 1000;
const COUNTDOWN_SECONDS = 20;

export const Timer = ({ onTimeout }) => {
    const parsedDeadline = useMemo(() => Date.now() + COUNTDOWN_SECONDS * SECOND, []);
    const [time, setTime] = useState(parsedDeadline - Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const remainingTime = parsedDeadline - Date.now();
            setTime(remainingTime < 0 ? 0 : remainingTime);
        }, SECOND);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (time === 0) {
            onTimeout && onTimeout();
        }
    }, [time, onTimeout]);

    return (
        <div className="timer">
            {Object.entries({
                Seconds: (time / SECOND) % 60,
            }).map(([label, value]) => (
                <div key={label} className="col-4">
                    <div className="circle">
                            <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
                        </div>
                    </div>
            ))}
        </div>
    );
};

export default Timer;
