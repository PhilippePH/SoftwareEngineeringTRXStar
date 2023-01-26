import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Selection = () => {
    const navigate = useNavigate();

    const [count, setCount] = useState(0);
    const [difficulty, setDifficulty] = useState('');
    const [length, setLength] = useState('');
    const [muscles, setMuscles] = useState('');

    return (
        <>
            {count == 0 && (
                <div>
                    Easy - Medium - Hard
                </div>
            )}
            {count == 1 && (
                <div>
                    30mins - 40mins - 60mins
                </div>
            )}
            {count == 2 && (
                <div>
                    Upper Body - Abs and Core - Lower Body
                </div>
            )}
            <input 
                type="button"
                value='Select'
                onClick={(e) => {
                    if(count < 2) {
                        setCount(count+1);
                    } else {
                        navigate("/playlist");
                    }
                }}
            />
        </>
    );
}

export default Selection;