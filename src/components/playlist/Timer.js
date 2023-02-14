import { useEffect, useMemo, useState } from "react";

const SECOND = 1000;
const COUNTDOWN_SECONDS = 20;

export const Timer = () => {
    const parsedDeadline = useMemo(() => Date.now() + COUNTDOWN_SECONDS * SECOND, []);
    const [time, setTime] = useState(parsedDeadline - Date.now());

    useEffect(() => {
        const interval = setInterval(
            () => setTime(parsedDeadline - Date.now()),
            SECOND,
        );

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="timer">
            {Object.entries({
                Seconds: (time / SECOND) % 60,
            }).map(([label, value]) => (
                <div key={label} className="col-4">
                    <div className="box">
                        <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
                        <span className="text">{label}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Timer;
