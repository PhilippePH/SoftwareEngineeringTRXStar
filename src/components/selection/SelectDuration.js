import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectedOptions from "../playlist/SelectedOptions";
import { setActiveTab, setDuration } from "../../redux/slices/selectSlice";
import NavButtons from "../layout/NavButtons";
import { useEffect, useState } from "react";
import { DURATION, FOCUS, MUSCLE_GROUPS } from "../utils/constants";
import SelectButton from "../utils/SelectButton";

const SelectDuration = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const durationOptions = [
        "15 min", 
        "30 min",
        "45 min",
        "60 min"
    ];

    const clickHandler = (option) => {
        dispatch(setDuration(option));
        navigate(`/select/${MUSCLE_GROUPS}`);
    }

    useEffect(() => {
        dispatch(setActiveTab(DURATION));
    }, []);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    
    return (
        <div style={{ display: 'grid', height: '50vh', justifyContent: 'center', placeItems: "center", alignItems: "center", }}>
            DURATION
            <ul
                style={{
                    display: "grid",
                    placeItems: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: "25rem",
                    width: "100%",
                    padding: "0px",
                    gridTemplateColumns: width > 768 ? 'repeat(2, 1fr)' : '1fr',
                    gridGap: '16px'
                }}
            >
                {
                    durationOptions?.map((option) => {
                        return (
                            <SelectButton 
                                key={option} 
                                type={DURATION} 
                                option={option} 
                                to={`/select/${MUSCLE_GROUPS}`}
                            />
                        )
                    })
                }
            </ul>
            {/* <SelectedOptions/> */}
            <NavButtons
                prev={`/select/${FOCUS}`}
                next={`/select/${MUSCLE_GROUPS}`}
            />
        </div>
    )
}

export default SelectDuration;