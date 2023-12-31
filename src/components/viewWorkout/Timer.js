import { useEffect, useMemo, useState } from "react";
import './Timer.scss'
import countdownSound from '../../assets/countdown.wav';

export const Timer = ({ isPlaying, timeLeft, setTime, onTimeout, restData, fastForward, rewind }) => {
    console.log('isPlaying within Timer: ', isPlaying);
    const SECOND = 1000;
    console.log("Rest data", restData.time)
    const COUNTDOWN_SECONDS = restData.time;
    const [audio] = useState(new Audio(countdownSound));

    useEffect(() => {
    if (timeLeft === 3 ||timeLeft === COUNTDOWN_SECONDS)
    {
        audio.play();
    }
    else if (timeLeft >3){
        audio.pause(); 
    }
  }, [timeLeft, audio]);


    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setTime(timeLeft - 1);
            }, SECOND);
        }
        return () => clearInterval(interval);
    }, [isPlaying, timeLeft]);

    
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
