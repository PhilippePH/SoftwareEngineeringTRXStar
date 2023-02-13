import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectedOptions from "../playlist/SelectedOptions";
import { setActiveTab, setFocus } from "../../redux/slices/selectSlice";
import NavButtons from "../layout/NavButtons";
import { useEffect, useState } from "react";
import { DIFFICULTY, DURATION, FOCUS } from "../utils/constants";
import SelectButton from "../utils/SelectButton";

const SelectFocus = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const focusOptions = ["HIIT", "Strength", "Endurance", "Recovery"];

    const clickHandler = (option) => {
        dispatch(setFocus(option))
        navigate(`/select/${DURATION}`);
    }

    useEffect(() => {
        dispatch(setActiveTab(FOCUS));
    }, []);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <div style={{ display: 'grid', height: '50vh', justifyContent: 'center', placeItems: "center", alignItems: "center", }}
            > FOCUS
            <ul
                style={{
                    display: "grid",
                    justifyContent: "center",
                    placeItems: "center",
                    alignItems: "center",
                    maxWidth: "25rem",
                    width: "100%",
                    padding: "0px",
                    gridTemplateColumns: width > 768 ? 'repeat(2, 1fr)' : '1fr',
                    gridGap: '16px'
                }}
            >
                {
                    focusOptions?.map((option) => {
                        return (
                            <SelectButton 
                                key={option} 
                                type={FOCUS} 
                                option={option}
                                to={`/select/${DURATION}`} 
                            />
                        )
                    })
                }
            </ul>
            {/* <SelectedOptions/> */}
            <NavButtons
                prev={`/select/${DIFFICULTY}`}
                next={`/select/${DURATION}`}
            />
        </div>
    )
}

export default SelectFocus;